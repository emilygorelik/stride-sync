import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserTokenContext,
  fetchAudioFeatures,
  fetchPlaylistData,
  fetchPlaylists,
  fetchProfile,
} from '../api';
import { calcBPM } from '../calculations';
import {
  Card,
  Playlist,
  RunDetailsBlock,
  StrideDetailsBlock,
  SubmitButton,
} from '../components';
import { BpmBlock } from '../components/bpmBlock';
import {
  SpotifyAudioFeatures,
  SpotifyPlaylist,
  SpotifyPlaylists,
  SpotifyProfile,
  SpotifyTrack,
} from '../types/SpotifyAPI';

function Home() {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserTokenContext);
  const [profile, setProfile] = useState<SpotifyProfile>();
  const [playlists, setPlaylists] = useState<SpotifyPlaylists>();
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist>();
  const [playlistData, setPlaylistData] = useState<SpotifyTrack[]>([]);
  const [playlistFeatures, setPlaylistFeatures] = useState<
    SpotifyAudioFeatures[]
  >([]);

  const [pace, setPace] = useState<number>(0);
  const [stride, setStride] = useState<number>(0);
  const [bpm, setBPM] = useState<number>(-1);
  const [bpmOverride, setBPMOverride] = useState<number>(-1);

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        try {
          const userProfile = await fetchProfile(accessToken);
          const userPlaylists = await fetchPlaylists(accessToken);
          setProfile(userProfile);
          setPlaylists(userPlaylists);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        navigate('/');
      }
    }

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    async function fetchPlaylists() {
      if (accessToken && selectedPlaylist) {
        const totalSongs = selectedPlaylist.tracks.total;
        let offset = 0;
        let allSongs: SpotifyTrack[] = [];
        let allSongsFeatures: SpotifyAudioFeatures[] = [];

        while (offset < totalSongs) {
          //get chunk of songs
          const playlistChunk = await fetchPlaylistData(
            accessToken,
            selectedPlaylist.id,
            offset,
          );
          //get bpm data for the chunk
          const chunkIds = playlistChunk.map((item) => item.track.id);
          const chunkFeatures = await fetchAudioFeatures(accessToken, chunkIds);

          //store
          allSongs = [...allSongs, ...playlistChunk];
          allSongsFeatures = [...allSongsFeatures, ...chunkFeatures];
          offset += playlistChunk.length;
        }

        setPlaylistData(allSongs);
        setPlaylistFeatures(allSongsFeatures);
      }
    }

    fetchPlaylists();
  }, [selectedPlaylist]);

  if (!profile || !playlists) {
    return <div>Loading...</div>;
  }

  const handlePlaylistSelection = (playlist: SpotifyPlaylist) => {
    setSelectedPlaylist(playlist);
  };

  const handleStrideChange = (value: number) => {
    setStride(value);
  };

  const handlePaceChange = (value: number) => {
    setPace(value);
  };

  function calcStrideSync() {
    // console.log('----------------------------------------------------');
    // console.log('button clicked');
    // console.log('recorded pace: ', pace, 'seconds per mile');
    // console.log('recorded pace: ', pace / 60, 'minutes per mile');
    // console.log('recorded stride: ', stride, ' inches');
    const calcBpm = calcBPM(pace, stride);
    // console.log('calculated BPM: ', calcBpm, ' steps per minute');
    setBPM(calcBpm);
    setBPMOverride(calcBpm);
  }

  const handleOverride = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let valueNum = parseFloat(value);
    if (isFinite(valueNum)) {
      setBPMOverride(valueNum);
    } else {
      setBPMOverride(bpm);
    }
  };

  function exportPlaylist() {
    console.log(`---------- export ${bpmOverride} ------------`);
  }

  return (
    <div className="m-auto flex h-screen w-3/4 flex-col items-center p-8">
      <h1>Spotify StrideSync- {profile.display_name}</h1>
      <div className="flex w-full gap-8 overflow-hidden px-4">
        <Card className="flex w-1/2">
          <h2>Select Playlist</h2>
          <div className="flex w-full flex-col gap-4 overflow-y-auto">
            {playlists?.items?.map((playlist, index) => (
              <div
                key={playlist.id}
                className={`${
                  selectedPlaylist === playlist ? 'bg-primary' : ''
                }`}
              >
                <input
                  type="radio"
                  id={`playlist-${index}`}
                  name="playlist-radio"
                  className="hidden"
                  value={playlist.id}
                  checked={selectedPlaylist === playlist}
                  onChange={() => handlePlaylistSelection(playlist)}
                />
                <label htmlFor={`playlist-${index}`}>
                  <Playlist
                    key={playlist.id}
                    name={playlist.name}
                    imageURL={playlist.images[0].url}
                    numTracks={playlist.tracks.total}
                  />
                </label>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex w-1/2 flex-col items-center gap-4 border-2">
          <RunDetailsBlock paceValue={handlePaceChange} />
          <StrideDetailsBlock strideValue={handleStrideChange} />
          <SubmitButton onClick={() => calcStrideSync()}>
            Calculate BPM
          </SubmitButton>
          {bpm !== -1 && isFinite(bpm) && (
            <BpmBlock
              bpm={bpm}
              onChange={handleOverride}
              onClick={exportPlaylist}
            />
          )}
          <div className="overflow-y-scroll">
            <h3>Songs</h3>
            {playlistData?.map((song, index) => (
              <p key={index} className="w-full px-8">
                {index + 1}. {song.track.name} -
                {Math.round(playlistFeatures[index].tempo)} BPM
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

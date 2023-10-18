import { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
  UserTokenContext,
  addSongs,
  createPlaylist,
  fetchAudioFeatures,
  fetchPlaylistData,
  fetchPlaylists,
  fetchProfile,
} from '../api';
import { calcBPM } from '../calculations';
import {
  Card,
  NumberInput,
  Playlist,
  RunDetailsBlock,
  StrideDetailsBlock,
  SubmitButton,
} from '../components';
import {
  SpotifyAudioFeatures,
  SpotifyPlaylist,
  SpotifyPlaylists,
  SpotifyProfile,
} from '../types/SpotifyAPI';

interface HomeProps {
  code?: string | null;
}

function Home({ code }: HomeProps) {
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);
  const [profile, setProfile] = useState<SpotifyProfile>();
  const [playlists, setPlaylists] = useState<SpotifyPlaylists>();
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist>();
  const [playlistFeatures, setPlaylistFeatures] = useState<
    SpotifyAudioFeatures[]
  >([]);

  const [pace, setPace] = useState<number>(0);
  const [stride, setStride] = useState<number>(0);
  const [bpm, setBPM] = useState<number>(-1);
  const [bpmOverride, setBPMOverride] = useState<number>(-1);
  const [bpmInputValue, setBPMInputValue] = useState<string>('');

  if (!accessToken && code) {
    loginWithSpotify(code);
  }

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
      }
    }

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    async function fetchPlaylists() {
      if (accessToken && selectedPlaylist) {
        const totalSongs = selectedPlaylist.tracks.total;
        let offset = 0;
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
          allSongsFeatures = [...allSongsFeatures, ...chunkFeatures];
          offset += playlistChunk.length;
        }
        setPlaylistFeatures(allSongsFeatures);
      }
    }

    fetchPlaylists();
  }, [selectedPlaylist]);

  if (!profile || !playlists) {
    return <div>Does not have Spotify info yet. Be patient</div>;
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
    const calcBpm = calcBPM(pace, stride);
    if (isFinite(calcBpm)) {
      setBPM(calcBpm);
      setBPMOverride(calcBpm);
      setBPMInputValue('');
    }
  }

  const handleOverride = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBPMInputValue(value);
    const valueNum = parseFloat(value);
    if (isFinite(valueNum)) {
      setBPMOverride(valueNum);
    } else {
      setBPMOverride(bpm);
    }
  };

  async function exportPlaylist() {
    if (accessToken && profile) {
      // create new spotify playlist
      const newPlaylist = await createPlaylist(
        accessToken,
        profile.id,
        `StrideSync- ${bpmOverride} BPM`,
      );

      const filteredSongs = playlistFeatures
        .filter((feature) => Math.abs(feature.tempo - bpmOverride) <= 3)
        .map((feature) => feature.uri);

      // add stored playlist to new playlist
      await addSongs(accessToken, newPlaylist.id, filteredSongs);
      // TODO: add cover image
    }
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
                {/* TODO: make into component */}
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
                    imageURL={playlist.images[0] ? playlist.images[0].url : ''}
                    numTracks={playlist.tracks.total}
                  />
                </label>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex w-1/2 flex-col items-start gap-4">
          <RunDetailsBlock paceValue={handlePaceChange} />
          <StrideDetailsBlock strideValue={handleStrideChange} />
          <div className="flex w-full items-center gap-2">
            <SubmitButton onClick={() => calcStrideSync()}>
              Calculate BPM
            </SubmitButton>
            {bpm !== -1 && isFinite(bpm) && (
              <h3>Your Calculated BPM is {bpm}</h3>
            )}
          </div>

          <div className="flex w-full items-center gap-4 rounded-lg border-[1px] border-primary pl-2 pt-2">
            <h3>Override Calculated BPM:</h3>
            <NumberInput
              placeholder={bpm !== -1 && isFinite(bpm) ? bpm.toString() : ''}
              onChange={handleOverride}
              value={bpmInputValue} // Use bpmInputValue as the input value
            />
          </div>
          <SubmitButton onClick={exportPlaylist}>Export Playlist</SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default Home;

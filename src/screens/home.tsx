import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserTokenContext, fetchPlaylists, fetchProfile } from '../api';
import { calcBPM } from '../calculations';
import {
  Card,
  Playlist,
  RunDetailsBlock,
  StrideDetailsBlock,
  SubmitButton,
} from '../components';
import { SpotifyPlaylists, SpotifyProfile } from '../types/SpotifyAPI';

function Home() {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserTokenContext);
  const [profile, setProfile] = useState<SpotifyProfile>();
  const [playlists, setPlaylists] = useState<SpotifyPlaylists>();

  const [pace, setPace] = useState<number>(0);
  const [stride, setStride] = useState<number>(0);
  const [bpm, setBPM] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        try {
          const userProfile = await fetchProfile(accessToken);
          const userPlaylists = await fetchPlaylists(accessToken);
          setProfile(userProfile);
          setPlaylists(userPlaylists);
        } catch (error) {
          // Handle errors from the API call, e.g., token expired or invalid
          console.error('Error fetching user data:', error);
        }
      } else {
        navigate('/');
      }
    }

    fetchData();
  }, [accessToken]);

  if (!profile || !playlists) {
    return <div>Loading...</div>;
  }

  const handleStrideChange = (value: number) => {
    setStride(value);
  };

  const handlePaceChange = (value: number) => {
    setPace(value);
  };

  function calcStrideSync() {
    console.log('------------------------');
    console.log('button clicked');
    console.log('recorded pace: ', pace, 'seconds per mile');
    console.log('recorded pace: ', pace / 60, 'minutes per mile');
    console.log('recorded stride: ', stride, ' inches');
    setBPM(calcBPM(pace, stride));
    console.log('calculated BPM: ', calcBPM(pace, stride), ' steps per minute');
    console.log('------------------------');
  }

  return (
    <div className="m-auto flex h-screen w-3/4 flex-col items-center p-8">
      <h1>Spotify StrideSync- {profile.display_name}</h1>
      <div className="flex w-full gap-8 overflow-hidden px-4">
        <Card className="flex w-1/2">
          <h2>Select Playlist</h2>
          <div className="flex w-full flex-col gap-4 overflow-y-auto">
            {playlists?.items?.map((playlist) => (
              <Playlist
                name={playlist.name}
                imageURL={playlist.images[0].url}
                numTracks={playlist.tracks.total}
              />
            ))}
          </div>
        </Card>
        <div className="flex w-1/2 flex-col items-center gap-4">
          <RunDetailsBlock paceValue={handlePaceChange} />
          <StrideDetailsBlock strideValue={handleStrideChange} />
          <SubmitButton onClick={() => calcStrideSync()}>
            Calculate StrideSync
          </SubmitButton>
          <h3>Your Calculated BPM is {bpm}</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;

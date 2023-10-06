import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserTokenContext, fetchPlaylists, fetchProfile } from '../api';
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

  const [pace, setPace] = useState<number>();

  const [stride, setStride] = useState<number>();

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

  function testing() {
    console.log('------------------------');
    console.log('button clicked');
    console.log('recorded pace: ', pace, 'seconds per mile');
    console.log('recorded stride: ', stride, ' inches');
    console.log('------------------------');
  }

  return (
    <div className="m-auto flex h-screen w-3/4 flex-col items-center p-8">
      <h1 className="text-3xl font-bold">
        Spotify StrideSync- {profile.display_name}
      </h1>
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
          <SubmitButton onClick={() => testing()}>Sync My Stride</SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default Home;

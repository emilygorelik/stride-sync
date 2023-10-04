import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkStoredAccessToken, fetchPlaylists, fetchProfile } from '../api';
import { Card } from '../components/Card';
import { Playlist } from '../components/Playlist';
import { RunDetailsBlock } from '../components/RunDetailsBlock';
import { StrideDetailsBlock } from '../components/StrideDetailsBlock';
import { SubmitButton } from '../components/SubmitButton';
import { SpotifyPlaylists } from '../types/spotifyPlaylists';
import { SpotifyProfile } from '../types/spotifyProfile';

function Home() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string>('inital');
  const [profile, setProfile] = useState<SpotifyProfile>();
  const [playlists, setPlaylists] = useState<SpotifyPlaylists>();

  useEffect(() => {
    navigate('/home');
  }, []);

  useEffect(() => {
    async function initializeAccessToken() {
      const storedAccessToken = await checkStoredAccessToken();

      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        console.log('we have an access token ', storedAccessToken);
      } else {
        console.log('access token not received');
        navigate('/');
        return;
      }
    }

    initializeAccessToken();
  }, [navigate]);

  useEffect(() => {
    async function fetchUserProfile() {
      if (accessToken) {
        try {
          const userProfile = await fetchProfile(accessToken);
          setProfile(userProfile);
        } catch (error) {
          // Handle errors from the API call, e.g., token expired or invalid
          console.error('Error fetching user profile:', error);
        }
      }
    }

    fetchUserProfile();
  }, [accessToken]);

  useEffect(() => {
    async function fetchUserPlaylists() {
      if (accessToken) {
        try {
          const userProfile = await fetchPlaylists(accessToken);
          setPlaylists(userProfile);
        } catch (error) {
          // Handle errors from the API call, e.g., token expired or invalid
          console.error('Error fetching user playlists:', error);
        }
      }
    }

    fetchUserPlaylists();
  }, [accessToken]);

  if (!profile || !playlists) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-auto flex h-screen w-3/4 flex-col items-center p-8">
      <h1 className="text-3xl font-bold">
        Spotify StrideSync- {profile.display_name}
      </h1>
      <div className="flex w-full gap-8 overflow-hidden px-4">
        <Card addClass="flex w-1/2">
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
          {/* selections */}
          <RunDetailsBlock />
          <StrideDetailsBlock />
          <SubmitButton>Sync My Stride</SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default Home;

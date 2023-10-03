import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Playlist } from '../components/Playlist';
import { RunDetailsBlock } from '../components/RunDetailsBlock';
import { StrideDetailsBlock } from '../components/StrideDetailsBlock';
import { SubmitButton } from '../components/SubmitButton';
import { useEffect, useState } from 'react';
import {
  fetchProfile,
  fetchPlaylists,
  checkStoredAccessToken,
} from '../scripts/api';

interface SpotifyProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
}

function Home() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string>('inital');
  const [profile, setProfile] = useState<SpotifyProfile>();
  const [playlists, setPlaylists] = useState<any>();

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

  if (!profile) {
    return <div>Loading...</div>; // Or any loading indicator while fetching the profile data
  }

  console.log('--------------------------');
  console.log(playlists);

  return (
    <div className="flex w-3/4 h-screen m-auto p-8 flex-col items-center">
      <h1 className="text-3xl font-bold">
        Spotify StrideSync- {profile.display_name}
      </h1>
      <div className="flex w-full overflow-hidden gap-8 px-4">
        <Card addClass="flex w-1/2">
          <h2>Select Playlist</h2>
          <div className="flex flex-col w-full gap-4 overflow-y-auto">
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            bottom
          </div>
          {/* TODO: create playlist display component */}
          {/* map all playlists to this component */}
        </Card>
        <div className="w-1/2 flex flex-col items-center gap-4">
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

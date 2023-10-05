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

  const [pace, setPace] = useState<string>('');
  const [paceUnit, setPaceUnit] = useState<string>('minutes per mile');

  const [distance, setDistance] = useState<string>('');
  const [distanceUnit, setDistanceUnit] = useState<string>('miles');

  const [time, setTime] = useState<string>('');

  const [stride, setStride] = useState<string>('');
  const [strideUnit, setStrideUnit] = useState<string>('inches');

  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<string>('inches');

  useEffect(() => {
    async function fetchUserData() {
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

    fetchUserData();
  }, [accessToken]);

  if (!profile || !playlists) {
    return <div>Loading...</div>;
  }

  const handleStrideChange = (value: string) => {
    setStride(value);
  };

  const handleStrideUnitChange = (value: string) => {
    setStrideUnit(value);
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
  };

  const handleHeightUnitChange = (value: string) => {
    setHeightUnit(value);
  };

  const handlePaceChange = (value: string) => {
    setPace(value);
  };

  const handlePaceUnitChange = (value: string) => {
    setPaceUnit(value);
  };

  const handleDistanceChange = (value: string) => {
    setDistance(value);
  };

  const handleDistanceUnitChange = (value: string) => {
    setDistanceUnit(value);
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
  };

  function testing() {
    console.log('------------------------');
    console.log('button clicked');
    console.log('recorded pace: ', pace);
    console.log('recorded pace unit: ', paceUnit);
    console.log('recorded dist: ', distance);
    console.log('recorded dist unit: ', distanceUnit);
    console.log('recorded time: ', time);
    console.log('recorded stride: ', stride);
    console.log('recorded stride unit: ', strideUnit);
    console.log('recorded height: ', height);
    console.log('recorded height unit: ', heightUnit);
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
          <RunDetailsBlock
            onPaceChange={handlePaceChange}
            onPaceUnitChange={handlePaceUnitChange}
            onDistanceChange={handleDistanceChange}
            onDistanceUnitChange={handleDistanceUnitChange}
            onTimeChange={handleTimeChange}
          />
          <StrideDetailsBlock
            onStrideChange={handleStrideChange}
            onStrideUnitChange={handleStrideUnitChange}
            onHeightChange={handleHeightChange}
            onHeightUnitChange={handleHeightUnitChange}
          />
          <SubmitButton onClick={() => testing()}>Sync My Stride</SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default Home;

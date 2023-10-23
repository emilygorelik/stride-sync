import { useContext, useEffect } from 'react';
import { themeChange } from 'theme-change';
import { UserTokenContext } from '../api';
import { Card, SubmitButton } from '../components';
import Home from './home';

function Login() {
  const { loginWithSpotify } = useContext(UserTokenContext);
  let params = new URL(document.location as any).searchParams;

  if (params.get('code')) {
    return <Home code={params.get('code')} />;
  }

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex h-screen items-center justify-between overflow-hidden">
      <div className="flex h-[200%] w-1/2 flex-col justify-center rounded-r-[100%] bg-primary p-32 text-black">
        <h1>What is StrideSync?</h1>
        <select name="" id="" data-choose-theme>
          <option value="blue" key="blue">
            blue
          </option>
          <option value="purple" key="purple">
            purple
          </option>
        </select>
        <p className="mb-2">
          StrideSync is a unique running companion that helps you optimize your
          playlist based on your running pace and stride length. Here's how it
          works:
        </p>
        <h3>1. Connect with Spotify</h3>
        <p className="mb-2">
          Log in with your Spotify account to access your playlists.
        </p>
        <h3>2. Select Your Playlist</h3>
        <p className="mb-2">
          Choose a playlist from your Spotify library that you want to use
          during your run.
        </p>
        <h3>3. Input Run Details</h3>
        <p className="mb-2">
          Enter your running pace and stride information to help us match the
          music to your rhythm.
        </p>
        <h3>4. Optimize Your Playlist</h3>
        <p className="mb-2">
          Click on the "Calculate BPM" button, and StrideSync will filter your
          selected playlist, leaving you with songs that match your steps per
          minute, ensuring an ideal musical accompaniment for your run.
        </p>
        <h3>5. Export Your Playlist</h3>
        <p className="mb-2">
          Click on the "Export Playlist" button, and StrideSync will send the
          new playlist right to your spotify account.
        </p>
      </div>
      <div className="flex w-1/2 justify-center">
        <Card>
          <h2>Spotify StrideSync</h2>
          <p className="m-auto w-3/4 p-4 italic text-gray-400">
            The perfect playlist for your next run
          </p>
          <SubmitButton onClick={() => loginWithSpotify()}>
            Login with Spotify
          </SubmitButton>
        </Card>
      </div>
    </div>
  );
}

export default Login;

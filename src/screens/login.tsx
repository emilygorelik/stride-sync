import { useContext } from 'react';
import { UserTokenContext } from '../api';
import { Card, SubmitButton } from '../components';

function Login() {
  const { loginWithSpotify } = useContext(UserTokenContext);

  return (
    <div className="flex h-screen items-center justify-center">
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
  );
}

export default Login;

import { useContext } from 'react';
import { SubmitButton } from '../components/SubmitButton';
import { UserTokenContext } from '../scripts/api';
import { Card } from '../components/Card';

function Login() {
  const { loginWithSpotify } = useContext(UserTokenContext);

  return (
    <div className="flex h-screen justify-center items-center">
      <Card>
        <h1 className="text-2xl font-bold text-black">Spotify StrideSync</h1>
        <p className="italic p-4 w-3/4 text-gray-400">
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

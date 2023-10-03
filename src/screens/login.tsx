import { useContext } from 'react';
import { SubmitButton } from '../components/SubmitButton';
import { UserTokenContext } from '../scripts/api';
import { Card } from '../components/Card';

function Login() {
  const { loginWithSpotify } = useContext(UserTokenContext);

  return (
    <div className="flex h-screen justify-center items-center">
      <Card>
        <h2>Spotify StrideSync</h2>
        <p className="italic p-4 w-3/4 m-auto text-gray-400">
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

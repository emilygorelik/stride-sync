import { useContext } from 'react';
import { UserTokenContext } from '../api';
import Home from './home';

interface CallbackProps {
  code?: string | null;
}

function Callback({ code }: CallbackProps) {
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);

  if (!accessToken && code) {
    loginWithSpotify(code);
  }

  return <Home />;
}

export default Callback;

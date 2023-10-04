import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserTokenContext } from '../api';
import Home from './home';
import Login from './login';

function Callback() {
  const [searchParams] = useSearchParams();
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);

  if (!accessToken) {
    const code = searchParams.get('code');
    if (code) {
      loginWithSpotify(code);
    } else {
      return <Login />;
    }
  }

  return <Home />;
}

export default Callback;

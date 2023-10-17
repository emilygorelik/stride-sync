import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserTokenContext } from '../api';
import Home from './home';

function Callback() {
  const [searchParams] = useSearchParams();
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);
  //const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      //navigate('/home');
      console.log(accessToken);
    }
  }, [accessToken]);

  if (!accessToken) {
    const code = searchParams.get('code');
    if (code) {
      loginWithSpotify(code);
    }
  }

  return <Home />;
}

export default Callback;

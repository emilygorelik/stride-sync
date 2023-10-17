import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserTokenContext } from '../api';

function Callback() {
  const [searchParams] = useSearchParams();
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/home');
    }
  }, [accessToken]);

  if (!accessToken) {
    const code = searchParams.get('code');
    if (code) {
      loginWithSpotify(code);
    }
  }

  return (
    <div>
      <span>Loading access token...</span>
    </div>
  );
}

export default Callback;
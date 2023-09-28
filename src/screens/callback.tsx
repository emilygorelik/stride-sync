import { useContext } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { UserTokenContext } from '../scripts/api';

function Callback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);
  const code = searchParams.get('code');

  if (code && !accessToken) {
    loginWithSpotify(code);
    return (
      <div className="flex flex-col justify-center items-center">
        Home Page WIP
        <br></br>
        {searchParams.get('code')}
        <br></br>
        weeeeeeeee
        <br></br>
        {accessToken}
      </div>
    );
  }
  return (
    <div>
      {accessToken}
      <br />
      boooooooooooooooo
    </div>
  );
  //return <Navigate to="/"></Navigate>;
}

export default Callback;

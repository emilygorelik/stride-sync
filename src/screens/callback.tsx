import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserTokenContext, fetchProfile } from '../scripts/api';
import { useQuery } from 'react-query';

function Callback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);
  const code = searchParams.get('code');
  const [user, setUser] = useState();
  const { isLoading } = useQuery(
    ['taskLists'],
    () => fetchProfile(accessToken),
    {
      onSuccess: (user) => {
        setUser(user);
        console.log('-------------');
        console.log(user);
      },
    },
  );

  if (isLoading) {
    return (
      <p>
        please wait
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </p>
    );
  }
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
      {user?.display_name}
    </div>
  );
  //return <Navigate to="/"></Navigate>;
}

export default Callback;

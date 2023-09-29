import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserTokenContext, fetchProfile } from '../scripts/api';
import { useQuery } from 'react-query';

function Callback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);
  const code = searchParams.get('code');
  const [user, setUser] = useState([]);
  const { isLoading } = useQuery(
    ['taskLists'],
    async () => await fetchProfile(accessToken),
    {
      onSuccess: (user) => {
        setUser(user);
      },
    },
  );

  if (isLoading) {
    return <></>;
  }
  if (code && !accessToken) {
    loginWithSpotify(code);
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        Home Page WIP
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      Hello there {user.display_name}
    </div>
  );
}

export default Callback;

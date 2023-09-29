import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserTokenContext, fetchProfile } from '../scripts/api';
import { useQuery } from 'react-query';

interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
}

function Callback() {
  const [searchParams] = useSearchParams();
  const { loginWithSpotify, accessToken } = useContext(UserTokenContext);
  const code = searchParams.get('code');
  const [user, setUser] = useState<SpotifyUser[]>();
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

  console.log(user);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      Hello there {user ? user.display_name : 'Guest'}
    </div>
  );
}

export default Callback;

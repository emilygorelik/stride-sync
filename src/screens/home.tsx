import { useContext } from 'react';
import { UserTokenContext } from '../scripts/api';

function Home() {
  const { accessToken } = useContext(UserTokenContext);
  console.log(accessToken);
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
      Home Page WIP
      {accessToken}
    </div>
  );
}

export default Home;

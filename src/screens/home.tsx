import { Card } from '../components/Card';
import { SubmitButton } from '../components/SubmitButton';

function Home() {
  return (
    <div className="flex w-screen justify-center flex-col items-center">
      <h1 className="text-3xl font-bold my-8">Spotify StrideSync</h1>
      <div className="flex w-full gap-4 px-4">
        <Card addClass="w-1/2">
          <h2>Select Playlist</h2>
        </Card>
        <div className="w-1/2 flex justify-center items-end">
          <SubmitButton>Sync My Stride</SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default Home;

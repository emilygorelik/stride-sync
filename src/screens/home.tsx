import { Card } from '../components/Card';
import { Playlist } from '../components/Playlist';
import { RunDetailsBlock } from '../components/RunDetailsBlock';
import { StrideDetailsBlock } from '../components/StrideDetailsBlock';
import { SubmitButton } from '../components/SubmitButton';

function Home() {
  return (
    <div className="flex w-3/4 h-screen m-auto p-8 flex-col items-center">
      <h1 className="text-3xl font-bold">Spotify StrideSync</h1>
      <div className="flex w-full overflow-hidden gap-8 px-4">
        <Card addClass="flex w-1/2">
          <h2>Select Playlist</h2>
          <div className="flex flex-col w-full gap-4 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-indigo-600">
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
            bottom
          </div>
          {/* TODO: create playlist display component */}
          {/* map all playlists to this component */}
        </Card>
        <div className="w-1/2 flex flex-col items-center gap-4">
          {/* selections */}
          <RunDetailsBlock />
          <StrideDetailsBlock />
          <SubmitButton>Sync My Stride</SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default Home;

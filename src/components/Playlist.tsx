interface PlaylistProps {
  name: string;
  imageURL: string;
  numTracks: number;
}

export function Playlist({ name, imageURL, numTracks }: PlaylistProps) {
  return (
    <div className="flex w-full items-center hover:cursor-pointer">
      <div className="w-1/6">
        <img src={imageURL} alt="" />
      </div>
      <div className="flex w-5/6 flex-col pl-4 text-left">
        <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-black">
          {name}
        </h3>
        <h4 className="text-gray-400">{numTracks} tracks</h4>
      </div>
    </div>
  );
}

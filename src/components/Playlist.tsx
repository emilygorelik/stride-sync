interface PlaylistProps {
  name: string;
  imageURL: string;
  numTracks: number;
}

export function Playlist({ name, imageURL, numTracks }: PlaylistProps) {
  return (
    <div className="flex w-full hover:cursor-pointer">
      <div className="w-1/6">
        <img src={imageURL} alt="" />
      </div>
      <div className="flex flex-col text-left pl-4 w-5/6">
        <h3 className="text-black overflow-hidden overflow-ellipsis whitespace-nowrap">
          {name}
        </h3>
        <h4 className="text-gray-400">{numTracks} tracks</h4>
      </div>
    </div>
  );
}

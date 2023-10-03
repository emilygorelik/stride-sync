export function Playlist() {
  return (
    <div className="flex w-full border-2">
      <div className="w-1/6">
        <img
          src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
          alt=""
        />
      </div>
      <div className="flex flex-col text-left pl-4 w-5/6">
        <h3 className="text-black overflow-hidden overflow-ellipsis whitespace-nowrap">
          name name name name name name name name name name words
        </h3>
        <h4 className="text-gray-400"># tracks</h4>
      </div>
    </div>
  );
}

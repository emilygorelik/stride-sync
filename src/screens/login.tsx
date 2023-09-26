function Login() {
  return (
    <div className="flex bg-purple-950 w-[100vw] h-[100vh] justify-center items-center">
      <div className="flex flex-col bg-white w-fit h-min p-6 rounded-2xl">
        <h1 className="text-3xl mb-4 font-bold">Spotify StrideSync</h1>
        <h1 className="text-xl mb-4 italic text-gray-400 text-center">
          The perfect playlist <br /> for your next run
        </h1>
        <button className="bg-green-400 w-100 py-2 px-4 rounded-full text-white text-2xl font-bold uppercase">
          login with spotify
        </button>
      </div>
    </div>
  );
}

export default Login;

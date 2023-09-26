import { SubmitButton } from '../components/SubmitButton';

function Login() {
  return (
    <div className="flex bg-purple-700 w-[100vw] h-[100vh] justify-center items-center">
      <div className="flex flex-col bg-white w-fit h-min p-6 rounded-2xl text-center items-center drop-shadow-xl">
        <h1 className="h1 text-black">Spotify StrideSync</h1>
        <p className="italic p-4 w-3/4">
          The perfect playlist for your next run
        </p>
        <SubmitButton>Login with Spotify</SubmitButton>
      </div>
    </div>
  );
}

export default Login;

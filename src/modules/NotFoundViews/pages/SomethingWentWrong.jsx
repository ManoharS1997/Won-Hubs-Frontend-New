import { useNavigate } from "react-router-dom";

const SomethingWentWrong = () => {
  const Navigate = useNavigate()
  return (
    <div className="w-screen h-screen text-center p-4 flex flex-col items-center justify-center">
      <img
        src='https://res.cloudinary.com/dkk0hqyat/image/upload/v1752829694/planet_gil3h7.png'
        alt="error"
        className="w-[300px]"
      />
      <h1 className="text-3xl font-bold mb-4">Something Went Wrong!</h1>
      <p className="text-lg text-gray-600">
        We're sorry, but an unexpected error has occurred.
        <br />
        Please try refreshing the page or contact support if the problem persists.
      </p>

      <div className="flex items-center gap-10">
        <span
          onClick={() => window.location.reload()}
          className="hover:underline cursor-pointer font-semibold border px-4 py-2 rounded-full"
        >Reload</span>
        <button
          type="button"
          onClick={() => Navigate(-1)}
          className="bg-black text-white px-4 py-2 border border-black !rounded-full hover:!bg-white hover:!text-black transition duration-500"
        >
          Go back
        </button>
      </div>
    </div>
  );
};


export default SomethingWentWrong;

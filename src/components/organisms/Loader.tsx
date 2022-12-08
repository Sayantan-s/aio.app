import { Player } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  return (
    <div className="w-full h-full relative">
      <Player
        autoplay
        loop
        src={"/loading.json"}
        className="w-12 h-12 opacity-60 dark:opacity-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Loader;

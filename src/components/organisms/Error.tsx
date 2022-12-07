import { SadEmo } from "@components/icons";

interface Props {
  message: string;
}

const Error = ({ message }: Props) => {
  return (
    <div className="w-full h-full relative">
      <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <SadEmo size={64} className="fill-rose-600" />
        <h1 className="text-center mt-3 text-rose-600/70 text-lg font-medium capitalize italic">
          &ldquo; {message || "Something went wrong!"}&rdquo;
        </h1>
      </div>
    </div>
  );
};

export default Error;

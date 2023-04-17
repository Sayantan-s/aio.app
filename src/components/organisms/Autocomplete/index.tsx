import { ChangeEventHandler, FC } from "react";

interface CommonProps {
  "auto-id": string;
}

interface InputProps extends CommonProps {}

export const Input: FC<InputProps> = () => {
  const onChange: ChangeEventHandler = (eve) => {};
  return <div>Input</div>;
};

export const Options = () => {
  return <div>Options</div>;
};

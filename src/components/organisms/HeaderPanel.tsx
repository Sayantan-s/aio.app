import DarkModeToggler from "./DarkModeToggler";

interface Props {
  children: React.ReactNode;
}

const HeaderPanel = ({ children }: Props) => {
  return (
    <div className="flex gap-x-2 justify-between items-center mb-4 ">
      {children}
      <DarkModeToggler />
    </div>
  );
};

export default HeaderPanel;

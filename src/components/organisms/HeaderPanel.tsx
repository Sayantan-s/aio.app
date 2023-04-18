import DarkModeToggler from "./DarkModeToggler";

interface Props {
  children: React.ReactNode;
}

const HeaderPanel = ({ children }: Props) => {
  return (
    <div className="flex items-stretch gap-x-2 justify-between">
      {children}
      <DarkModeToggler />
    </div>
  );
};

export default HeaderPanel;

import DarkModeToggler from "./DarkModeToggler";

interface Props {
  children: React.ReactNode;
}

const HeaderPanel = ({ children }: Props) => {
  return (
    <div className="flex items-stretch gap-x-2 justify-between mb-4">
      {children}
      <DarkModeToggler />
    </div>
  );
};

export default HeaderPanel;

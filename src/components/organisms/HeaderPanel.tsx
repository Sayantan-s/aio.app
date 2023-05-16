interface Props {
  children: React.ReactNode;
}

const HeaderPanel = ({ children }: Props) => {
  return <div className="flex items-stretch justify-between gap-x-2">{children}</div>;
};

export default HeaderPanel;

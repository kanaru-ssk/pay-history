type Props = {
  children: React.ReactNode;
};

const MenuItem = ({ children }: Props) => {
  return <div className="mt-4 font-bold">{children}</div>;
};

export default MenuItem;

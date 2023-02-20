type Props = {
  children: React.ReactNode;
};

const MenuItem = ({ children }: Props) => {
  return <div className="mt-4 flex justify-center">{children}</div>;
};
export default MenuItem;

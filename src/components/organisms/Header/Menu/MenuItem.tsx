import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MenuItem = ({ children }: Props) => {
  return <div className="mt-4 font-bold">{children}</div>;
};

export default MenuItem;

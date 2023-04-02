import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Heading3 = ({ children }: Props) => {
  return <h3 className="my-1 font-bold">{children}</h3>;
};

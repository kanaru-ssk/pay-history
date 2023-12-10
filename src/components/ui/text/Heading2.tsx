import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Heading2({ children }: Props) {
  return <h2 className="my-4 text-xl font-bold">{children}</h2>;
}

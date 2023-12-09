import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function MenuItem({ children }: Props) {
  return <div className="mt-4 font-bold">{children}</div>;
}

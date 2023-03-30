import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Heading1 = ({ children }: Props) => {
  return (
    <h1 className="my-8 border-b-2 border-gray-400 py-4 text-2xl font-bold">
      {children}
    </h1>
  );
};

export default Heading1;

import { type InputHTMLAttributes } from "react";

type Props = {
  right?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ right, ...rest }: Props) => {
  return (
    <input
      className={`${
        right ? "text-right" : "text-left"
      } h-12 w-full flex-1 appearance-none rounded border border-gray-400 bg-white px-4`}
      {...rest}
    />
  );
};

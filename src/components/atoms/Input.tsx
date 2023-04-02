import { type InputHTMLAttributes } from "react";

type Props = {
  small?: boolean;
  right?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ small, right, ...rest }: Props) => {
  return (
    <input
      className={`${right && "text-right"} ${
        small ? "h-10 border px-2" : "h-12 border-2 px-5"
      } h-12 w-full flex-1 rounded-lg border-gray-400`}
      {...rest}
    />
  );
};

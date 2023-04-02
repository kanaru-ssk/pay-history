import { type InputHTMLAttributes } from "react";

type Props = {
  small?: boolean;
  right?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ small, right, ...rest }: Props) => {
  return (
    <input
      className={`h-12 w-full rounded-lg border-gray-400 ${
        right && "text-right"
      } ${small ? "h-10 border px-2" : "h-12 border-2 px-5"}`}
      {...rest}
    />
  );
};

export default Input;

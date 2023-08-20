import { type ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  color?: "red" | "black" | "gray" | "grayOut";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ color = "gray", ...rest }: ButtonProps) => {
  const buttonColor = (() => {
    if (color === "red") return "text-white bg-red-400 hover:bg-gray-400";
    else if (color === "black") return "text-white bg-black hover:bg-gray-400";
    else if (color === "grayOut")
      return "bg-gray-100 text-gray-400 dark:bg-gray-700";
    else return "text-black font-bold bg-gray-100 hover:bg-gray-400";
  })();

  return (
    <button
      className={`${buttonColor} h-10 w-full rounded-full px-5 text-center`}
      {...rest}
    />
  );
};

import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  color?: "red" | "black" | "gray" | "grayOut";
  large?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ color = "gray", large, ...rest }: ButtonProps) => {
  const buttonColor = (() => {
    if (color === "red") return "text-white bg-red-400 hover:bg-gray-400";
    else if (color === "black") return "text-white bg-black hover:bg-gray-400";
    else if (color === "grayOut") return "bg-gray-100 text-gray-400";
    else return "text-black font-bold bg-gray-100 hover:bg-gray-400";
  })();
  const buttonSize = large ? "h-12 w-full" : "px-4";

  return (
    <button
      className={`rounded-full text-center ${buttonSize} ${buttonColor}`}
      {...rest}
    />
  );
};

export default Button;

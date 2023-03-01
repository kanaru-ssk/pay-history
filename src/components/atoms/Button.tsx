import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  color?: "red" | "blue" | "gray" | "grayOut";
  large?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ color = "gray", large, ...rest }: ButtonProps) => {
  const buttonColor = (() => {
    if (color === "red") return "text-white bg-red hover:bg-gray";
    else if (color === "blue") return "text-white bg-main-color hover:bg-gray";
    else if (color === "grayOut") return "bg-light-gray text-gray";
    else return "text-main-color font-bold bg-light-gray hover:bg-gray";
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

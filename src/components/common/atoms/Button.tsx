import { ReactNode, ButtonHTMLAttributes } from "react";

import LoadingIcon from "components/common/atoms/icons/LoadingIcon";

type Props = {
  children: ReactNode;
  isReady?: boolean;
  isLoading?: boolean;
  red?: boolean;
  blue?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  isReady = true,
  isLoading,
  red,
  blue,
  ...rest
}: Props) => {
  const color = (() => {
    if (red) return "text-white bg-red hover:bg-gray";
    if (blue) return "text-white bg-main-color hover:bg-gray";
    return "text-main-color font-bold bg-light-gray hover:bg-gray";
  })();

  return (
    <button
      className={
        (isReady && !isLoading ? color : "bg-light-gray text-gray") +
        " h-12 w-full rounded-full text-center"
      }
      {...rest}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingIcon red={red} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

import Loading from "components/Loading";

type Props = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isReady?: boolean;
  isLoading?: boolean;
  red?: boolean;
  blue?: boolean;
};

const Button = ({
  text,
  onClick,
  isReady = true,
  isLoading,
  red,
  blue,
}: Props) => {
  const color = () => {
    if (red) return "text-white bg-red hover:bg-gray";
    if (blue) return "text-white bg-main-color hover:bg-gray";
    return "text-main-color font-bold bg-light-gray hover:bg-gray";
  };

  return (
    <button
      onClick={onClick}
      className={
        (isReady && !isLoading ? color() : "bg-light-gray text-gray") +
        " h-12 w-full rounded-3xl text-center"
      }
    >
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;

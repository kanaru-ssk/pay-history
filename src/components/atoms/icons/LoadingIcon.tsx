type Props = {
  red?: boolean;
};

const LoadingIcon = ({ red }: Props) => {
  const color = red
    ? "border-red-400 border-t-red-400"
    : "border-black border-t-gray-400";

  return (
    <svg
      className={`${color} inline-block h-6 w-6 animate-spin rounded-full border-2`}
    ></svg>
  );
};

export default LoadingIcon;

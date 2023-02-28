type Props = {
  red?: boolean;
};

const LoadingIcon = ({ red }: Props) => {
  const color = red
    ? "border-red border-t-light-red"
    : "border-main-color border-t-sub-color";

  return (
    <div
      className={color + " h-6 w-6 animate-spin rounded-full border-2"}
    ></div>
  );
};

export default LoadingIcon;

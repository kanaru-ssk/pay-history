type Props = {
  red?: boolean;
};

const LoadingIcon = ({ red }: Props) => {
  const color = red
    ? "border-red border-t-light-red"
    : "border-main-color border-t-sub-color";

  return (
    <svg
      className={`${color} inline-block h-6 w-6 animate-spin rounded-full border-2`}
    ></svg>
  );
};

export default LoadingIcon;

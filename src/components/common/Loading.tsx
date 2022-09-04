type Props = {
  red?: boolean;
};

const Loading = ({ red }: Props) => {
  const color = () => {
    if (red) return "border-red border-t-light-red";
    return "border-main-color border-t-sub-color";
  };
  return (
    <div
      className={color() + " h-6 w-6 animate-spin rounded-full border-2"}
    ></div>
  );
};

export default Loading;

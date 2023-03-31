type Props = {
  direction: "left" | "right";
  disable?: boolean;
};

const ArrowIcon = ({ direction, disable }: Props) => {
  const scale = direction === "right" ? "scale-x-[-1]" : undefined;
  const color = disable ? "#ddd" : "#000";
  return (
    <svg
      width="40"
      height="44"
      viewBox="0 0 40 44"
      fill={color}
      className={scale}
    >
      <path d="M24 16L16 22L24 28L24 16Z" fill="black" />
    </svg>
  );
};

export default ArrowIcon;

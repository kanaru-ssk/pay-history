type Props = {
  direction: "left" | "right";
};

export function ArrowIcon({ direction }: Props) {
  return (
    <svg
      width="40"
      height="44"
      viewBox="0 0 40 44"
      fill="none"
      className={direction === "right" ? "scale-x-[-1]" : ""}
    >
      <path
        d="M24 16L16 22L24 28L24 16Z"
        fill="none"
        className="fill-current text-black dark:text-white"
      />
    </svg>
  );
}

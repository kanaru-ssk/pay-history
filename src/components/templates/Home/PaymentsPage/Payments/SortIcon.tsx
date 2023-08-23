type Props = {
  isAcs: boolean;
  disable?: boolean;
};

export const SortIcon = ({ isAcs, disable }: Props) => {
  return (
    <svg width="12" height="14" className="inline">
      <path
        d="M12 6H0L6 0L12 6Z"
        fill="none"
        className={`${
          !disable && !isAcs
            ? "text-black dark:text-white"
            : "text-gray-300 dark:text-gray-600"
        } fill-current`}
      />
      <path
        d="M5.24537e-07 8L12 8L6 14L5.24537e-07 8Z"
        fill="none"
        className={`${
          !disable && isAcs
            ? "text-black dark:text-white"
            : "text-gray-300 dark:text-gray-600"
        } fill-current`}
      />
    </svg>
  );
};

type Props = {
  isAcs: boolean;
  disable?: boolean;
};

const SortIcon = ({ isAcs, disable }: Props) => {
  return (
    <svg width="12" height="14" className="inline">
      <path
        d="M12 6H0L6 0L12 6Z"
        fill={disable ? "#ddd" : isAcs ? "#ddd" : "#000"}
      />
      <path
        d="M5.24537e-07 8L12 8L6 14L5.24537e-07 8Z"
        fill={disable ? "#ddd" : isAcs ? "#000" : "#ddd"}
      />
    </svg>
  );
};

export default SortIcon;

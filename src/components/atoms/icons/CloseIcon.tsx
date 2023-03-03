import { colors } from "constants/colors";

const CloseIcon = () => {
  return (
    <svg className="w-3 h-3">
      <path
        d="M0 12L12 0ZM0 0L12 12Z"
        stroke={colors.DARK_GRAY}
        strokeWidth="2"
      />
    </svg>
  );
};

export default CloseIcon;

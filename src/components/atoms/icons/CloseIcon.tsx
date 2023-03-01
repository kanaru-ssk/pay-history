import { colors } from "constants/colors";

const CloseIcon = () => {
  return (
    <svg className="w-6 h-6" stroke={colors.DARK_GRAY}>
      <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export default CloseIcon;

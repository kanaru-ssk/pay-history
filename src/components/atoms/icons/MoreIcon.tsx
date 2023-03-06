import { colors } from "constants/colors";

const MoreIcon = () => {
  return (
    <svg width="2" height="14" className="inline">
      <circle cx="1" cy="1" r="1" fill={colors.DARK_GRAY} />
      <circle cx="1" cy="7" r="1" fill={colors.DARK_GRAY} />
      <circle cx="1" cy="13" r="1" fill={colors.DARK_GRAY} />
    </svg>
  );
};

export default MoreIcon;

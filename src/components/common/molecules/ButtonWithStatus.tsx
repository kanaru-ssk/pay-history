import type { ButtonProps } from "components/common/atoms/Button";

import Button from "components/common/atoms/Button";
import LoadingIcon from "components/common/atoms/icons/LoadingIcon";

type Props = {
  isReady?: boolean;
  isLoading?: boolean;
} & ButtonProps;

const ButtonWithStatus = ({
  isReady = true,
  isLoading,
  children,
  color,
  ...rest
}: Props) => {
  const buttonColor = !isReady || isLoading ? "grayOut" : color;

  return (
    <Button color={buttonColor} large {...rest}>
      {isLoading ? <LoadingIcon red={color === "red"} /> : children}
    </Button>
  );
};

export default ButtonWithStatus;

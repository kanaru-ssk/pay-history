import { Button, type ButtonProps } from "@/components/ui/button/Button";
import { LoadingIcon } from "@/components/ui/icon/LoadingIcon";

type Props = {
  isReady?: boolean;
  isLoading?: boolean;
} & ButtonProps;

export function ButtonWithStatus({
  isReady = true,
  isLoading,
  children,
  color,
  ...rest
}: Props) {
  const buttonColor = !isReady || isLoading ? "grayOut" : color;

  return (
    <Button color={buttonColor} {...rest}>
      {isLoading ? <LoadingIcon /> : children}
    </Button>
  );
}

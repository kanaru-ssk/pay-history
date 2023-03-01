import { useReducer } from "react";

import CloseIcon from "components/atoms/icons/CloseIcon";

type Props = {
  text: string;
  show?: boolean;
  isError?: boolean;
  canHide?: boolean;
};

const Notification = ({
  text,
  show = true,
  isError,
  canHide = !isError,
}: Props) => {
  const [hide, onHide] = useReducer(() => true, false);

  if (!text || !show || hide) return null;

  return (
    <div
      className={
        (isError
          ? "border-red bg-light-red text-red"
          : "border-main-color bg-light-gray text-main-color") +
        " rounded border p-4 flex justify-between gap-2"
      }
    >
      {text}
      {canHide && (
        <button onClick={onHide}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Notification;

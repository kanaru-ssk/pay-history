import { useReducer } from "react";
import { CloseIcon } from "@/components/ui/icon/CloseIcon";

type Props = {
  text: string;
  show?: boolean;
  isError?: boolean;
  canHide?: boolean;
};

export function Notification({
  text,
  show = true,
  isError,
  canHide = !isError,
}: Props) {
  const [hide, onHide] = useReducer(() => true, false);

  if (!text || !show || hide) return null;

  return (
    <div
      className={`${
        isError
          ? "border-red-800 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-100"
          : "border-black bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100"
      } flex justify-between gap-2 rounded border p-4`}
    >
      {text}
      {canHide && (
        <button onClick={onHide} aria-label="hide notification">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

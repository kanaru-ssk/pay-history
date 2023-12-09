import { type MouseEventHandler } from "react";
import { useLocale } from "@/hooks/useLocale";
import { SortIcon } from "./SortIcon";

type Props = {
  isSortDate: boolean;
  isAcsDate: boolean;
  isAcsPrice: boolean;
  onClickSortDate: MouseEventHandler<HTMLButtonElement>;
  onClickSortPrice: MouseEventHandler<HTMLButtonElement>;
};

export function SortBar({
  isSortDate,
  isAcsDate,
  isAcsPrice,
  onClickSortDate,
  onClickSortPrice,
}: Props) {
  const { text } = useLocale();
  return (
    <div className="sticky top-52 flex h-9 justify-between border-gray-400 bg-gray-100 px-4 text-xs dark:bg-gray-800">
      <button onClick={onClickSortDate} className="flex items-center gap-2">
        <span>{text.SPENT_DATE}</span>
        <SortIcon isAcs={isAcsDate} disable={!isSortDate} />
      </button>
      <button onClick={onClickSortPrice} className="flex items-center gap-2">
        <span>{text.AMOUNT}</span>
        <SortIcon isAcs={isAcsPrice} disable={isSortDate} />
      </button>
    </div>
  );
}

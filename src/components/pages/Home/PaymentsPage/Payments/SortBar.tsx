import { type MouseEventHandler } from "react";
import SortIcon from "@/components/atoms/icons/SortIcon";
import { useLocale } from "@/hooks/useLocale";

type Props = {
  isSortDate: boolean;
  isAcsDate: boolean;
  isAcsPrice: boolean;
  onClickSortDate: MouseEventHandler<HTMLButtonElement>;
  onClickSortPrice: MouseEventHandler<HTMLButtonElement>;
};

const SortBar = ({
  isSortDate,
  isAcsDate,
  isAcsPrice,
  onClickSortDate,
  onClickSortPrice,
}: Props) => {
  const { text } = useLocale();
  return (
    <div className="sticky top-52 flex h-9 justify-between border-gray-400 bg-gray-100 px-4 text-xs">
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
};

export default SortBar;

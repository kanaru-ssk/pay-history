import { ArrowIcon } from "@/components/atoms/icons/ArrowIcon";
import { SortIcon } from "@/components/atoms/icons/SortIcon";
import { useDocId } from "@/hooks/useDocId";
import { useLocale } from "@/hooks/useLocale";

export const Skelton = () => {
  return (
    <div>
      <BudgetSkelton />
      <div>
        <SortBarSkelton />
        <div>
          <TableItemSkelton />
          <TableItemSkelton />
          <TableItemSkelton />
        </div>
      </div>
      <FormSkelton />
    </div>
  );
};

const BudgetSkelton = () => {
  const { docId } = useDocId();
  const { text } = useLocale();
  return (
    <div className="sticky top-12 bg-white">
      <div>
        <div className="flex h-28 items-center px-2">
          <ArrowIcon direction="left" />
          <div className="w-full">
            <div>{docId.replace("-", " / ")}</div>
            <div className="text-right">
              <span className="inline-block h-9 w-28 animate-pulse rounded bg-gray-100"></span>
            </div>
            <div className="h-3 rounded-sm border border-black p-px">
              <div className="h-2 animate-pulse rounded-sm bg-gray-100"></div>
            </div>
          </div>
          <ArrowIcon direction="right" />
        </div>
        <div>
          <div className="flex h-12 items-center justify-between px-4">
            <div>{text.TOTAL_SPENDING}</div>
            <div className="h-6 w-16 animate-pulse rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SortBarSkelton = () => {
  const { text } = useLocale();
  return (
    <div className="sticky top-52 flex h-9 justify-between border-gray-400 bg-gray-100 px-4 text-xs">
      <span className="flex items-center gap-2">
        <span>{text.SPENT_DATE}</span>
        <SortIcon isAcs disable />
      </span>
      <span className="flex items-center gap-2">
        <span>{text.AMOUNT}</span>
        <SortIcon isAcs disable />
      </span>
    </div>
  );
};

const TableItemSkelton = () => {
  return (
    <div className="flex h-12 items-center justify-between px-4">
      <div className="h-6 w-16 animate-pulse rounded bg-gray-100"></div>
      <div className="h-6 w-16 animate-pulse rounded bg-gray-100"></div>
    </div>
  );
};

const FormSkelton = () => {
  const { text } = useLocale();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white px-4 pb-[env(safe-area-inset-bottom)] drop-shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
      <div className="flex w-full items-center gap-2 py-2">
        <div className="h-12 w-full animate-pulse rounded-lg border border-gray-400 bg-gray-100"></div>
        <div className="h-12 w-full animate-pulse rounded-lg border border-gray-400 bg-gray-100"></div>
        <p className={"text-gray-400"}>{text.ADD}</p>
      </div>
    </div>
  );
};

import { useDocId } from "@/hooks/useDocId";
import { useLocale } from "@/hooks/useLocale";
import { ArrowIcon } from "./PaymentsPage/Budget/ArrowIcon";
import { SortIcon } from "./PaymentsPage/Payments/SortIcon";

export function Skelton() {
  return (
    <div data-cy="skelton">
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
}

function BudgetSkelton() {
  const { docId } = useDocId();
  const { text } = useLocale();
  return (
    <div className="sticky top-12 bg-white dark:bg-gray-950">
      <div>
        <div className="flex h-28 items-center px-2">
          <span>
            <ArrowIcon direction="left" />
          </span>
          <div className="w-full">
            <div>{docId.replace("-", " / ")}</div>
            <div className="flex justify-end">
              <div className="h-9">
                <span className="my-0.5 inline-block h-8 w-44 animate-pulse rounded bg-gray-100 dark:bg-gray-800"></span>
              </div>
            </div>
            <div className="h-3 rounded-sm border border-black p-px">
              <div className="h-2 animate-pulse rounded-sm bg-gray-100 dark:bg-gray-800"></div>
            </div>
          </div>
          <span>
            <ArrowIcon direction="right" />
          </span>
        </div>
        <div>
          <div className="flex h-12 items-center justify-between">
            <div className="ml-4">{text.TOTAL_SPENDING}</div>
            <div className="mr-3.5 h-6 w-16 animate-pulse rounded bg-gray-100 dark:bg-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortBarSkelton() {
  const { text } = useLocale();
  return (
    <div className="sticky top-52 flex h-9 justify-between border-gray-400 bg-gray-100 px-4 text-xs dark:bg-gray-800">
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
}

function TableItemSkelton() {
  return (
    <div className="flex h-12 items-center justify-between px-3.5">
      <div className="h-6 w-12 animate-pulse rounded bg-gray-100 dark:bg-gray-800"></div>
      <div className="h-6 w-16 animate-pulse rounded bg-gray-100 dark:bg-gray-800"></div>
    </div>
  );
}

function FormSkelton() {
  const { text } = useLocale();
  return (
    <div className="fixed bottom-0 left-0 w-full px-4 pb-[env(safe-area-inset-bottom)] drop-shadow-[0_-2px_4px_rgba(0,0,0,0.1)] dark:bg-gray-950">
      <div className="flex w-full items-center gap-2 py-2">
        <div className="h-12 flex-1 animate-pulse rounded border border-gray-400 bg-gray-100"></div>
        <div className="h-12 flex-1 animate-pulse rounded border border-gray-400 bg-gray-100"></div>
        <span className="text-gray-400">{text.ADD}</span>
      </div>
    </div>
  );
}

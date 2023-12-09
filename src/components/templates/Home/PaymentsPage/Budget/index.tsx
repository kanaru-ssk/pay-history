import Link from "next/link";
import { useEffect, useState } from "react";
import { PenIcon } from "@/components/ui/icon/PenIcon";
import { useAuth } from "@/hooks/useAuth";
import { useDocId } from "@/hooks/useDocId";
import { useLocale } from "@/hooks/useLocale";
import { useModal } from "@/hooks/useModal";
import { type MonthlyData } from "@/types/firebase";
import { ArrowIcon } from "./ArrowIcon";
import { BudgetEditForm } from "./BudgetEditForm";

type Props = {
  thisMonthData: MonthlyData | null;
};

export function Budget({ thisMonthData }: Props) {
  const { dbUser } = useAuth();
  const { docId, prevDocId, nextDocId } = useDocId();
  const { text } = useLocale();
  const { setModalContents } = useModal();
  const [budget, setBudget] = useState<number>(0);
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [remainRatio, setRemainRatio] = useState<number>(0);

  useEffect(() => {
    if (dbUser) {
      if (thisMonthData) {
        // load the budget
        setBudget(thisMonthData.budget);
        // calculate amount spent
        const total = thisMonthData.payments.reduce((sum, value) => {
          return sum + value.price;
        }, 0);
        setTotalSpending(total);
      } else {
        setBudget(dbUser.budget);
        setTotalSpending(0);
      }
    }
  }, [thisMonthData, dbUser]);

  // remaining
  useEffect(() => {
    const tmpRatio = (1 - totalSpending / budget) * 100;
    const newRemainRatio = tmpRatio < 0 ? 0 : tmpRatio;
    setRemainRatio(newRemainRatio);
    setRemaining(budget - totalSpending);
  }, [totalSpending, budget]);

  return (
    <div>
      <div className="flex h-28 items-center px-2">
        <Link
          href={{ query: { month: prevDocId } }}
          shallow
          aria-label="previous month"
        >
          <ArrowIcon direction="left" />
        </Link>
        <div className="w-full">
          <div>{docId.replace("-", " / ")}</div>
          <div className="flex justify-end">
            <div>
              {"¥ "}
              <span className="text-3xl font-medium" data-cy="remaining">
                {remaining.toLocaleString()}
              </span>
              {" / "}
              <span
                onClick={() => {
                  setModalContents(
                    <BudgetEditForm
                      budget={budget}
                      thisMonthData={thisMonthData}
                    />,
                  );
                }}
                className="cursor-pointer font-medium"
                data-cy="budget"
              >
                {budget.toLocaleString()}
                <span className="pl-1">
                  <PenIcon />
                </span>
              </span>
            </div>
          </div>
          <div className="h-3 rounded-sm border border-black p-px dark:border-gray-300">
            <div
              className="h-2 rounded-sm bg-black dark:bg-gray-300"
              style={{ width: `${remainRatio}%` }}
            ></div>
          </div>
        </div>
        <Link
          href={{ query: { month: nextDocId } }}
          shallow
          aria-label="next month"
        >
          <ArrowIcon direction="right" />
        </Link>
      </div>
      <div>
        <div
          key={totalSpending}
          className="flex h-12 items-center justify-between px-4"
        >
          <div>{text.TOTAL_SPENDING}</div>
          <div className="font-medium" data-cy="total-spending">
            ¥ {totalSpending.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

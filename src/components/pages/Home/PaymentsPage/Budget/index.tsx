import Link from "next/link";
import { useEffect, useState } from "react";
import BudgetEditForm from "./BudgetEditForm";
import ArrowIcon from "@/components/atoms/icons/ArrowIcon";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import { useDocId } from "@/hooks/useDocId";
import { useModal } from "@/hooks/useModal";
import { type MonthlyData } from "@/types/firebase";

type Props = {
  thisMonthData: MonthlyData | null;
};

const Budget = ({ thisMonthData }: Props) => {
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
        <Link href={{ query: { month: prevDocId } }} shallow>
          <ArrowIcon direction="left" />
        </Link>
        <div className="w-full">
          <div>{docId.replace("-", " / ")}</div>
          <div className="flex flex-col items-end">
            <div>
              ¥{" "}
              <span className="text-3xl font-medium" data-cy="remaining">
                {remaining.toLocaleString()}
              </span>
              {" / "}
              <span
                onClick={() => {
                  if (thisMonthData)
                    setModalContents(
                      <BudgetEditForm
                        budget={budget}
                        thisMonthData={thisMonthData}
                      />
                    );
                }}
                className="font-medium"
                data-cy="budget"
              >
                {budget.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="h-3 rounded-sm border border-black p-px">
            <div
              className="h-2 rounded-sm bg-black"
              style={{ width: `${remainRatio}%` }}
            ></div>
          </div>
        </div>
        <Link href={{ query: { month: nextDocId } }} shallow>
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
};

export default Budget;

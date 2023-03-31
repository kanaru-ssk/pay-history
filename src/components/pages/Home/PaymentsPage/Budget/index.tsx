import { useEffect, useState } from "react";
import ArrowIcon from "components/atoms/icons/ArrowIcon";
import { useLocale } from "hooks/locale";
import { useModal } from "hooks/useModal";
import type { MonthlyData } from "types/firebase";
import BudgetEditForm from "./BudgetEditForm";

type Props = {
  thisMonthData: MonthlyData;
};

const Budget = ({ thisMonthData }: Props) => {
  const { text } = useLocale();
  const { setModalContents } = useModal();
  const [budget, setBudget] = useState<number>(0);
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  // load the budget
  useEffect(() => {
    setBudget(thisMonthData.budget);
  }, [thisMonthData.budget]);

  // calculate amount spent
  useEffect(() => {
    const total = thisMonthData.payments.reduce((sum, value) => {
      return sum + value.price;
    }, 0);
    setTotalSpending(total);
  }, [thisMonthData.payments]);

  // remaining
  useEffect(() => {
    setRemaining(budget - totalSpending);
  }, [totalSpending, budget]);

  return (
    <div>
      <div className="flex h-28 items-center px-2">
        <button>
          <ArrowIcon direction="left" />
        </button>
        <div className="w-full space-y-1">
          <div className="flex items-end justify-between">
            <span>2023 / 03</span>
            <div className="flex flex-col items-end">
              <div>
                ¥{" "}
                <span className="text-3xl font-medium">
                  {remaining.toLocaleString()}
                </span>
                {" / "}
                <span
                  onClick={() =>
                    setModalContents(
                      <BudgetEditForm
                        budget={budget}
                        thisMonthData={thisMonthData}
                      />
                    )
                  }
                  className="font-medium"
                >
                  {budget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="h-3 rounded-sm border border-black p-px">
            <div
              className="h-2 rounded-sm bg-black"
              style={{ width: `${(1 - totalSpending / budget) * 100}%` }}
            ></div>
          </div>
        </div>
        <button>
          <ArrowIcon direction="right" />
        </button>
      </div>
      <div>
        <div
          key={totalSpending}
          className="flex h-12 items-center justify-between px-4"
        >
          <div>{text.TOTAL_SPENDING}</div>
          <div className="font-medium">¥ {totalSpending.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Budget;

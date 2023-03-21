import { useEffect, useState } from "react";
import Input from "components/atoms/Input";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { stringToPrice } from "libs/convert";
import { updateMonthlyData } from "libs/monthlyData";
import { updateUser } from "libs/user";
import type { MonthlyData } from "types/firebase";

type Props = {
  thisMonthData: MonthlyData;
};

const Budget = ({ thisMonthData }: Props) => {
  const { dbUser } = useAuth();
  const { text } = useLocale();

  const [budget, setBudget] = useState<number>(0);
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

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

  // edit the budget
  const changeBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = stringToPrice(e.target.value.substring(2));
    setBudget(price);
    setIsReady(price !== thisMonthData.budget);
  };

  // save the budget
  const saveBudget = () => {
    if (isReady) {
      setIsReady(false);
      updateUser(dbUser, { budget: budget });
      updateMonthlyData(dbUser, { ...thisMonthData, budget: budget });
    }
  };

  return (
    <table className="mx-auto">
      <tbody>
        <tr>
          <th>{text.BUDGET}</th>
          <td className="text-right">
            <Input
              name="budget"
              type="text"
              inputMode="text"
              value={`¥ ${budget.toLocaleString()}`}
              onChange={changeBudget}
              onBlur={saveBudget}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              small
              right
            />
          </td>
        </tr>
        <tr className="border-b">
          <th>{text.SPENT}</th>
          <td
            className="px-4 text-right"
            data-cy="total-spending"
          >{`¥ ${totalSpending.toLocaleString()}`}</td>
        </tr>
        <tr>
          <th>{text.REMAINING}</th>
          <td
            className="text-right text-3xl"
            data-cy="remaining"
          >{`¥ ${remaining.toLocaleString()}`}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Budget;

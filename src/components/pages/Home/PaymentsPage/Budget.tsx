import { useEffect, useState } from "react";

import type { MonthlyData } from "types/firebase";

import Input from "components/common/Input";
import { useAuth } from "hooks/auth";
import { stringToPrice } from "libs/convert";
import { updateMonthlyData } from "libs/monthlyData";
import { updateUser } from "libs/user";

type Props = {
  thisMonthData: MonthlyData;
};

const Budget = ({ thisMonthData }: Props) => {
  const { dbUser } = useAuth();

  const [budget, setBudget] = useState<number>(0);
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // 予算読み込み
  useEffect(() => {
    setBudget(thisMonthData.budget);
  }, [thisMonthData.budget]);

  // 支出合計
  useEffect(() => {
    const total = thisMonthData.payments.reduce((sum, value) => {
      return sum + value.price;
    }, 0);
    setTotalSpending(total);
  }, [thisMonthData.payments]);

  // 残高
  useEffect(() => {
    setRemaining(budget - totalSpending);
  }, [totalSpending, budget]);

  // 予算編集
  const changeBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = stringToPrice(e.target.value);
    setBudget(price);
    setIsReady(price !== thisMonthData.budget);
  };

  // 予算保存
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
          <th>予算</th>
          <td className="text-right">
            <Input
              type="text"
              inputMode="numeric"
              value={budget.toLocaleString()}
              onChange={changeBudget}
              onBlur={saveBudget}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              small
              right
            />
          </td>
          <td>円</td>
        </tr>
        <tr className="border-b">
          <th>支出</th>
          <td className="text-right">{totalSpending.toLocaleString()}</td>
          <td>円</td>
        </tr>
        <tr>
          <th>残高</th>
          <td className="text-right text-3xl">{remaining.toLocaleString()}</td>
          <td>円</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Budget;

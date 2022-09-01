import { useEffect, useState } from "react";

import type { MonthlyData } from "types/firebase";

import { useAuth } from "hooks/auth";
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

  // 初回ロード
  useEffect(() => {
    if (thisMonthData?.budget) {
      setBudget(thisMonthData.budget);
    }
  }, [thisMonthData]);

  // 支出合計県産
  useEffect(() => {
    if (thisMonthData?.payments) {
      const total: number = thisMonthData.payments.reduce((sum, value) => {
        return sum + value.price;
      }, 0);
      setTotalSpending(total);
    }
  }, [thisMonthData?.payments]);

  // 残高計算
  useEffect(() => {
    setRemaining(budget - totalSpending);
  }, [totalSpending, budget]);

  // 予算編集ボタン
  const onSubmitHundler = () => {
    if (isReady) {
      updateUser(dbUser, budget);
      updateMonthlyData(dbUser, { ...thisMonthData, budget: budget });
      setIsReady(false);
    }
  };

  // 予算入力
  const onChangeBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const removed = e.target.value.replace(/,/g, "");
    const pattern = /^\d*$/;
    if (pattern.test(removed)) {
      const toNum = Number(removed);
      setBudget(toNum);
      if (0 < toNum && toNum !== thisMonthData.budget) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    } else {
      setBudget(0);
    }
  };

  return (
    <table className="mx-auto">
      <tbody>
        <tr>
          <th>予算</th>
          <td className="text-right">
            <input
              type="text"
              inputMode="numeric"
              value={budget.toLocaleString()}
              onChange={onChangeBudget}
              onBlur={onSubmitHundler}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              className="w-full rounded border border-gray text-right"
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

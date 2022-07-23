import { useState } from "react";

import type { MonthlyData } from "types/firebase";

import { useAuth } from "hooks/auth";
import { addPayment } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  const { authUser } = useAuth();

  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // 支払い追加
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thisMonthData) {
      addPayment(authUser, thisMonthData.docId, price);
      setPrice(0);
    }
  };

  // 支払い入力
  const onChangeNewPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const removed = e.target.value.replace(/,/g, "");
    const pattern = /^\d*$/;
    if (pattern.test(removed)) {
      const toNum = Number(removed);
      setPrice(toNum);
      if (0 < toNum) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    } else {
      setPrice(0);
    }
  };

  return (
    <>
      <table className="mx-auto mt-8 w-full table-auto">
        <thead className="border-b">
          <tr>
            <th className="pl-8 text-left">支払い日</th>
            <th className="pr-8 text-right">金額</th>
          </tr>
        </thead>
        <tbody>
          {thisMonthData.payments.map((value) => {
            return (
              <tr key={value.atCreated.toString()}>
                <td className="pl-8 text-left">
                  {value.atCreated.toDate().getMonth() + 1}日
                  {value.atCreated.toDate().getDate()}日
                </td>
                <td className="pr-8 text-right">
                  {value.price.toLocaleString()}円
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <form
        onSubmit={onSumitPayment}
        className="sticky bottom-0 flex w-full items-center bg-white px-4 py-2"
      >
        <input
          type="text"
          inputMode="numeric"
          placeholder="支出額を入力してください。"
          value={price.toLocaleString()}
          onChange={onChangeNewPayment}
          className="top-0 h-full w-full flex-1 resize-none overflow-visible rounded-3xl border-2 border-gray px-5 py-3 leading-5"
        />

        <button className={(isReady ? "" : "text-gray") + " pl-3 text-right"}>
          支払追加
        </button>
      </form>
    </>
  );
};

export default Payments;

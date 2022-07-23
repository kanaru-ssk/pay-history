import { useState } from "react";

import type { MonthlyData } from "types/firebase";

import { useAuth } from "hooks/auth";
import { addPayment } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
};

const PaymentsForm = ({ thisMonthData }: Props) => {
  const { authUser } = useAuth();

  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // 支払い追加
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thisMonthData && isReady) {
      addPayment(authUser, thisMonthData.docId, price);
      setPrice(0);
      setIsReady(false);
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
  );
};

export default PaymentsForm;

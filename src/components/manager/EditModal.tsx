import { useEffect, useState } from "react";

import { Timestamp } from "firebase/firestore";

import type { MonthlyData, Payment } from "types/firebase";

import { useAuth } from "hooks/auth";
import { updateMonthlyData } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
  payment: Payment;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const EditModal = ({ thisMonthData, payment, setPayment }: Props) => {
  const { authUser } = useAuth();

  const [date, setDate] = useState<string>("");
  const [firstDate, setFirstDate] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const date = payment.atPaied.toDate();
    setDate(date.toISOString().split("T")[0]);
    setFirstDate(
      new Date(date.getFullYear(), date.getMonth(), 1, 12)
        .toISOString()
        .split("T")[0]
    );
    setLastDate(
      new Date(date.getFullYear(), date.getMonth() + 1, 0, 12)
        .toISOString()
        .split("T")[0]
    );
    setPrice(payment.price);
  }, [payment]);

  // 支払い編集
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      updateMonthlyData(authUser, {
        ...thisMonthData,
        payments: thisMonthData.payments.map((value) => {
          if (value.atCreated === payment.atCreated)
            return {
              ...value,
              price: price,
              atPaied: Timestamp.fromDate(new Date(date)),
            };
          else return value;
        }),
      }).then(() => {
        setPayment(null);
      });
    }
  };

  // 支払い削除
  const onDeletePayment = (e: any) => {
    e.preventDefault();
    updateMonthlyData(authUser, {
      ...thisMonthData,
      payments: thisMonthData.payments.filter((value) => {
        return value.atCreated !== payment.atCreated;
      }),
    });

    setPayment(null);
  };

  // 支払い金額入力
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // 支払い日入力
  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (new Date(e.target.value) !== payment.atPaied.toDate()) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  return (
    <div
      id="overlay"
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center bg-trans-black"
    >
      <div className="w-full px-4">
        <div className="bg-white px-4 pt-2 pb-4">
          <div
            className="ml-auto w-12 cursor-pointer text-center text-2xl"
            onClick={() => {
              setPayment(null);
            }}
          >
            ×
          </div>
          <form onSubmit={onSumitPayment} className="sticky bottom-0 bg-white">
            <div className="flex w-full items-center gap-2 py-2">
              <input
                type="date"
                min={firstDate}
                max={lastDate}
                value={date}
                onChange={onChangeDate}
                className="h-12 w-full flex-1 rounded-lg border-2 border-gray bg-white px-5 py-3 leading-5"
              />

              <input
                type="text"
                inputMode="numeric"
                placeholder="支出額を入力してください。"
                value={price.toLocaleString()}
                onChange={onChangePrice}
                className="h-12 w-full flex-1 rounded-lg border-2 border-gray px-5 py-3 text-right leading-5"
              />
            </div>

            <div className="flex gap-2 pb-2 pt-4 text-center">
              <button
                className="h-12 w-full rounded-3xl bg-red text-center text-white"
                onClick={onDeletePayment}
              >
                削除
              </button>

              <button
                type="submit"
                className={
                  (isReady ? "font-bold text-main-color" : "text-gray") +
                  " h-12 w-full rounded-3xl bg-light-gray text-center"
                }
              >
                支払データ修正
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

import type { MonthlyData, Payment } from "types/firebase";

import { useAuth } from "hooks/auth";
import { updateMonthlyData } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
  payment: Payment | null;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const PaymentsModal = ({ thisMonthData, payment, setPayment }: Props) => {
  const { dbUser } = useAuth();

  const [date, setDate] = useState<string>("");
  const [firstDate, setFirstDate] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (payment) {
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
    }
  }, [payment]);

  // 支払い編集
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady && payment) {
      updateMonthlyData(dbUser, {
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
    if (payment) {
      updateMonthlyData(dbUser, {
        ...thisMonthData,
        payments: thisMonthData.payments.filter((value) => {
          return value.atCreated !== payment.atCreated;
        }),
      });
      setPayment(null);
    }
  };

  const toHalfWidth = (value: string): string => {
    if (!value) return value;

    return String(value).replace(/[！-～]/g, (all: string): string => {
      return String.fromCharCode(all.charCodeAt(0) - 0xfee0);
    });
  };

  // 支払い金額入力
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const half = toHalfWidth(e.target.value);
    const removed = half.replace(/,/g, "");
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
    if (payment && new Date(e.target.value) !== payment.atPaied.toDate()) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  if (!payment) {
    return null;
  } else {
    return (
      <div
        id="overlay"
        className="fixed top-0 left-0 z-20 flex h-full w-full items-center bg-trans-black"
      >
        <div className="w-full px-4">
          <div className="mx-auto max-w-2xl bg-white px-3 pt-2 pb-4">
            <div
              className="my-1 ml-auto w-12 cursor-pointer px-3 text-right"
              onClick={() => {
                setPayment(null);
              }}
            >
              <svg className="inline h-6 w-6" viewBox="0 0 20 20">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </div>
            <form
              onSubmit={onSumitPayment}
              className="sticky bottom-0 bg-white"
            >
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
                  type="button"
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
  }
};

export default PaymentsModal;

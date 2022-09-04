import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

import type { MonthlyData, Payment } from "types/firebase";

import Button from "components/Button";
import Input from "components/Input";
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
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (payment) {
      const date = payment.atPaied.toDate();
      const nowString = new Date(
        Number(date) - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // 今月の月初の日付
      const beginningOfMonth = new Date(date).setDate(1);
      const beginningOfMonthString = new Date(
        beginningOfMonth -
          new Date(beginningOfMonth).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // 今月の月末の日付
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const maxDate = date < endOfMonth ? date : endOfMonth;
      const maxDateString = new Date(
        Number(maxDate) - maxDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setDate(nowString);
      setMinDate(beginningOfMonthString);
      setMaxDate(maxDateString);
      setPrice(payment.price);
    }
  }, [payment]);

  const toHalfWidth = (value: string): string => {
    if (!value) return value;

    return String(value).replace(/[！-～]/g, (all: string): string => {
      return String.fromCharCode(all.charCodeAt(0) - 0xfee0);
    });
  };

  // 支払い金額編集
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

  // 支払い日編集
  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (payment && new Date(e.target.value) !== payment.atPaied.toDate()) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  // 編集確定
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady && payment) {
      setIsLoading(true);
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
        setIsReady(false);
        setIsLoading(false);
      });
    }
  };

  // 支払い削除
  const onDeletePayment = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  if (!payment) {
    return null;
  } else {
    return (
      <div
        id="overlay"
        className="fixed top-0 left-0 z-20 flex h-full w-full items-center bg-trans-black"
      >
        <div className="w-full px-4">
          <div className="mx-auto max-w-2xl bg-white p-4 text-right">
            <button
              className="ml-auto w-12 px-3"
              onClick={() => {
                setPayment(null);
              }}
            >
              <svg viewBox="0 0 20 20">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </button>
            <form onSubmit={onSumitPayment} className="bg-white">
              <div className="flex w-full items-center gap-2 py-2">
                <Input
                  type="date"
                  min={minDate}
                  max={maxDate}
                  value={date}
                  onChange={onChangeDate}
                />

                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="支出額を入力してください。"
                  value={price.toLocaleString()}
                  onChange={onChangePrice}
                  right
                />
              </div>

              <div className="flex gap-2 py-2">
                <Button text="削除" onClick={onDeletePayment} red />

                <Button
                  text="支払データ修正"
                  isReady={isReady}
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default PaymentsModal;

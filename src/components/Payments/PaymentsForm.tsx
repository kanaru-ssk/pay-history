import { useEffect, useState } from "react";

import type { MonthlyData } from "types/firebase";

import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { addPayment, tabToDocId } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
};

const PaymentsForm = ({ thisMonthData }: Props) => {
  const { authUser } = useAuth();
  const { tabStatus } = useTabStatus();

  const [date, setDate] = useState<string>("");
  const [firstDate, setFirstDate] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();

    if (tabStatus === now.getMonth() + 1) {
      const nowString = new Date(Number(now) - now.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

      // 今月の月初の日付
      const beginningOfMonth = new Date().setDate(1);
      const beginningOfMonthString = new Date(
        beginningOfMonth -
          new Date(beginningOfMonth).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setDate(nowString);
      setFirstDate(beginningOfMonthString);
      setLastDate(nowString);
    } else {
      const split = tabToDocId(tabStatus).split("-");
      const toNum = split.map((value) => {
        return Number(value);
      });
      // 今月の月初の日付
      const beginningOfMonth = new Date(toNum[0], toNum[1] - 1, 1);
      const beginningOfMonthString = new Date(
        Number(beginningOfMonth) -
          new Date(beginningOfMonth).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // 今月の月末の日付
      const endOfMonth = new Date(toNum[0], toNum[1], 0);
      const endOfMonthString = new Date(
        Number(endOfMonth) - endOfMonth.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setDate(endOfMonthString);
      setFirstDate(beginningOfMonthString);
      setLastDate(endOfMonthString);
    }
  }, [tabStatus]);

  // 支払い追加
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thisMonthData && isReady) {
      addPayment(authUser, thisMonthData, price, new Date(date));
      setPrice(0);
      setIsReady(false);

      const now = new Date();

      if (tabStatus === now.getMonth() + 1) {
        const nowString = new Date(
          Number(now) - now.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];

        setDate(nowString);
      } else {
        const split = tabToDocId(tabStatus).split("-");
        const toNum = split.map((value) => {
          return Number(value);
        });
        const endOfMonth = new Date(toNum[0], toNum[1], 0);
        const endOfMonthString = new Date(
          Number(endOfMonth) - endOfMonth.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];

        setDate(endOfMonthString);
      }
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
  };

  return (
    <form onSubmit={onSumitPayment} className="bg-white">
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
          value={price.toLocaleString()}
          onChange={onChangePrice}
          className="h-12 w-full flex-1 rounded-lg border-2 border-gray px-5 py-3 text-right leading-5"
        />
      </div>

      <div className="pb-2 text-center">
        <button
          className={
            (isReady ? "font-bold text-main-color" : "text-gray") +
            " h-12 w-full rounded-3xl bg-light-gray text-center"
          }
        >
          支払追加
        </button>
      </div>
    </form>
  );
};

export default PaymentsForm;

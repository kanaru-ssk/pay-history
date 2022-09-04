import { useEffect, useState } from "react";

import type { MonthlyData } from "types/firebase";

import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { addPayment, tabToDocId } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
};

const PaymentsForm = ({ thisMonthData }: Props) => {
  const { dbUser } = useAuth();
  const { tabStatus } = useTabStatus();

  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();

    if (tabStatus === now.getMonth() + 1) {
      const todayString = new Date(
        Number(now) - now.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // 月初の日付
      const beginningOfMonth = new Date().setDate(1);
      const beginningOfMonthString = new Date(
        beginningOfMonth -
          new Date(beginningOfMonth).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setDate(todayString);
      setMinDate(beginningOfMonthString);
      setMaxDate(todayString);
    } else {
      const split = tabToDocId(tabStatus).split("-");
      const toNum = split.map((value) => {
        return Number(value);
      });
      // 月初の日付
      const beginningOfMonth = new Date(toNum[0], toNum[1] - 1, 1);
      const beginningOfMonthString = new Date(
        Number(beginningOfMonth) -
          new Date(beginningOfMonth).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // 月末の日付
      const endOfMonth = new Date(toNum[0], toNum[1], 0);
      const endOfMonthString = new Date(
        Number(endOfMonth) - endOfMonth.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setDate(endOfMonthString);
      setMinDate(beginningOfMonthString);
      setMaxDate(endOfMonthString);
    }
  }, [tabStatus]);

  // 支払い追加
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thisMonthData && isReady) {
      addPayment(dbUser, thisMonthData, price, new Date(date));
      setPrice(0);
      setIsReady(false);

      const now = new Date();

      if (tabStatus === now.getMonth() + 1) {
        const todayString = new Date(
          Number(now) - now.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];

        setDate(todayString);
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
          placeholder="支出額を入力"
          value={price === 0 ? "" : price.toLocaleString()}
          onChange={onChangePrice}
          right
        />
      </div>

      <div className="pb-2 text-center">
        <Button text="支払追加" isReady={isReady} />
      </div>
    </form>
  );
};

export default PaymentsForm;

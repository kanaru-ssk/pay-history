import { useEffect, useState } from "react";

import type { MonthlyData } from "types/firebase";

import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { addPayment, tabToDocId, convertInputMonth } from "libs/monthlyData";

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
      const inputMonthData = convertInputMonth(now);
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
    } else {
      const split = tabToDocId(tabStatus).split("-");
      const toNum = split.map((value) => {
        return Number(value);
      });
      const inputMonthData = convertInputMonth(new Date(toNum[0], toNum[1], 0));
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
    }
  }, [tabStatus]);

  // 支払い金額入力
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toHalfWidth = (value: string): string => {
      if (!value) return value;

      return String(value).replace(/[！-～]/g, (all: string): string => {
        return String.fromCharCode(all.charCodeAt(0) - 0xfee0);
      });
    };

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
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // 支払い追加
  const submitAddPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      await addPayment(dbUser, thisMonthData, price, new Date(date));
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

  return (
    <form onSubmit={submitAddPayment} className="bg-white">
      <div className="flex w-full items-center gap-2 py-2">
        <Input
          type="date"
          min={minDate}
          max={maxDate}
          value={date}
          onChange={changeDate}
        />

        <Input
          type="text"
          inputMode="numeric"
          placeholder="支出額を入力"
          value={price === 0 ? "" : price.toLocaleString()}
          onChange={changePrice}
          right
        />
      </div>

      <div className="pb-2">
        <Button text="支払追加" isReady={isReady} />
      </div>
    </form>
  );
};

export default PaymentsForm;

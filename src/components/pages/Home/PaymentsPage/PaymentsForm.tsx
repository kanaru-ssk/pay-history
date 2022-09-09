import { useEffect, useState } from "react";

import type { MonthlyData } from "types/firebase";

import Button from "components/common/Button";
import Input from "components/common/Input";
import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { tabToDocId, dateToInputData, stringToPrice } from "libs/convert";
import { addPayment } from "libs/monthlyData";

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

  // 日付初期値を設定
  useEffect(() => {
    const now = new Date();
    if (tabStatus === now.getMonth() + 1) {
      const inputMonthData = dateToInputData(now);
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
    } else {
      const split = tabToDocId(tabStatus).split("-");
      const toNum = split.map((value) => {
        return Number(value);
      });
      const inputMonthData = dateToInputData(new Date(toNum[0], toNum[1], 0));
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
    }
  }, [tabStatus]);

  // 支払い金額入力
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = stringToPrice(e.target.value);
    setPrice(price);
    setIsReady(0 < price);
  };

  // 支払い日入力
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // 支払い追加
  const submitAddPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsReady(false);
      await addPayment(dbUser, thisMonthData, price, new Date(date));
      setPrice(0);
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

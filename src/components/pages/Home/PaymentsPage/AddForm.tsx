import { useEffect, useState } from "react";
import Input from "@/components/atoms/Input";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import { useTabStatus } from "@/hooks/tabStatus";
import { tabToDocId, dateToInputData, stringToPrice } from "@/libs/convert";
import { addPayment } from "@/libs/monthlyData";
import type { MonthlyData } from "@/types/firebase";

type Props = {
  thisMonthData: MonthlyData;
};

const AddForm = ({ thisMonthData }: Props) => {
  const { dbUser } = useAuth();
  const { text } = useLocale();
  const { tabStatus } = useTabStatus();

  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // set initial date
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

  // enter payment amount
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = stringToPrice(e.target.value);
    setPrice(price);
    setIsReady(0 < price);
  };

  // enter payment date
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // add payment
  const submitAddPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsReady(false);
      await addPayment(dbUser, thisMonthData, price, new Date(date));
      setPrice(0);
    }
  };

  return (
    <form onSubmit={submitAddPayment}>
      <div className="flex w-full items-center gap-2 py-2">
        <Input
          name="date"
          type="date"
          min={minDate}
          max={maxDate}
          value={date}
          onChange={changeDate}
          small
        />
        <Input
          name="amount"
          type="text"
          inputMode="numeric"
          placeholder={text.ENTER_AMOUNT}
          value={price === 0 ? "" : price.toLocaleString()}
          onChange={changePrice}
          right
          small
        />
        <button
          name="add"
          type="submit"
          className={isReady ? "font-semibold text-black" : "text-gray-400"}
        >
          {text.ADD}
        </button>
      </div>
    </form>
  );
};

export default AddForm;

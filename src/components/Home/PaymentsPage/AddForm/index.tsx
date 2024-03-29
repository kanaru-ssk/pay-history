import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input/Input";
import { useAuth } from "@/hooks/useAuth";
import { useDocId } from "@/hooks/useDocId";
import { useLocale } from "@/hooks/useLocale";
import { dateToInputData, stringToPrice } from "@/libs/convert";
import { addPayment, createMonthlyData, createPayment } from "@/libs/firebase";
import type { MonthlyData } from "@/types/firebase";

type Props = {
  thisMonthData: MonthlyData | null;
};

export function AddForm({ thisMonthData }: Props) {
  const { dbUser } = useAuth();
  const { docId } = useDocId();
  const { text } = useLocale();
  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // set initial date
  useEffect(() => {
    const now = new Date();
    const docDate = new Date(docId);
    if (docDate.getMonth() === now.getMonth()) {
      const inputMonthData = dateToInputData(now);
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
    } else {
      const inputMonthData = dateToInputData(docDate);
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
    }
  }, [docId]);

  // enter payment amount
  function changePrice(e: ChangeEvent<HTMLInputElement>) {
    const price = stringToPrice(e.target.value);
    setPrice(price);
    setIsReady(0 < price);
  }

  // enter payment date
  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  // add payment
  async function submitAddPayment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isReady) {
      if (thisMonthData === null) {
        setIsReady(false);
        const newPayment = createPayment({ price, date: new Date(date) });
        await createMonthlyData({
          user: dbUser,
          docId,
          payments: [newPayment],
        });
        setPrice(0);
      } else {
        setIsReady(false);
        await addPayment(dbUser, thisMonthData, price, new Date(date));
        setPrice(0);
      }
    }
  }

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
          aria-label="spent date"
        />
        <Input
          name="amount"
          type="text"
          inputMode="numeric"
          placeholder={text.ENTER_AMOUNT}
          value={price === 0 ? "" : price.toLocaleString()}
          onChange={changePrice}
          right
          aria-label="spent amount"
        />
        <button
          name="add"
          type="submit"
          className={
            isReady
              ? "font-semibold text-black dark:text-white"
              : "text-gray-600"
          }
          aria-disabled={!isReady}
        >
          {text.ADD}
        </button>
      </div>
    </form>
  );
}

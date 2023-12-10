import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { ButtonWithStatus } from "@/components/ui/button/ButtonWithStatus";
import { Input } from "@/components/ui/input/Input";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { useModal } from "@/hooks/useModal";
import { dateToInputData, stringToPrice } from "@/libs/convert";
import { updateMonthlyData } from "@/libs/firebase";
import { type MonthlyData, type Payment } from "@/types/firebase";

type Props = {
  thisMonthData: MonthlyData;
  payment: Payment | null;
};

export function PaymentEditForm({ thisMonthData, payment }: Props) {
  const { dbUser } = useAuth();
  const { text } = useLocale();
  const { setModalContents } = useModal();
  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  // load the payment data
  useEffect(() => {
    if (payment) {
      const inputMonthData = dateToInputData(payment.atPaid.toDate());
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
      setPrice(payment.price);
    }
  }, [payment]);

  // edit payment amount
  function changePrice(e: ChangeEvent<HTMLInputElement>) {
    const price = stringToPrice(e.target.value);
    setPrice(price);
    setIsReady(0 < price && price !== payment?.price);
  }

  // edit payment date
  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
    if (payment && new Date(e.target.value) !== payment.atPaid.toDate()) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }

  // save edit
  async function submitSavePayment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isReady && payment) {
      setIsReady(false);
      setIsUpdateLoading(true);
      const { Timestamp } = await import("firebase/firestore");
      await updateMonthlyData(dbUser, {
        ...thisMonthData,
        payments: thisMonthData.payments.map((value) => {
          if (value.atCreated === payment.atCreated)
            return {
              ...value,
              price: price,
              atPaid: Timestamp.fromDate(new Date(date)),
            };
          else return value;
        }),
      });
      setIsUpdateLoading(false);
    }
    setModalContents(null);
  }

  // delete payment
  async function deletePayment(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (payment) {
      setIsDeleteLoading(true);
      await updateMonthlyData(dbUser, {
        ...thisMonthData,
        payments: thisMonthData.payments.filter((value) => {
          return value.atCreated !== payment.atCreated;
        }),
      });
      setIsDeleteLoading(false);
      setModalContents(null);
    }
  }

  return (
    <form onSubmit={submitSavePayment} className="bg-white dark:bg-gray-950">
      <div className="flex w-full items-center gap-2 py-2">
        <Input
          type="date"
          min={minDate}
          max={maxDate}
          value={date}
          onChange={changeDate}
          aria-label="spent date"
        />

        <Input
          name="edit"
          type="text"
          inputMode="numeric"
          placeholder={text.ENTER_AMOUNT}
          value={price.toLocaleString()}
          onChange={changePrice}
          right
          aria-label="spent amount"
        />
      </div>

      <div className="flex gap-2 py-2">
        <ButtonWithStatus
          name="delete"
          type="button"
          onClick={deletePayment}
          isLoading={isDeleteLoading}
          color="red"
        >
          {text.DELETE}
        </ButtonWithStatus>

        <ButtonWithStatus
          name="edit"
          type="submit"
          isReady={isReady}
          isLoading={isUpdateLoading}
        >
          {text.FIX_PAYMENT}
        </ButtonWithStatus>
      </div>
    </form>
  );
}

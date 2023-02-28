import { useEffect, useState } from "react";

import type { MonthlyData, Payment } from "types/firebase";

import Button from "components/common/Button";
import Input from "components/common/Input";
import CloseIcon from "components/common/icons/CloseIcon";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { dateToInputData, stringToPrice } from "libs/convert";
import { updateMonthlyData } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
  payment: Payment | null;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const PaymentsModal = ({ thisMonthData, payment, setPayment }: Props) => {
  const { dbUser } = useAuth();
  const { text } = useLocale();

  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  // click out of the modal to close
  useEffect(() => {
    const onClickOverlay = (e: any) => {
      if (e.target.id === "modal-overlay") setPayment(null);
    };
    addEventListener("click", onClickOverlay, { passive: false });
    return () => {
      removeEventListener("click", onClickOverlay);
    };
  }, [setPayment]);

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
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = stringToPrice(e.target.value);
    setPrice(price);
    setIsReady(0 < price && price !== payment?.price);
  };

  // edit payment date
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (payment && new Date(e.target.value) !== payment.atPaid.toDate()) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  // save edit
  const submitSavePayment = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setPayment(null);
    }
  };

  // delete payment
  const deletePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      setPayment(null);
    }
  };

  if (!payment) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center bg-trans-black"
    >
      <div className="w-full px-4">
        <div className="mx-auto max-w-2xl bg-white p-4 text-right">
          <button
            className="ml-auto w-10 px-3"
            onClick={() => {
              setPayment(null);
            }}
          >
            <CloseIcon />
          </button>
          <form onSubmit={submitSavePayment} className="bg-white">
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
                placeholder={text.ENTER_AMOUNT}
                value={price.toLocaleString()}
                onChange={changePrice}
                right
              />
            </div>

            <div className="flex gap-2 py-2">
              <Button
                type="button"
                text={text.DELETE}
                onClick={deletePayment}
                isLoading={isDeleteLoading}
                red
              />

              <Button
                type="submit"
                text={text.FIX_AMOUNT}
                isReady={isReady}
                isLoading={isUpdateLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentsModal;

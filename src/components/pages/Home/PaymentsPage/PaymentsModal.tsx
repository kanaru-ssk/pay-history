import { useEffect, useState } from "react";

import type { MonthlyData, Payment } from "types/firebase";

import Button from "components/common/Button";
import Input from "components/common/Input";
import { colors } from "constants/colors";
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
      const inputMonthData = dateToInputData(payment.atPaied.toDate());
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
    if (payment && new Date(e.target.value) !== payment.atPaied.toDate()) {
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
              atPaied: Timestamp.fromDate(new Date(date)),
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
            <svg width="15" height="16">
              <path
                d="M8.64394 7.64062L14.7963 0.307031C14.8994 0.185156 14.8127 0 14.6533 0H12.783C12.6728 0 12.5674 0.0492187 12.4947 0.133594L7.4205 6.18281L2.34628 0.133594C2.27597 0.0492187 2.1705 0 2.058 0H0.187688C0.0283129 0 -0.058406 0.185156 0.044719 0.307031L6.19706 7.64062L0.044719 14.9742C0.021618 15.0014 0.0067979 15.0346 0.0020175 15.0699C-0.00276289 15.1053 0.00269726 15.1413 0.0177503 15.1736C0.0328033 15.2059 0.0568169 15.2332 0.0869395 15.2523C0.117062 15.2714 0.152029 15.2814 0.187688 15.2812H2.058C2.16816 15.2812 2.27363 15.232 2.34628 15.1477L7.4205 9.09844L12.4947 15.1477C12.565 15.232 12.6705 15.2812 12.783 15.2812H14.6533C14.8127 15.2812 14.8994 15.0961 14.7963 14.9742L8.64394 7.64062Z"
                fill={colors.DARK_GRAY}
              />
            </svg>
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

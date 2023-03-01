import { useEffect, useState } from "react";

import type { MonthlyData, Payment } from "types/firebase";

import ButtonWithStatus from "components/common/ButtonWithStatus";
import Modal from "components/common/Modal";
import Input from "components/common/atoms/Input";
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

  return (
    <Modal
      isShown={!!payment}
      onHide={() => {
        setPayment(null);
      }}
    >
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
          <ButtonWithStatus
            type="button"
            onClick={deletePayment}
            isLoading={isDeleteLoading}
            color="red"
          >
            {text.DELETE}
          </ButtonWithStatus>

          <ButtonWithStatus
            type="submit"
            isReady={isReady}
            isLoading={isUpdateLoading}
          >
            {text.FIX_AMOUNT}
          </ButtonWithStatus>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentsModal;

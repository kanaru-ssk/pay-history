import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

import type { MonthlyData, Payment } from "types/firebase";

import Button from "components/common/Button";
import Input from "components/common/Input";
import { useAuth } from "hooks/auth";
import { dateToInputData, stringToPrice } from "libs/convert";
import { updateMonthlyData } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
  payment: Payment | null;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const PaymentsModal = ({ thisMonthData, payment, setPayment }: Props) => {
  const { dbUser } = useAuth();

  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  // モーダル外をクリックで閉じる
  useEffect(() => {
    const onClickOverlay = (e: any) => {
      if (e.target.id === "modal-overlay") setPayment(null);
    };
    addEventListener("click", onClickOverlay, { passive: false });
    return () => {
      removeEventListener("click", onClickOverlay);
    };
  }, [setPayment]);

  // 支払いデータ読み込み
  useEffect(() => {
    if (payment) {
      const inputMonthData = dateToInputData(payment.atPaied.toDate());
      setDate(inputMonthData.value);
      setMinDate(inputMonthData.min);
      setMaxDate(inputMonthData.max);
      setPrice(payment.price);
    }
  }, [payment]);

  // 支払い金額編集
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = stringToPrice(e.target.value);
    setPrice(price);
    setIsReady(0 < price && price !== payment?.price);
  };

  // 支払い日編集
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (payment && new Date(e.target.value) !== payment.atPaied.toDate()) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  // 編集保存
  const sumitSavePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady && payment) {
      setIsReady(false);
      setIsUpdateLoading(true);
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

  // 支払い削除
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
            className="ml-auto w-12 px-3"
            onClick={() => {
              setPayment(null);
            }}
          >
            <svg viewBox="0 0 20 20">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
          <form onSubmit={sumitSavePayment} className="bg-white">
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
                placeholder="支出額を入力してください。"
                value={price.toLocaleString()}
                onChange={changePrice}
                right
              />
            </div>

            <div className="flex gap-2 py-2">
              <Button
                type="button"
                text="削除"
                onClick={deletePayment}
                isLoading={isDeleteLoading}
                red
              />

              <Button
                type="submit"
                text="支払データ修正"
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

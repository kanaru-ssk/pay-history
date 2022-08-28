import { useState, useEffect } from "react";

import type { MonthlyData, Payment } from "types/firebase";

import PaymentsForm from "components/PaymentsForm";
import PaymentsModal from "components/PaymentsModal";
import PaymentsTable from "components/PaymentsTable";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isSortDate, setIsSortDate] = useState<boolean>(true);
  const [isAcsDate, setIsAcsDate] = useState<boolean>(true);
  const [isAcsPrice, setIsAcsPrice] = useState<boolean>(true);

  // 支出日ソート
  const sortDate = (a: Payment, b: Payment): number => {
    if (isAcsDate) {
      if (b.atPaied < a.atPaied) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.atPaied < b.atPaied) {
        return 1;
      } else {
        return -1;
      }
    }
  };

  // 金額ソート
  const sortPrice = (a: Payment, b: Payment): number => {
    if (isAcsPrice) {
      if (b.price < a.price) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.price < b.price) {
        return 1;
      } else {
        return -1;
      }
    }
  };

  // モーダルを開く
  const onClickHundler = (_payment: Payment) => {
    setPayment(_payment);
  };

  // モーダル外をクリックで閉じる
  const onClickOverlay = (e: any) => {
    if (e.target.id === "overlay") {
      setPayment(null);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOverlay, { passive: false });
    return () => {
      window.removeEventListener("click", onClickOverlay);
    };
  });

  return (
    <>
      <PaymentsModal
        thisMonthData={thisMonthData}
        payment={payment}
        setPayment={setPayment}
      />

      <div className="mt-8">
        <PaymentsTable
          thisMonthData={thisMonthData}
          isSortDate={isSortDate}
          isAcsDate={isAcsDate}
          isAcsPrice={isAcsPrice}
          setIsSortDate={setIsSortDate}
          setIsAcsDate={setIsAcsDate}
          setIsAcsPrice={setIsAcsPrice}
          setPayment={setPayment}
        />
      </div>

      <PaymentsForm thisMonthData={thisMonthData} />
    </>
  );
};

export default Payments;

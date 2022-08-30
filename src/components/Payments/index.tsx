import { useState, useEffect } from "react";

import Budget from "./Budget";
import PaymentsForm from "./PaymentsForm";
import PaymentsModal from "./PaymentsModal";
import PaymentsTable from "./PaymentsTable";

import type { MonthlyData, Payment } from "types/firebase";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isSortDate, setIsSortDate] = useState<boolean>(true);
  const [isAcsDate, setIsAcsDate] = useState<boolean>(true);
  const [isAcsPrice, setIsAcsPrice] = useState<boolean>(true);

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
      <div className="my-8">
        <Budget thisMonthData={thisMonthData} />
      </div>

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

      <div className="sticky bottom-0">
        <PaymentsForm thisMonthData={thisMonthData} />
      </div>

      <PaymentsModal
        thisMonthData={thisMonthData}
        payment={payment}
        setPayment={setPayment}
      />
    </>
  );
};

export default Payments;

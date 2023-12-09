import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { type MonthlyData, type Payment } from "@/types/firebase";
import { PaymentEditForm } from "./PaymentEditForm";

type Props = {
  thisMonthData: MonthlyData;
  payment: Payment;
};

export function TableItem({ thisMonthData, payment }: Props) {
  const { setModalContents } = useModal();
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(false);
    }, 100);
  }, []);

  const startEditPayment = () => {
    setModalContents(
      <PaymentEditForm thisMonthData={thisMonthData} payment={payment} />,
    );
  };

  return (
    <div
      onClick={() => startEditPayment()}
      className={`${
        isActive ? "bg-opacity-1" : "bg-opacity-0"
      } flex h-12 cursor-pointer items-center justify-between bg-gray-500 px-4 duration-500 sm:hover:bg-gray-100`}
    >
      <div>
        {`${String(payment.atPaid.toDate().getMonth() + 1).padStart(
          2,
          "0",
        )}/${String(payment.atPaid.toDate().getDate()).padStart(2, "0")}`}
      </div>
      <div>{`¥ ${payment.price.toLocaleString()}`}</div>
    </div>
  );
}

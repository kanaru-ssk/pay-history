import { useEffect, useState } from "react";
import { PaymentEditForm } from "./PaymentEditForm";
import { useModal } from "@/hooks/useModal";
import { type MonthlyData, type Payment } from "@/types/firebase";

type Props = {
  thisMonthData: MonthlyData;
  payment: Payment;
};

export const TableItem = ({ thisMonthData, payment }: Props) => {
  const { setModalContents } = useModal();
  const [bgColor, setBgColor] = useState<"bg-white" | "bg-gray-400">(
    "bg-gray-400"
  );

  useEffect(() => {
    setTimeout(() => {
      setBgColor("bg-white");
    }, 100);
  }, []);

  const startEditPayment = () => {
    setModalContents(
      <PaymentEditForm thisMonthData={thisMonthData} payment={payment} />
    );
  };

  return (
    <div
      onClick={() => startEditPayment()}
      className={`${bgColor} flex h-12 cursor-pointer items-center justify-between px-4 duration-500 hover:bg-gray-100`}
    >
      <div>
        {`${String(payment.atPaid.toDate().getMonth() + 1).padStart(
          2,
          "0"
        )}/${String(payment.atPaid.toDate().getDate()).padStart(2, "0")}`}
      </div>
      <div>{`¥ ${payment.price.toLocaleString()}`}</div>
    </div>
  );
};

import { useEffect, useState } from "react";
import type { Payment } from "types/firebase";

type Props = {
  payment: Payment;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const TableItem = ({ payment, setPayment }: Props) => {
  const [bgColor, setBgColor] = useState<"bg-white" | "bg-gray-400">(
    "bg-gray-400"
  );

  useEffect(() => {
    setTimeout(() => {
      setBgColor("bg-white");
    }, 100);
  }, []);

  return (
    <div
      onClick={() => setPayment(payment)}
      className={`${bgColor} flex h-12 cursor-pointer items-center px-4 duration-500 hover:bg-gray-200`}
    >
      <div className="flex-1 text-left">
        {String(payment.atPaid.toDate().getMonth() + 1).padStart(2, "0")}/
        {String(payment.atPaid.toDate().getDate()).padStart(2, "0")}
      </div>
      <div className="flex-1 text-right">
        ¥ {payment.price.toLocaleString()}
      </div>
    </div>
  );
};
export default TableItem;

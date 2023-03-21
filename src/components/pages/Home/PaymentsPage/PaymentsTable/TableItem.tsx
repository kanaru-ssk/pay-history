import { useEffect, useState } from "react";
import MoreIcon from "components/atoms/icons/MoreIcon";
import type { Payment } from "types/firebase";

type Props = {
  payment: Payment;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const TableItem = ({ payment, setPayment }: Props) => {
  const [bgColor, setBgColor] = useState<"bg-white" | "bg-sub-color">(
    "bg-sub-color"
  );

  useEffect(() => {
    setTimeout(() => {
      setBgColor("bg-white");
    }, 100);
  }, []);

  return (
    <div
      key={payment.atCreated.toString()}
      className={bgColor + " flex h-9 items-center  duration-1000"}
    >
      <div className="flex-1 pl-4 text-left">
        {String(payment.atPaid.toDate().getMonth() + 1).padStart(2, "0")}/
        {String(payment.atPaid.toDate().getDate()).padStart(2, "0")}
      </div>
      <div className="flex-1 pr-4 text-right">
        {payment.price.toLocaleString()}
      </div>
      <button
        onClick={() => setPayment(payment)}
        className="w-8"
        name="edit-menu"
      >
        <MoreIcon />
      </button>
    </div>
  );
};
export default TableItem;

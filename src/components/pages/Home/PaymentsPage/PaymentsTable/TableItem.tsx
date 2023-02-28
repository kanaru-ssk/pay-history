import { useEffect, useState } from "react";

import type { Payment } from "types/firebase";

import MoreIcon from "components/common/icons/MoreIcon";

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
      <div
        onClick={() => setPayment(payment)}
        className="w-8 cursor-pointer p-2 text-sm text-center"
      >
        <MoreIcon />
      </div>
    </div>
  );
};
export default TableItem;

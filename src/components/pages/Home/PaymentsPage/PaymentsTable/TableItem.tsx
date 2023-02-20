import { useEffect, useState } from "react";

import type { Payment } from "types/firebase";

import { useLocale } from "hooks/locale";
import { displayMonth, displayDate } from "libs/displayMonth";

type Props = {
  payment: Payment;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const TableItem = ({ payment, setPayment }: Props) => {
  const { locale, text } = useLocale();
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
        {displayMonth(payment.atPaied.toDate().getMonth() + 1, locale)}
        {displayDate(payment.atPaied.toDate().getDate(), locale)}
      </div>
      <div className="flex-1 pr-4 text-right">
        {payment.price.toLocaleString()}
        {text.YEN}
      </div>
      <div
        onClick={() => setPayment(payment)}
        className="w-8 cursor-pointer p-2 text-sm"
      >
        ︙
      </div>
    </div>
  );
};
export default TableItem;

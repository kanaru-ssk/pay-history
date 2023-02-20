import { useState, useEffect, useRef } from "react";

import TableItem from "./TableItem";

import type { MonthlyData, Payment } from "types/firebase";

import { useLocale } from "hooks/locale";

type Props = {
  thisMonthData: MonthlyData;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const PaymentsTable = ({ thisMonthData, setPayment }: Props) => {
  const { text } = useLocale();
  const [isSortDate, setIsSortDate] = useState<boolean>(true);
  const [isAcsDate, setIsAcsDate] = useState<boolean>(false);
  const [isAcsPrice, setIsAcsPrice] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0 });
    }
  }, [ref, thisMonthData.payments]);

  // sort by payment date
  const sortDate = (a: Payment, b: Payment): number => {
    if (isAcsDate) {
      if (b.atPaied.isEqual(a.atPaied)) {
        if (b.atCreated < a.atCreated) {
          return 1;
        } else {
          return -1;
        }
      } else if (b.atPaied < a.atPaied) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (b.atPaied.isEqual(a.atPaied)) {
        if (a.atCreated < b.atCreated) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.atPaied < b.atPaied) {
        return 1;
      } else {
        return -1;
      }
    }
  };

  // sort by payment amount
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

  return (
    <div>
      <div className="flex border-b border-black px-4">
        <div
          onClick={() => {
            setIsSortDate(true);
            setIsAcsDate(!isAcsDate);
          }}
          className="w-full cursor-pointer"
        >
          {text.SPENT_DATE}
          {isSortDate && (isAcsDate ? "▲" : "▼")}
        </div>
        <div
          onClick={() => {
            setIsSortDate(false);
            setIsAcsPrice(!isAcsPrice);
          }}
          className="w-full cursor-pointer pr-8 text-right"
        >
          {!isSortDate && (isAcsPrice ? "▲" : "▼")}
          {text.AMOUNT}
        </div>
      </div>

      {0 < thisMonthData.payments.length && (
        <div
          className="flex max-h-[calc(100vh_-_276px)] w-full flex-col-reverse overflow-y-scroll md:max-h-[calc(100vh_-_308px)]"
          ref={ref}
        >
          {thisMonthData.payments
            .sort(isSortDate ? sortPrice : sortDate)
            .sort(isSortDate ? sortDate : sortPrice)
            .map((value) => {
              return (
                <TableItem
                  payment={value}
                  setPayment={setPayment}
                  key={value.atCreated.toString()}
                />
              );
            })}
        </div>
      )}
      {thisMonthData.payments && thisMonthData.payments.length === 0 && (
        <div className="py-4 text-center text-gray">{text.NO_PAYMENT_DATA}</div>
      )}
    </div>
  );
};

export default PaymentsTable;

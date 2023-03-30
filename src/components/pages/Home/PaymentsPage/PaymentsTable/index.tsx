import { useState, useEffect, useRef } from "react";
import SortIcon from "components/atoms/icons/SortIcon";
import { useLocale } from "hooks/locale";
import type { MonthlyData, Payment } from "types/firebase";
import TableItem from "./TableItem";

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
      if (b.atPaid.isEqual(a.atPaid)) {
        if (b.atCreated < a.atCreated) {
          return 1;
        } else {
          return -1;
        }
      } else if (b.atPaid < a.atPaid) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (b.atPaid.isEqual(a.atPaid)) {
        if (a.atCreated < b.atCreated) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.atPaid < b.atPaid) {
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
      <div className="flex border-b border-gray-400 px-4 pr-12">
        <button
          onClick={() => {
            setIsSortDate(true);
            setIsAcsDate(!isAcsDate);
          }}
          className="flex w-full items-center gap-2"
        >
          <span>{text.SPENT_DATE}</span>
          <SortIcon isAcs={isAcsDate} disable={!isSortDate} />
        </button>
        <button
          onClick={() => {
            setIsSortDate(false);
            setIsAcsPrice(!isAcsPrice);
          }}
          className="flex w-full items-center justify-end gap-2"
        >
          <span>{text.AMOUNT}</span>
          <SortIcon isAcs={isAcsPrice} disable={isSortDate} />
        </button>
      </div>

      <div
        className="flex w-full flex-col-reverse overflow-y-scroll"
        ref={ref}
        data-cy="payments-table"
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
      {thisMonthData.payments && thisMonthData.payments.length === 0 && (
        <div className="py-4 text-center text-gray-400">
          {text.NO_PAYMENT_DATA}
        </div>
      )}
    </div>
  );
};

export default PaymentsTable;

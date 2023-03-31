import { useState, useEffect, useRef } from "react";
import { useLocale } from "hooks/locale";
import type { MonthlyData, Payment } from "types/firebase";
import SortBar from "./SortBar";
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
      <SortBar
        isSortDate={isSortDate}
        isAcsDate={isAcsDate}
        isAcsPrice={isAcsPrice}
        onClickSortDate={() => {
          setIsSortDate(true);
          setIsAcsDate(!isAcsDate);
        }}
        onClickSortPrice={() => {
          setIsSortDate(false);
          setIsAcsPrice(!isAcsPrice);
        }}
      />

      <div className="flex flex-col-reverse" ref={ref} data-cy="payments-table">
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
        {thisMonthData.payments && thisMonthData.payments.length === 0 && (
          <div className="py-4 text-center text-gray-400">
            {text.NO_PAYMENT_DATA}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsTable;

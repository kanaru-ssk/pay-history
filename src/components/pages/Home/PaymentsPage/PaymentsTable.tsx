import { useState } from "react";

import type { MonthlyData, Payment } from "types/firebase";

type Props = {
  thisMonthData: MonthlyData;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
};

const PaymentsTable = ({ thisMonthData, setPayment }: Props) => {
  const [isSortDate, setIsSortDate] = useState<boolean>(true);
  const [isAcsDate, setIsAcsDate] = useState<boolean>(false);
  const [isAcsPrice, setIsAcsPrice] = useState<boolean>(true);

  // 支出日ソート
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

  // 金額ソート
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

  // モーダルを開く
  const openModal = (payment: Payment) => {
    setPayment(payment);
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
          支出日{isSortDate && (isAcsDate ? "▼" : "▲")}
        </div>
        <div
          onClick={() => {
            setIsSortDate(false);
            setIsAcsPrice(!isAcsPrice);
          }}
          className="w-full cursor-pointer pr-8 text-right"
        >
          {!isSortDate && (isAcsPrice ? "▲" : "▼")}金額
        </div>
      </div>

      {0 < thisMonthData.payments.length && (
        <div className="flex max-h-[calc(100vh_-_276px)] w-full flex-col-reverse overflow-y-scroll md:max-h-[calc(100vh_-_308px)]">
          {thisMonthData.payments
            .sort(isSortDate ? sortPrice : sortDate)
            .sort(isSortDate ? sortDate : sortPrice)
            .map((value) => {
              return (
                <div
                  key={value.atCreated.toString()}
                  className="flex h-9 items-center"
                >
                  <div className="flex-1 pl-4 text-left">
                    {value.atPaied.toDate().getMonth() + 1}月
                    {value.atPaied.toDate().getDate()}日
                  </div>
                  <div className="flex-1 pr-4 text-right">
                    {value.price.toLocaleString()}円
                  </div>
                  <div
                    onClick={() => openModal(value)}
                    className="w-8 cursor-pointer p-2 text-sm"
                  >
                    ︙
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {thisMonthData.payments && thisMonthData.payments.length === 0 && (
        <div className="py-4 text-center text-gray">
          支払いデータがありません。
        </div>
      )}
    </div>
  );
};

export default PaymentsTable;

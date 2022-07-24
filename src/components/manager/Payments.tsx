import { useState, useEffect } from "react";

import EditModal from "./EditModal";

import type { MonthlyData, Payment } from "types/firebase";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isSortDate, setIsSortDate] = useState<boolean>(false);
  const [isAcsDate, setIsAcsDate] = useState<boolean>(false);
  const [isAcsPrice, setIsAcsPrice] = useState<boolean>(false);

  // 支出日ソート
  const sortDate = (a: Payment, b: Payment): number => {
    if (isAcsDate) {
      if (b.atPaied < a.atPaied) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.atPaied < b.atPaied) {
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
  const onClickHundler = (_payment: Payment) => {
    setPayment(_payment);
  };

  // モーダル外をクリックで閉じる
  const onClickOverlay = (e: any) => {
    if (e.target.id === "overlay") {
      setPayment(null);
    }
  };
  useEffect(() => {
    window.addEventListener("click", onClickOverlay, { passive: false });
    return () => {
      window.removeEventListener("click", onClickOverlay);
    };
  });

  return (
    <>
      {payment && (
        <EditModal
          thisMonthData={thisMonthData}
          payment={payment}
          setPayment={setPayment}
        />
      )}

      <table className="mx-auto mt-8 w-full table-auto">
        <thead className="border-b">
          <tr>
            <th
              onClick={() => {
                setIsSortDate(true);
                setIsAcsDate(!isAcsDate);
              }}
              className="cursor-pointer pl-4 text-left"
            >
              支出日{isSortDate && (isAcsDate ? "▲" : "▼")}
            </th>
            <th
              onClick={() => {
                setIsSortDate(false);
                setIsAcsPrice(!isAcsPrice);
              }}
              className="cursor-pointer pr-4 text-right"
            >
              {!isSortDate && (isAcsPrice ? "▲" : "▼")}金額
            </th>
          </tr>
        </thead>
        <tbody>
          {thisMonthData.payments &&
            thisMonthData.payments
              .sort(isSortDate ? sortPrice : sortDate)
              .sort(isSortDate ? sortDate : sortPrice)
              .map((value) => {
                return (
                  <tr key={value.atCreated.toString()} className="h-9">
                    <td className="pl-4 text-left">
                      {value.atPaied.toDate().getMonth() + 1}日
                      {value.atPaied.toDate().getDate()}日
                    </td>
                    <td className="pr-4 text-right">
                      {value.price.toLocaleString()}円
                    </td>
                    <td
                      onClick={() => onClickHundler(value)}
                      className="w-4 cursor-pointer text-sm"
                    >
                      ︙
                    </td>
                  </tr>
                );
              })}
          {thisMonthData.payments && thisMonthData.payments.length === 0 && (
            <tr>
              <td className="h-12 text-center text-gray">
                支払いデータがありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Payments;

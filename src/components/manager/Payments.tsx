import { useState } from "react";

import EditModal from "./EditModal";

import type { MonthlyData, Payment } from "types/firebase";

import { useAuth } from "hooks/auth";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  const { authUser } = useAuth();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClickHundler = (_payment: Payment) => {
    setPayment(_payment);
  };

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
            <th className="pl-4 text-left">支出日</th>
            <th className="pr-4 text-right">金額</th>
          </tr>
        </thead>
        <tbody>
          {thisMonthData.payments &&
            thisMonthData.payments.map((value) => {
              return (
                <tr key={value.atCreated.toString()}>
                  <td className="pl-4 text-left">
                    {value.atPaied.toDate().getMonth() + 1}日
                    {value.atPaied.toDate().getDate()}日
                  </td>
                  <td className="pr-4 text-right">
                    {value.price.toLocaleString()}円
                  </td>
                  <td
                    onClick={() => onClickHundler(value)}
                    className="w-4 cursor-pointer"
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

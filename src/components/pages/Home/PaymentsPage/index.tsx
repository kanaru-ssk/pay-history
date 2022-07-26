import { useState } from "react";

import Budget from "./Budget";
import PaymentsForm from "./PaymentsForm";
import PaymentsModal from "./PaymentsModal";
import PaymentsTable from "./PaymentsTable";

import type { MonthlyData, Payment } from "types/firebase";

type Props = {
  thisMonthData: MonthlyData;
};

const PaymentsPage = ({ thisMonthData }: Props) => {
  const [payment, setPayment] = useState<Payment | null>(null);

  return (
    <>
      <div className="my-4">
        <Budget thisMonthData={thisMonthData} />
      </div>

      <PaymentsTable thisMonthData={thisMonthData} setPayment={setPayment} />

      <div className="sticky bottom-0">
        <PaymentsForm thisMonthData={thisMonthData} />
      </div>

      <PaymentsModal
        thisMonthData={thisMonthData}
        payment={payment}
        setPayment={setPayment}
      />
    </>
  );
};

export default PaymentsPage;

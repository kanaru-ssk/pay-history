import { useState } from "react";
import type { MonthlyData, Payment } from "types/firebase";
import Budget from "./Budget";
import PaymentsForm from "./PaymentsForm";
import PaymentsModal from "./PaymentsModal";
import PaymentsTable from "./PaymentsTable";

type Props = {
  thisMonthData: MonthlyData;
};

const PaymentsPage = ({ thisMonthData }: Props) => {
  const [payment, setPayment] = useState<Payment | null>(null);

  return (
    <>
      <div className="sticky top-12 bg-white">
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

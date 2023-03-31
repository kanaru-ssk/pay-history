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
      <div className="pb-16">
        <div className="sticky top-12 bg-white">
          <Budget thisMonthData={thisMonthData} />
        </div>
        <PaymentsTable thisMonthData={thisMonthData} setPayment={setPayment} />
        <div className="fixed bottom-0 left-0 w-full bg-white px-4 drop-shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
          <PaymentsForm thisMonthData={thisMonthData} />
        </div>
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

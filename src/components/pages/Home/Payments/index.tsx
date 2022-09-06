import { useState } from "react";

import Budget from "./Budget";
import PaymentsForm from "./PaymentsForm";
import PaymentsModal from "./PaymentsModal";
import PaymentsTable from "./PaymentsTable";

import type { MonthlyData, Payment } from "types/firebase";

import Header from "components/common/Header";
import Tab from "components/common/Tab";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  const [payment, setPayment] = useState<Payment | null>(null);

  return (
    <>
      <Header />
      <Tab />
      <main>
        <div className="my-8">
          <Budget thisMonthData={thisMonthData} />
        </div>

        <div className="mt-8">
          <PaymentsTable
            thisMonthData={thisMonthData}
            setPayment={setPayment}
          />
        </div>

        <div className="sticky bottom-0">
          <PaymentsForm thisMonthData={thisMonthData} />
        </div>

        <PaymentsModal
          thisMonthData={thisMonthData}
          payment={payment}
          setPayment={setPayment}
        />
      </main>
    </>
  );
};

export default Payments;

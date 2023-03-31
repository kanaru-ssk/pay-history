import { useState } from "react";
import type { MonthlyData, Payment } from "types/firebase";
import PaymentsModal from "./PaymentsModal";
import PaymentsTable from "./PaymentsTable";
import SortBar from "./SortBar";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isSortDate, setIsSortDate] = useState<boolean>(true);
  const [isAcsDate, setIsAcsDate] = useState<boolean>(false);
  const [isAcsPrice, setIsAcsPrice] = useState<boolean>(true);

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
      <PaymentsTable
        isSortDate={isSortDate}
        isAcsDate={isAcsDate}
        isAcsPrice={isAcsPrice}
        thisMonthData={thisMonthData}
        setPayment={setPayment}
      />
      <PaymentsModal
        thisMonthData={thisMonthData}
        payment={payment}
        setPayment={setPayment}
      />
    </div>
  );
};

export default Payments;

import { useState } from "react";
import { useModal } from "hooks/useModal";
import type { MonthlyData } from "types/firebase";
import PaymentsTable from "./PaymentsTable";
import SortBar from "./SortBar";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
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
      />
    </div>
  );
};

export default Payments;

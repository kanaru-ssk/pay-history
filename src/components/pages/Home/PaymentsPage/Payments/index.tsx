import { useState } from "react";
import { PaymentsTable } from "./PaymentsTable";
import { SortBar } from "./SortBar";
import { type MonthlyData } from "@/types/firebase";

type Props = {
  thisMonthData: MonthlyData | null;
};

export const Payments = ({ thisMonthData }: Props) => {
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

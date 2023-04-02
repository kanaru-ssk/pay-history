import AddForm from "./AddForm";
import Budget from "./Budget";
import Payments from "./Payments";
import { type MonthlyData } from "@/types/firebase";

type Props = {
  thisMonthData: MonthlyData | null;
};

const PaymentsPage = ({ thisMonthData }: Props) => {
  return (
    <div className="pb-16">
      <div className="sticky top-12 bg-white">
        <Budget thisMonthData={thisMonthData} />
      </div>
      <Payments thisMonthData={thisMonthData} />
      <div className="fixed bottom-0 left-0 w-full bg-white px-4 pb-[env(safe-area-inset-bottom)] drop-shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
        <AddForm thisMonthData={thisMonthData} />
      </div>
    </div>
  );
};

export default PaymentsPage;

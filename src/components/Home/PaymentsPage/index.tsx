import type { MonthlyData } from "@/types/firebase";
import { AddForm } from "./AddForm";
import { Budget } from "./Budget";
import { Payments } from "./Payments";

type Props = {
  thisMonthData: MonthlyData | null;
};

export function PaymentsPage({ thisMonthData }: Props) {
  return (
    <div className="pb-16">
      <div className="sticky top-12 bg-white dark:bg-gray-950">
        <Budget thisMonthData={thisMonthData} />
      </div>
      <Payments thisMonthData={thisMonthData} />
      <div className="fixed bottom-0 left-0 w-full bg-white px-4 pb-[env(safe-area-inset-bottom)] drop-shadow-[0_-2px_4px_rgba(0,0,0,0.1)] dark:bg-gray-950">
        <AddForm thisMonthData={thisMonthData} />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

import LandingPage from "./LandingPage";
import LoadingPage from "./LoadingPage";
import PaymentsPage from "./PaymentsPage";

import type { MonthlyData } from "types/firebase";

import Header from "components/common/Header";
import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { tabToDocId } from "libs/convert";
import { getMonthlyData } from "libs/monthlyData";

const Home = () => {
  const { dbUser } = useAuth();
  const { tabStatus } = useTabStatus();
  const [thisMonthData, setThisMonthData] = useState<
    MonthlyData | null | undefined
  >(undefined);

  // 月次データをリッスン
  useEffect(() => {
    const unsubscribe = getMonthlyData(
      dbUser?.docId,
      tabToDocId(tabStatus),
      setThisMonthData
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dbUser, tabStatus]);

  return (
    <>
      <Header />
      <main>
        {thisMonthData === undefined && <LoadingPage />}
        {thisMonthData === null && <LandingPage />}
        {thisMonthData && <PaymentsPage thisMonthData={thisMonthData} />}
      </main>
    </>
  );
};

export default Home;

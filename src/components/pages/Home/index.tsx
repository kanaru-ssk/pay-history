import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import LandingPage from "./LandingPage";
import LoadingPage from "./LoadingPage";
import PaymentsPage from "./PaymentsPage";

import type { MonthlyData } from "types/firebase";

import Header from "components/common/Header";
import { useAuth } from "hooks/auth";
import { tabToDocId } from "libs/convert";
import { getMonthlyData } from "libs/monthlyData";
import { tabState } from "states/tabState";

const Home = () => {
  const tab = useRecoilValue(tabState);

  const { dbUser } = useAuth();
  const [thisMonthData, setThisMonthData] = useState<
    MonthlyData | null | undefined
  >(undefined);

  // 月次データをリッスン
  useEffect(() => {
    const unsubscribe = getMonthlyData(
      dbUser?.docId,
      tabToDocId(tab),
      setThisMonthData
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dbUser, tab]);

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

import { useEffect, useState } from "react";

import LandingPage from "./LandingPage";
import LoadingPage from "./LoadingPage";
import Payments from "./Payments";

import type { MonthlyData } from "types/firebase";

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

  if (thisMonthData === undefined) return <LoadingPage />;
  if (thisMonthData === null) return <LandingPage />;

  return <Payments thisMonthData={thisMonthData} />;
};

export default Home;

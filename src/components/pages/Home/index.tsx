import { useEffect, useState } from "react";

import LandingPage from "./LandingPage";
import Payments from "./Payments";

import type { MonthlyData } from "types/firebase";

import Header from "components/common/Header";
import Loading from "components/common/Loading";
import Tab from "components/common/Tab";
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

  if (thisMonthData === undefined) {
    return (
      <>
        <Header />
        <Tab />
        <main>
          <div className="my-4 flex justify-center">
            <Loading />
          </div>
        </main>
      </>
    );
  } else if (thisMonthData === null) {
    return (
      <>
        <Header />
        <Tab />
        <main>
          <LandingPage />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Tab />
        <main>
          <Payments thisMonthData={thisMonthData} />
        </main>
      </>
    );
  }
};

export default Home;

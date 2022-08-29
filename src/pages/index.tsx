import { useEffect, useState } from "react";

import type { MonthlyData } from "types/firebase";

import LandingPage from "components/LandingPage";
import Loading from "components/Loading";
import Payments from "components/Payments";
import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { getMonthlyData, tabToDocId } from "libs/monthlyData";

const Home = () => {
  const { authUser } = useAuth();
  const { tabStatus } = useTabStatus();

  const [thisMonthData, setThisMonthData] = useState<
    MonthlyData | null | undefined
  >(undefined);

  useEffect(() => {
    const unsubscribe = getMonthlyData(
      authUser?.uid,
      tabToDocId(tabStatus),
      setThisMonthData
    );
    return () => {
      if (unsubscribe !== null) unsubscribe();
    };
  }, [authUser, tabStatus]);

  if (thisMonthData === undefined) {
    return (
      <main className="my-4 flex justify-center">
        <Loading />
      </main>
    );
  } else if (thisMonthData === null) {
    return (
      <main>
        <LandingPage />
      </main>
    );
  } else {
    return (
      <main>
        <Payments thisMonthData={thisMonthData} />
      </main>
    );
  }
};

export default Home;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LandingPage from "./LandingPage";
import LoadingPage from "./LoadingPage";
import PaymentsPage from "./PaymentsPage";

import type { MonthlyData } from "types/firebase";

import Header from "components/common/Header";
import Notice from "components/common/Notice";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { useTabStatus } from "hooks/tabStatus";
import { tabToDocId } from "libs/convert";
import { getMonthlyData } from "libs/monthlyData";

const Home = () => {
  const { query, push } = useRouter();
  const { changePasswordSuccess } = query;
  const { dbUser } = useAuth();
  const { text } = useLocale();
  const { tabStatus } = useTabStatus();
  const [thisMonthData, setThisMonthData] = useState<
    MonthlyData | null | undefined
  >(undefined);

  // listen to monthly data
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
        <Notice text={changePasswordSuccess ? text.PASSWORD_CHANGED : ""} />
        {thisMonthData === undefined && <LoadingPage />}
        {thisMonthData === null && <LandingPage />}
        {thisMonthData && <PaymentsPage thisMonthData={thisMonthData} />}
      </main>
    </>
  );
};

export default Home;

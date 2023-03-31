import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import LoadingPage from "./LoadingPage";
import PaymentsPage from "./PaymentsPage";
import Notification from "@/components/molecules/Notification";
import Head from "@/components/organisms/Head";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import { useTabStatus } from "@/hooks/tabStatus";
import { tabToDocId } from "@/libs/convert";
import { getMonthlyData } from "@/libs/monthlyData";
import type { MonthlyData } from "@/types/firebase";

const Home = () => {
  const { query } = useRouter();
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
      <Head />
      <div>
        <Notification
          text={text.PASSWORD_CHANGED}
          show={!!changePasswordSuccess}
        />
        {thisMonthData === undefined && <LoadingPage />}
        {thisMonthData === null && <LandingPage />}
        {thisMonthData && <PaymentsPage thisMonthData={thisMonthData} />}
      </div>
    </>
  );
};

export default Home;

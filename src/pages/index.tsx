import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import type { MonthlyData } from "types/firebase";

import Introduction from "components/Introduction";
import Loading from "components/Loading";
import Budget from "components/manager/Budget";
import Payments from "components/manager/Payments";
import PaymentsForm from "components/manager/PaymentsForm";
import { useAuth } from "hooks/auth";
import { getMonthlyData, getThisMonthDocId } from "libs/monthlyData";

const Home = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [thisMonthData, setThisMonthData] = useState<
    MonthlyData | null | undefined
  >(undefined);

  const { id } = router.query;

  useEffect(() => {
    const unsubscribe = getMonthlyData(
      authUser?.uid,
      id ? id?.[0] : getThisMonthDocId(),
      setThisMonthData
    );
    return () => {
      if (unsubscribe !== null) unsubscribe();
    };
  }, [authUser, id, setThisMonthData]);

  // 初回ロード
  useEffect(() => {
    if (thisMonthData !== undefined) setIsLoading(false);
  }, [thisMonthData]);

  if (isLoading || thisMonthData === undefined) {
    return <Loading />;
  } else if (thisMonthData === null) {
    return <Introduction setThisMonthData={setThisMonthData} />;
  } else {
    return (
      <main>
        <Budget thisMonthData={thisMonthData} />

        <Payments thisMonthData={thisMonthData} />
        <PaymentsForm thisMonthData={thisMonthData} />
      </main>
    );
  }
};

export default Home;

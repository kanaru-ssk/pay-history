import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import type { MonthlyData } from "types/firebase";

import Budget from "components/Budget";
import Introduction from "components/Introduction";
import Loading from "components/Loading";
import Payments from "components/Payments";
import PaymentsForm from "components/PaymentsForm";
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
    return (
      <div className="my-4 flex justify-center">
        <Loading />
      </div>
    );
  } else if (thisMonthData === null) {
    return <Introduction />;
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

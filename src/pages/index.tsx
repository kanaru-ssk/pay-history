import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import type { MonthlyData } from "types/firebase";

import Budget from "components/Budget";
import Introduction from "components/Introduction";
import Loading from "components/Loading";
import Payments from "components/Payments";
import { useAuth } from "hooks/auth";
import { getMonthlyData, getThisMonthDocId } from "libs/monthlyData";

const Home = () => {
  const { authUser } = useAuth();
  const router = useRouter();

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
  }, [authUser, id]);

  if (thisMonthData === undefined) {
    return (
      <main className="my-4 flex justify-center">
        <Loading />
      </main>
    );
  } else if (thisMonthData === null) {
    return (
      <main>
        <Introduction />
      </main>
    );
  } else {
    return (
      <main>
        <div className="my-8">
          <Budget thisMonthData={thisMonthData} />
        </div>

        <Payments thisMonthData={thisMonthData} />
      </main>
    );
  }
};

export default Home;

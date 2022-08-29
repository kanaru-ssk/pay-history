import { useRouter } from "next/router";

import { useAuth } from "hooks/auth";
import { createMonthlyData, pathToMonth } from "libs/monthlyData";

const CtaBtn = () => {
  const { authUser, dbUser } = useAuth();
  const router = useRouter();

  const { id } = router.query;

  const onClickHundler = () => {
    const month = pathToMonth(id?.[0]);
    if (month) {
      createMonthlyData(authUser, month[1], month[0], dbUser?.budget);
    }
  };

  return (
    <button
      onClick={onClickHundler}
      className="rounded-full bg-main-color py-4 px-12 text-white hover:bg-sub-color"
    >
      予算管理を始める
    </button>
  );
};

export default CtaBtn;

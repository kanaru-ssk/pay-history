import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { createMonthlyData } from "libs/monthlyData";

const CtaBtn = () => {
  const { authUser, dbUser } = useAuth();
  const { tabStatus } = useTabStatus();

  const onClickHundler = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    const thisMonth = date.getMonth() + 1;
    const year = thisMonth < tabStatus ? thisYear - 1 : thisYear;
    createMonthlyData(authUser, tabStatus, year, dbUser?.budget);
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

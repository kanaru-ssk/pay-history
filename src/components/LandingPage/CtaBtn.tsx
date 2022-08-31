import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { createMonthlyData, tabToDocId } from "libs/monthlyData";

const CtaBtn = () => {
  const { authUser, dbUser } = useAuth();
  const { tabStatus } = useTabStatus();

  const onClickHundler = () => {
    const docId = tabToDocId(tabStatus);
    createMonthlyData(authUser, docId, dbUser?.budget);
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

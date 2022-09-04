import Button from "components/Button";
import { useAuth } from "hooks/auth";
import { useTabStatus } from "hooks/tabStatus";
import { createMonthlyData, tabToDocId } from "libs/monthlyData";

const CtaBtn = () => {
  const { dbUser } = useAuth();
  const { tabStatus } = useTabStatus();

  const onClickHundler = () => {
    const docId = tabToDocId(tabStatus);
    createMonthlyData(dbUser, docId);
  };

  return <Button text="予算管理を始める" onClick={onClickHundler} blue />;
};

export default CtaBtn;

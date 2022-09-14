import { useRecoilValue } from "recoil";

import Button from "components/common/Button";
import { useAuth } from "hooks/auth";
import { tabToDocId } from "libs/convert";
import { createMonthlyData } from "libs/monthlyData";
import { tabState } from "states/tabState";

const CtaBtn = () => {
  const { dbUser } = useAuth();
  const tab = useRecoilValue(tabState);

  const onClickHundler = () => {
    const docId = tabToDocId(tab);
    createMonthlyData(dbUser, docId);
  };

  return <Button text="予算管理を始める" onClick={onClickHundler} blue />;
};

export default CtaBtn;

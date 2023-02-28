import Button from "components/common/atoms/Button";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { useTabStatus } from "hooks/tabStatus";
import { tabToDocId } from "libs/convert";
import { createMonthlyData } from "libs/monthlyData";

const CtaBtn = () => {
  const { dbUser } = useAuth();
  const { tabStatus } = useTabStatus();
  const { text } = useLocale();

  const onClickHandler = () => {
    const docId = tabToDocId(tabStatus);
    createMonthlyData(dbUser, docId);
  };

  return <Button text={text.START_BUDGETING} onClick={onClickHandler} blue />;
};

export default CtaBtn;

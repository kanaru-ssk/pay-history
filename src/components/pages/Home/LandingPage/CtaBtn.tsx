import Button from "@/components/atoms/Button";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import { useTabStatus } from "@/hooks/tabStatus";
import { tabToDocId } from "@/libs/convert";
import { createMonthlyData } from "@/libs/firebase";

const CtaBtn = () => {
  const { dbUser } = useAuth();
  const { tabStatus } = useTabStatus();
  const { text } = useLocale();

  const onClickHandler = () => {
    const docId = tabToDocId(tabStatus);
    createMonthlyData(dbUser, docId);
  };

  return (
    <Button name="cta" onClick={onClickHandler} color="blue" large>
      {text.START_BUDGETING}
    </Button>
  );
};

export default CtaBtn;

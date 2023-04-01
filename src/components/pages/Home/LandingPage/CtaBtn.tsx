import Button from "@/components/atoms/Button";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import { useDocId } from "@/hooks/useDocId";
import { createMonthlyData } from "@/libs/firebase";

const CtaBtn = () => {
  const { dbUser } = useAuth();
  const { docId } = useDocId();
  const { text } = useLocale();
  const onClickHandler = () => {
    createMonthlyData(dbUser, docId);
  };

  return (
    <Button name="cta" onClick={onClickHandler} color="blue" large>
      {text.START_BUDGETING}
    </Button>
  );
};

export default CtaBtn;

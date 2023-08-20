import { useState, type ChangeEvent, type FormEvent } from "react";
import { ButtonWithStatus } from "@/components/ui/button/ButtonWithStatus";
import { Input } from "@/components/ui/input/Input";
import { useAuth } from "@/hooks/useAuth";
import { useDocId } from "@/hooks/useDocId";
import { useLocale } from "@/hooks/useLocale";
import { useModal } from "@/hooks/useModal";
import { stringToPrice } from "@/libs/convert";
import { createMonthlyData, updateMonthlyData } from "@/libs/firebase";
import { updateUser } from "@/libs/firebase";
import { type MonthlyData } from "@/types/firebase";

type Props = {
  budget: number;
  thisMonthData: MonthlyData | null;
};

export const BudgetEditForm = ({ budget, thisMonthData }: Props) => {
  const { dbUser } = useAuth();
  const { docId } = useDocId();
  const { locale, text } = useLocale();
  const { setModalContents } = useModal();
  const [editedBudget, setEditedBudget] = useState<number>(budget);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  // edit the budget
  const changeBudget = (e: ChangeEvent<HTMLInputElement>) => {
    const newBudget = stringToPrice(e.target.value);
    setEditedBudget(newBudget);
    if (thisMonthData === null) {
      setIsReady(newBudget !== dbUser?.budget);
    } else {
      setIsReady(newBudget !== thisMonthData.budget);
    }
  };

  // save the budget
  const submitSaveBudget = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsReady(false);
      setIsUpdateLoading(true);
      await updateUser(dbUser, { budget: editedBudget });
      if (thisMonthData === null) {
        await createMonthlyData({
          user: dbUser,
          docId,
          budget: editedBudget,
        });
      } else {
        await updateMonthlyData(dbUser, {
          ...thisMonthData,
          budget: editedBudget,
        });
      }
    }
    setIsUpdateLoading(false);
    setModalContents(null);
  };

  return (
    <form onSubmit={submitSaveBudget} className="bg-white dark:bg-gray-950">
      <div className="space-y-4 py-2">
        <p className="mx-2">
          {locale === "en"
            ? `${text.CHANGE_BUDGET_MESSAGE} ${docId.replace("-", " / ")} ?`
            : `${docId.replace("-", " / ")} ${text.CHANGE_BUDGET_MESSAGE} ?`}
        </p>
        <Input
          name="budget"
          type="text"
          inputMode="numeric"
          value={editedBudget.toLocaleString()}
          onChange={changeBudget}
          right
          aria-label="budget"
        />
        <div className="ml-auto w-fit">
          <ButtonWithStatus
            name="edit"
            type="submit"
            isReady={isReady}
            isLoading={isUpdateLoading}
          >
            {text.CHANGE_BUDGET}
          </ButtonWithStatus>
        </div>
      </div>
    </form>
  );
};

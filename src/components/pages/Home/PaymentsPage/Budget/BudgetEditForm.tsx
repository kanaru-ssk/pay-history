import { useState } from "react";
import Input from "@/components/atoms/Input";
import ButtonWithStatus from "@/components/molecules/ButtonWithStatus";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { useModal } from "@/hooks/useModal";
import { stringToPrice } from "@/libs/convert";
import { updateMonthlyData } from "@/libs/firebase";
import { updateUser } from "@/libs/firebase";
import { type MonthlyData } from "@/types/firebase";

type Props = {
  budget: number;
  thisMonthData: MonthlyData;
};

const BudgetEditForm = ({ budget, thisMonthData }: Props) => {
  const { dbUser } = useAuth();
  const { text } = useLocale();
  const { setModalContents } = useModal();
  const [editedBudget, setEditedBudget] = useState<number>(budget);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  // edit the budget
  const changeBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = stringToPrice(e.target.value);
    setEditedBudget(newBudget);
    setIsReady(newBudget !== thisMonthData.budget);
  };

  // save the budget
  const submitSaveBudget = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsReady(false);
      setIsUpdateLoading(true);
      updateUser(dbUser, { budget: editedBudget });
      updateMonthlyData(dbUser, { ...thisMonthData, budget: editedBudget });
    }
    setIsUpdateLoading(false);
    setModalContents(null);
  };

  return (
    <form onSubmit={submitSaveBudget} className="bg-white">
      <div className="space-y-4 py-2">
        <Input
          name="budget"
          type="text"
          inputMode="numeric"
          value={editedBudget.toLocaleString()}
          onChange={changeBudget}
          small
          right
        />

        <ButtonWithStatus
          name="edit"
          type="submit"
          isReady={isReady}
          isLoading={isUpdateLoading}
        >
          {text.CHANGE_BUDGET}
        </ButtonWithStatus>
      </div>
    </form>
  );
};

export default BudgetEditForm;

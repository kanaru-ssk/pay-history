import { logEvent } from "firebase/analytics";
import { db, analytics } from "@/libs/firebase";
import { type MonthlyData, type DBUser, type Payment } from "@/types/firebase";

type Props = {
  user: DBUser | null;
  docId: string;
  payments?: Payment[];
};
// create monthly data
export const createMonthlyData = async ({
  user,
  docId,
  payments = [],
}: Props) => {
  if (!user) return null;

  const { setDoc, doc, Timestamp } = await import("firebase/firestore");

  const now = Timestamp.now();
  const newMonthlyData: Omit<MonthlyData, "docId"> = {
    atCreated: now,
    atUpdated: now,
    budget: user.budget,
    payments,
  };

  await setDoc(
    doc(db, "users", user.docId, "monthlyData", docId),
    newMonthlyData,
    { merge: true }
  );
  if (analytics) logEvent(analytics, "createMonthlyData");
  return newMonthlyData;
};

import { logEvent } from "firebase/analytics";
import { db, analytics } from "@/libs/firebase";
import type { MonthlyData, Payment, DBUser } from "@/types/firebase";

// add payment data
export const addPayment = async (
  user: DBUser | null,
  month: MonthlyData,
  price: number,
  date: Date
) => {
  if (!user) return false;

  const { updateDoc, arrayUnion, doc, Timestamp } = await import(
    "firebase/firestore"
  );

  const now = Timestamp.now();
  const newPayment: Payment = {
    atCreated: now,
    atUpdated: now,
    atPaid: Timestamp.fromDate(date),
    price: price,
  };
  const newMonthlyData = {
    atUpdated: now,
    payments: arrayUnion(newPayment),
  };

  await updateDoc(
    doc(db, "users", user.docId, "monthlyData", month.docId),
    newMonthlyData
  );
  if (analytics) logEvent(analytics, "addPayment");
  return true;
};

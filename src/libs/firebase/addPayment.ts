import { logEvent } from "firebase/analytics";
import { db, analytics, createPayment } from "@/libs/firebase";
import type { MonthlyData, DBUser } from "@/types/firebase";

// add payment data
export async function addPayment(
  user: DBUser | null,
  month: MonthlyData,
  price: number,
  date: Date,
) {
  if (!user) return false;

  const { updateDoc, arrayUnion, doc, Timestamp } = await import(
    "firebase/firestore"
  );

  const now = Timestamp.now();
  const newPayment = createPayment({ price, date });

  const newMonthlyData = {
    atUpdated: now,
    payments: arrayUnion(newPayment),
  };

  await updateDoc(
    doc(db, "users", user.docId, "monthlyData", month.docId),
    newMonthlyData,
  );
  if (analytics) logEvent(analytics, "addPayment");
  return true;
}

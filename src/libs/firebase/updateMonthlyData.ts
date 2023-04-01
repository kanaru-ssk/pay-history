import { logEvent } from "firebase/analytics";
import { db, analytics } from "@/libs/firebase";
import type { MonthlyData, DBUser } from "@/types/firebase";

// update monthly data
export const updateMonthlyData = async (
  user: DBUser | null,
  data: Partial<MonthlyData>
) => {
  if (!user || !data.docId) return null;

  const { updateDoc, doc, Timestamp } = await import("firebase/firestore");

  const now = Timestamp.now();
  const newMonthlyData: Partial<MonthlyData> = {
    atUpdated: now,
    ...data,
  };

  await updateDoc(
    doc(db, "users", user.docId, "monthlyData", data.docId),
    newMonthlyData
  );
  if (analytics) logEvent(analytics, "updateMonthlyData");
  return newMonthlyData;
};

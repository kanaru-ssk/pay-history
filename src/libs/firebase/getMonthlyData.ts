import { onSnapshot, doc } from "firebase/firestore";
import { type Dispatch, type SetStateAction } from "react";
import { db } from "@/libs/firebase";
import { type MonthlyData } from "@/types/firebase";

// listen to monthly data
export const getMonthlyData = (
  uid: string | undefined,
  docId: string,
  setMonthData: Dispatch<SetStateAction<MonthlyData | null | undefined>>,
) => {
  if (uid === undefined) return null;

  const docRef = doc(db, "users", uid, "monthlyData", docId);

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const monthlyData: MonthlyData = {
        docId: docSnap.id,
        atCreated: docSnap.data()?.atCreated,
        atUpdated: docSnap.data()?.atUpdated,
        budget: docSnap.data()?.budget,
        payments: docSnap.data()?.payments,
      };
      setMonthData(monthlyData);
    } else {
      setMonthData(null);
    }
  });
};

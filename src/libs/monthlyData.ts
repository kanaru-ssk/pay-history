import { logEvent } from "firebase/analytics";
import { onSnapshot, doc } from "firebase/firestore";
import { db, analytics } from "libs/firebase";
import type { MonthlyData, Payment, DBUser } from "types/firebase";

// listen to monthly data
export const getMonthlyData = (
  uid: string | undefined,
  docId: string,
  setMonthData: React.Dispatch<
    React.SetStateAction<MonthlyData | null | undefined>
  >
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

// create monthly data
export const createMonthlyData = async (user: DBUser | null, docId: string) => {
  if (!user) return null;

  const { setDoc, doc, Timestamp } = await import("firebase/firestore");

  const now = Timestamp.now();
  const newMonthlyData: Omit<MonthlyData, "docId"> = {
    atCreated: now,
    atUpdated: now,
    budget: user.budget,
    payments: [],
  };

  await setDoc(
    doc(db, "users", user.docId, "monthlyData", docId),
    newMonthlyData,
    { merge: true }
  );
  if (analytics) logEvent(analytics, "createMonthlyData");
  return newMonthlyData;
};

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

import { logEvent } from "firebase/analytics";
import { onSnapshot, doc } from "firebase/firestore";

import type { MonthlyData, Payment, DBUser } from "types/firebase";
import type { TabStatus } from "types/tabStatus";

import { db, analytics } from "libs/firebase";

// 月データリアルタイム取得
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

// exchange tabStatus -> docId
export const tabToDocId = (tabStatus: TabStatus): string => {
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth() + 1;
  const year = thisMonth < tabStatus ? thisYear - 1 : thisYear;
  const docId = year.toString() + "-" + tabStatus.toString();
  return docId;
};

// 月データ作成
export const createMonthlyData = async (user: DBUser | null, docId: string) => {
  if (!user) return null;

  const { setDoc, doc, Timestamp } = await import("firebase/firestore");

  const newMonthlyData: Omit<MonthlyData, "docId"> = {
    atCreated: Timestamp.now(),
    atUpdated: Timestamp.now(),
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

// 月データ更新
export const updateMonthlyData = async (
  user: DBUser | null,
  monthlyData: MonthlyData
) => {
  if (!user || !monthlyData) return null;

  const { updateDoc, doc, Timestamp } = await import("firebase/firestore");

  const newMonthlyData: Partial<MonthlyData> = {
    atUpdated: Timestamp.now(),
    budget: monthlyData.budget,
    payments: monthlyData.payments,
  };

  await updateDoc(
    doc(db, "users", user.docId, "monthlyData", monthlyData.docId),
    newMonthlyData
  );

  if (analytics) logEvent(analytics, "updateMonthlyData");
  return newMonthlyData;
};

// 月データ更新 : 予算
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

  const newPayment: Payment = {
    atCreated: Timestamp.now(),
    atUpdated: Timestamp.now(),
    atPaied: Timestamp.fromDate(date),
    price: price,
  };

  const newMonthlyData = {
    atUpdated: Timestamp.now(),
    payments: arrayUnion(newPayment),
  };

  updateDoc(
    doc(db, "users", user.docId, "monthlyData", month.docId),
    newMonthlyData
  );

  if (analytics) logEvent(analytics, "addPayment");
  return true;
};

type InputMonthData = {
  value: string;
  min: string;
  max: string;
};

export const convertInputMonth = (date: Date): InputMonthData => {
  const dateString = new Date(Number(date) - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const beginningOfMonth = new Date(date).setDate(1);
  const beginningOfMonthString = new Date(
    beginningOfMonth - new Date(beginningOfMonth).getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const maxDate = date < endOfMonth ? date : endOfMonth;
  const maxDateString = new Date(
    Number(maxDate) - maxDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const inputMonthData: InputMonthData = {
    value: dateString,
    min: beginningOfMonthString,
    max: maxDateString,
  };
  return inputMonthData;
};

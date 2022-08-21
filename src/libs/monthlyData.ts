import { onSnapshot, doc } from "firebase/firestore";

import db from "./initFirebase";

import type { User, MonthlyData, Payment, DBUser } from "types/firebase";

// 月データリアルタイム取得
export const getMonthlyData = (
  uid: string | undefined,
  docId: string | string[] | undefined,
  setMonthData: React.Dispatch<
    React.SetStateAction<MonthlyData | null | undefined>
  >
) => {
  if (uid === undefined) return null;
  if (docId === undefined) return null;

  if (typeof docId !== "string") docId = docId[0];

  const docRef = doc(db, "users", uid, "monthlyData", docId);

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const monthlyData: MonthlyData = {
        docId: docSnap.id,
        atCreated: docSnap.data()?.atCreated,
        atUpdated: docSnap.data()?.atUpdated,
        budget: docSnap.data()?.budget,
        month: docSnap.data()?.month,
        year: docSnap.data()?.year,
        payments: docSnap.data()?.payments,
      };
      setMonthData(monthlyData);
    } else {
      setMonthData(null);
    }
  });
};

export const getThisMonthDocId = (): string => {
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth() + 1;
  const docId = nowYear.toString() + "-" + nowMonth.toString();
  return docId;
};

export const pathToMonth = (
  path: string | string[] | undefined
): number[] | null => {
  const pattern = /^[0-9]{4}-[0-9]{1,2}$/;
  if (path === undefined) {
    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth() + 1;
    const nowDate = date.getDate();
    return [nowYear, nowMonth, nowDate];
  } else if (typeof path === "string") {
    if (pattern.test(path)) {
      const split = path.split("-");
      const toNum = split.map((value) => {
        return Number(value);
      });
      return toNum;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// 月データ作成
export const createMonthlyData = async (
  user: User | null,
  month: number,
  year: number,
  _budget?: number
) => {
  if (!user) return null;
  const budget = _budget ? _budget : 50000;

  const { setDoc, doc, serverTimestamp } = await import("firebase/firestore");

  const docId = year.toString() + "-" + month.toString();

  const newMonthlyData: MonthlyData = {
    docId: docId,
    atCreated: serverTimestamp(),
    atUpdated: serverTimestamp(),
    month: month,
    year: year,
    budget: budget,
    payments: [],
  };

  await setDoc(
    doc(db, "users", user.uid, "monthlyData", docId),
    newMonthlyData,
    { merge: true }
  );

  return newMonthlyData;
};

// 月データ更新
export const updateMonthlyData = async (
  user: DBUser | null,
  monthlyData: MonthlyData
) => {
  if (!user || !monthlyData) return null;

  const { updateDoc, doc, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const newMonthlyData: Partial<MonthlyData> = {
    atUpdated: serverTimestamp(),
    budget: monthlyData.budget,
    payments: monthlyData.payments,
  };

  await updateDoc(
    doc(db, "users", user.docId, "monthlyData", monthlyData.docId),
    newMonthlyData
  );

  return newMonthlyData;
};

// 月データ更新 : 予算
export const addPayment = async (
  user: User | null,
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
    doc(db, "users", user.uid, "monthlyData", month.docId),
    newMonthlyData
  );
  return true;
};

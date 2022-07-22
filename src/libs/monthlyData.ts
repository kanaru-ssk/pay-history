import { User, MonthlyData, Month } from "types/firebase";

// 月データ取得
export const getMonthlyData = async (
  uid: string | undefined
): Promise<MonthlyData | null> => {
  if (uid === undefined) return null;

  const { getFirestore, collection, getDocs, query, orderBy, limit } =
    await import("firebase/firestore");

  const db = getFirestore();
  const queryRef = query(
    collection(db, "users", uid, "monthlyData"),
    orderBy("atCreated", "desc"),
    limit(1)
  );

  const querySnap = await getDocs(queryRef);

  if (0 < querySnap.size) {
    const month: MonthlyData = {
      docId: querySnap.docs[0].id,
      atCreated: querySnap.docs[0].data().atCreated,
      atUpdated: querySnap.docs[0].data().atUpdated,
      month: querySnap.docs[0].data().month,
      budget: querySnap.docs[0].data().budget,
      payments: querySnap.docs[0].data().payments,
    };
    return month;
  } else {
    return null;
  }
};

// 月データ作成
export const createMonthlyData = async (
  user: User | null,
  month: Month,
  _budget?: number
) => {
  if (!user) return;
  const budget = _budget ? _budget : 0;

  const { getFirestore, addDoc, collection, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const db = getFirestore();
  const newMonthlyData: Omit<MonthlyData, "docId"> = {
    atCreated: serverTimestamp(),
    atUpdated: serverTimestamp(),
    month: month,
    budget: budget,
    payments: [],
  };

  addDoc(collection(db, "users", user.uid, "monthlyData"), newMonthlyData);
};

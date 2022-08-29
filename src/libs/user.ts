import { logEvent } from "firebase/analytics";

import type { User, DBUser } from "types/firebase";

import { db, analytics } from "libs/firebase";

// ユーザーデータ作成
export const createUser = async (authUser: User | null) => {
  if (authUser === null) return;

  const { setDoc, doc, serverTimestamp } = await import("firebase/firestore");

  const newUserData: Omit<DBUser, "docId"> = {
    atCreated: serverTimestamp(),
    atUpdated: serverTimestamp(),

    budget: 50000,
  };

  if (analytics) logEvent(analytics, "createUser");
  setDoc(doc(db, "users", authUser.uid), newUserData);
};

// ユーザーデータ更新
export const updateUser = async (dbUser: DBUser | null, budget: number) => {
  if (dbUser === null) return;

  const { doc, updateDoc, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const newData: Partial<DBUser> = {
    atUpdated: serverTimestamp(),
    budget: budget,
  };

  if (analytics) logEvent(analytics, "updateUser");
  updateDoc(doc(db, "users", dbUser.docId), newData);
};

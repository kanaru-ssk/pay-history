import type { User, DBUser } from "types/firebase";

import { db, analytics } from "libs/firebase";

// ユーザーデータ作成
export const createUser = async (authUser: User | null) => {
  if (authUser === null) return;

  const { setDoc, doc, Timestamp } = await import("firebase/firestore");
  const { logEvent } = await import("firebase/analytics");

  const newUserData: Omit<DBUser, "docId"> = {
    atCreated: Timestamp.now(),
    atUpdated: Timestamp.now(),
    budget: 50000,
    isAnonymous: true,
  };

  if (analytics) logEvent(analytics, "createUser");
  setDoc(doc(db, "users", authUser.uid), newUserData);
};

// ユーザーデータ更新
export const updateUser = async (
  dbUser: DBUser | null,
  data: Partial<DBUser>
) => {
  if (dbUser === null) return;

  const { doc, updateDoc, Timestamp } = await import("firebase/firestore");
  const { logEvent } = await import("firebase/analytics");

  const newData: Partial<DBUser> = {
    atUpdated: Timestamp.now(),
    ...data,
  };

  if (analytics) logEvent(analytics, "updateUser");
  updateDoc(doc(db, "users", dbUser.docId), newData);
};

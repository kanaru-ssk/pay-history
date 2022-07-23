import type { User, DBUser } from "types/firebase";

// ユーザーデータ作成
export const createUser = async (authUser: User | null) => {
  if (authUser === null) return;

  const { getFirestore, setDoc, doc, serverTimestamp } = await import(
    "firebase/firestore"
  );
  const db = getFirestore();

  const newUserData: Omit<DBUser, "docId"> = {
    atCreated: serverTimestamp(),
    atUpdated: serverTimestamp(),

    budget: 50000,
  };

  setDoc(doc(db, "users", authUser.uid), newUserData);
};

// ユーザーデータ更新
export const updateUser = async (dbUser: DBUser | null, budget: number) => {
  if (dbUser === null) return;

  const { getFirestore, doc, updateDoc, serverTimestamp } = await import(
    "firebase/firestore"
  );
  const db = getFirestore();

  const newData: Partial<DBUser> = {
    atUpdated: serverTimestamp(),
    budget: budget,
  };

  updateDoc(doc(db, "users", dbUser.docId), newData);
};

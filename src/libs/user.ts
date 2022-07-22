// ユーザーデータ関係の処理

import { User, DBUser } from "types/firebase";

// ドキュメントidからユーザーデータ取得
export const getUserDataByUid = async (uid: string | undefined) => {
  if (uid === undefined) return null;

  const { getFirestore, getDoc, doc } = await import("firebase/firestore");
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result: DBUser = {
      docId: docSnap.id,
      atCreated: docSnap.data().atCreated,
      atUpdated: docSnap.data().atUpdated,
    };
    return result;
  } else {
    return null;
  }
};

// ユーザーデータ作成
export const createUserData = async (user: User) => {
  if (user === null) return;

  const { getFirestore, setDoc, doc, serverTimestamp } = await import(
    "firebase/firestore"
  );
  const db = getFirestore();

  const newUserData: Omit<DBUser, "docId"> = {
    atCreated: serverTimestamp(),
    atUpdated: serverTimestamp(),
  };

  setDoc(doc(db, "users", user.uid), newUserData);
};

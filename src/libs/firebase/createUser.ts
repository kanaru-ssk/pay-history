import { db, analytics } from "@/libs/firebase";
import { type User, type DBUser } from "@/types/firebase";

// create user data
export const createUser = async (authUser: User | null) => {
  if (authUser === null) return;

  const { setDoc, doc, Timestamp } = await import("firebase/firestore");
  const { logEvent } = await import("firebase/analytics");

  const now = Timestamp.now();
  const newUserData: Omit<DBUser, "docId"> = {
    atCreated: now,
    atUpdated: now,
    budget: 50000,
    isAnonymous: true,
  };

  if (analytics) logEvent(analytics, "createUser");
  setDoc(doc(db, "users", authUser.uid), newUserData);
};

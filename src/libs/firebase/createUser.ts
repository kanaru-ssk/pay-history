import { db, analytics } from "@/libs/firebase";
import type { User, DBUser } from "@/types/firebase";

// create user data
export async function createUser(authUser: User | null) {
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
}

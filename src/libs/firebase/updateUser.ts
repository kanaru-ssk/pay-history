import { db, analytics } from "@/libs/firebase";
import { type DBUser } from "@/types/firebase";

// update user data
export const updateUser = async (
  dbUser: DBUser | null,
  data: Partial<DBUser>,
) => {
  if (dbUser === null) return;

  const { doc, updateDoc, Timestamp } = await import("firebase/firestore");
  const { logEvent } = await import("firebase/analytics");

  const now = Timestamp.now();
  const newData: Partial<DBUser> = {
    atUpdated: now,
    ...data,
  };

  if (analytics) logEvent(analytics, "updateUser");
  updateDoc(doc(db, "users", dbUser.docId), newData);
};

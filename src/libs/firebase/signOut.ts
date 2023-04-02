import { logEvent } from "firebase/analytics";
import { errCodeToMessage } from "@/libs/convert";
import { auth, analytics } from "@/libs/firebase";
import { type ErrorMessage } from "@/types/errorMessage";

export const signOut = async (): Promise<ErrorMessage | null> => {
  try {
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    if (analytics) logEvent(analytics, "signOut");
    return null;
  } catch (error) {
    return errCodeToMessage(error);
  }
};

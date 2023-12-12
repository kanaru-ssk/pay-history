import { logEvent } from "firebase/analytics";
import { texts } from "@/constants/texts";
import { errCodeToMessage } from "@/libs/convert";
import { auth, analytics } from "@/libs/firebase";
import type { ErrorMessage } from "@/types/errorMessage";

export async function changePassword(
  email: string | null | undefined,
  oldPassword: string,
  newPassword: string,
): Promise<ErrorMessage | null> {
  try {
    if (!auth.currentUser) return texts.UNKNOWN_ERROR;
    if (typeof email !== "string") return texts.UNKNOWN_ERROR;

    const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } =
      await import("firebase/auth");

    const credential = EmailAuthProvider.credential(email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
    if (analytics) logEvent(analytics, "changePassword");
    return null;
  } catch (error) {
    return errCodeToMessage(error);
  }
}

import { logEvent } from "firebase/analytics";
import { texts } from "@/constants/texts";
import { errCodeToMessage } from "@/libs/convert";
import { auth, analytics } from "@/libs/firebase";
import { type ErrorMessage } from "@/types/errorMessage";

export async function signUp(
  email: string,
  password: string,
): Promise<ErrorMessage | null> {
  try {
    if (!auth.currentUser) return texts.UNKNOWN_ERROR;
    const {
      EmailAuthProvider,
      linkWithCredential,
      fetchSignInMethodsForEmail,
    } = await import("firebase/auth");

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (0 < methods.length) return texts.EMAIL_ALREADY_IN_USE;

    const credential = EmailAuthProvider.credential(email, password);
    await linkWithCredential(auth.currentUser, credential);
    if (analytics) logEvent(analytics, "signUp");
    return null;
  } catch (error) {
    return errCodeToMessage(error);
  }
}

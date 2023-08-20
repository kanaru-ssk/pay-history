import { logEvent } from "firebase/analytics";
import { texts } from "@/constants/texts";
import { errCodeToMessage } from "@/libs/convert";
import { auth, analytics } from "@/libs/firebase";
import { type ErrorMessage } from "@/types/errorMessage";

export const signIn = async (
  email: string,
  password: string,
): Promise<ErrorMessage | null> => {
  try {
    const { signInWithEmailAndPassword, fetchSignInMethodsForEmail } =
      await import("firebase/auth");

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length == 0) return texts.ACCOUNT_NOT_FOUND;

    await signInWithEmailAndPassword(auth, email, password);
    if (analytics) logEvent(analytics, "signIn");
    return null;
  } catch (error) {
    return errCodeToMessage(error);
  }
};

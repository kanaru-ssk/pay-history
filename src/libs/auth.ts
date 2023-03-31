import { logEvent } from "firebase/analytics";
import { texts } from "@/constants/texts";
import { errCodeToMessage } from "@/libs/convert";
import { auth, analytics } from "@/libs/firebase";
import type { ErrorMessage } from "@/types/errorMessage";

export const signIn = async (
  email: string,
  password: string
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

export const signUp = async (
  email: string,
  password: string
): Promise<ErrorMessage | null> => {
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
};

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

export const changePassword = async (
  email: string | null | undefined,
  oldPassword: string,
  newPassword: string
): Promise<ErrorMessage | null> => {
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
};

export const resetPasswordSendLink = async (
  email: string
): Promise<ErrorMessage | null> => {
  try {
    const { sendPasswordResetEmail } = await import("firebase/auth");

    const actionCodeSettings = {
      url: process.env.NEXT_PUBLIC_URL + "/signIn",
      handleCodeInApp: false,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    if (analytics) logEvent(analytics, "resetPasswordSendLink");
    return null;
  } catch (error) {
    return errCodeToMessage(error);
  }
};

export const resetPasswordSetNew = async (
  oobCode: string,
  newPassword: string
): Promise<ErrorMessage | null> => {
  try {
    const { verifyPasswordResetCode, confirmPasswordReset } = await import(
      "firebase/auth"
    );

    await verifyPasswordResetCode(auth, oobCode);
    await confirmPasswordReset(auth, oobCode, newPassword);
    if (analytics) logEvent(analytics, "resetPasswordSetNew");
    return null;
  } catch (error) {
    return errCodeToMessage(error);
  }
};

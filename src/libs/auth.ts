import { errCodeToMessage } from "libs/convert";
import { auth } from "libs/firebase";

export const signIn = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const { signInWithEmailAndPassword, fetchSignInMethodsForEmail } =
      await import("firebase/auth");

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length == 0) return "アカウントが見つかりませんでした。";

    await signInWithEmailAndPassword(auth, email, password);
    return "";
  } catch (error) {
    return errCodeToMessage(error);
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    if (!auth.currentUser) return "不明なエラーが発生しました。";
    const {
      EmailAuthProvider,
      linkWithCredential,
      fetchSignInMethodsForEmail,
    } = await import("firebase/auth");

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (0 < methods.length) return "このメールアドレスは既に使用されています。";

    const credential = EmailAuthProvider.credential(email, password);
    await linkWithCredential(auth.currentUser, credential);
    return "";
  } catch (error) {
    return errCodeToMessage(error);
  }
};

export const signOut = async () => {
  const { signOut } = await import("firebase/auth");
  signOut(auth);
};

export const changePassword = async (
  email: string | null | undefined,
  oldPassword: string,
  newPassword: string
) => {
  try {
    if (!auth.currentUser) return "不明なエラーが発生しました。";
    if (typeof email !== "string") return "不明なエラーが発生しました。";

    const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } =
      await import("firebase/auth");

    const credential = EmailAuthProvider.credential(email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
    return "";
  } catch (error) {
    return errCodeToMessage(error);
  }
};

export const sendResetPasswordLink = async (email: string) => {
  try {
    const { sendPasswordResetEmail } = await import("firebase/auth");

    const actionCodeSettings = {
      url: process.env.NEXT_PUBLIC_URL + "/signIn",
      handleCodeInApp: false,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return "";
  } catch (error) {
    return errCodeToMessage(error);
  }
};

export const resetPassword = async (oobCode: string, newPassword: string) => {
  try {
    const { verifyPasswordResetCode, confirmPasswordReset } = await import(
      "firebase/auth"
    );

    await verifyPasswordResetCode(auth, oobCode);
    await confirmPasswordReset(auth, oobCode, newPassword);
    return "";
  } catch (error) {
    return errCodeToMessage(error);
  }
};

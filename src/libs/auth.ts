import { auth } from "libs/firebase";
import { isAuthError } from "types/firebase";

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
    return convertErrorMessage(error);
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
    return convertErrorMessage(error);
  }
};

export const signOut = async () => {
  const { signOut } = await import("firebase/auth");
  signOut(auth);
};

export const validateLoginInfo = (email: string, password: string) => {
  if (!email || !password) return false;

  const emailFormat =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!emailFormat.test(email)) return false;

  const passwordFormat = /^([a-zA-Z0-9]{4,20})$/;
  if (!passwordFormat.test(password)) return false;

  return true;
};

export const validateEmail = (email: string) => {
  if (!email) return "メールアドレスを入力してください。";

  const emailFormat =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!emailFormat.test(email)) return "メールアドレス形式が正しくありません。";

  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "パスワードを入力してください。";

  const passwordFormat1 = /^[A-Za-z0-9]*$/;
  if (!passwordFormat1.test(password))
    return "パスワードは半角英数字のみで入力してください。";

  const passwordFormat2 = /^[a-z\d]{6,20}$/i;
  if (!passwordFormat2.test(password))
    return "パスワードは6文字以上、20文字以内で入力してください。";

  return "";
};

export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
) => {
  if (password !== passwordConfirm) return "パスワードが一致しませんでした。";

  return "";
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
    return convertErrorMessage(error);
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
    return convertErrorMessage(error);
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
    return convertErrorMessage(error);
  }
};

const convertErrorMessage = (error: unknown) => {
  if (isAuthError(error)) {
    if (error.code === "auth/invalid-email") {
      return "メールアドレス形式が正しくありません。";
    } else if (error.code === "auth/user-disabled") {
      return "アカウントが無効になっています。";
    } else if (error.code === "auth/user-not-found") {
      return "アカウントが見つかりませんでした。";
    } else if (error.code === "auth/wrong-password") {
      return "パスワードが間違っています。";
    } else if (error.code === "auth/too-many-requests") {
      return "所定の回数以上パスワードを間違えました。時間をおいてお試しください。";
    } else if (error.code === "auth/email-already-in-use") {
      return "このメールアドレスは既に使用されています。";
    } else if (error.code === "auth/weak-password") {
      return "パスワードが脆弱です。6文字以上で入力してください。";
    } else if (error.code === "auth/provider-already-linked") {
      return "既にサインイン済みです。";
    } else if (error.code === "auth/invalid-action-code") {
      return "無効な再設定リンクです。";
    } else if (error.code === "auth/expired-action-code") {
      return "再設定リンクの有効期限が切れています。";
    }

    return "不明なエラーが発生しました。";
  }
  return "不明なエラーが発生しました。";
};

export const validateEmail = (email: string): string => {
  if (!email) return "メールアドレスを入力してください。";

  const emailFormat =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!emailFormat.test(email)) return "メールアドレス形式が正しくありません。";

  return "";
};

export const validatePassword = (password: string): string => {
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
): string => {
  if (password !== passwordConfirm) return "パスワードが一致しませんでした。";

  return "";
};

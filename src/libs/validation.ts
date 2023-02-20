import type { ErrorMessage } from "types/errorMessage";

import englishText from "constants/englishText";
import japaneseText from "constants/japaneseText";

export const validateEmail = (email: string): ErrorMessage | null => {
  if (!email)
    return {
      en: englishText.ENTER_YOUR_EMAIL_ADDRESS,
      ja: japaneseText.ENTER_YOUR_EMAIL_ADDRESS,
    };

  const emailFormat =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!emailFormat.test(email))
    return {
      en: englishText.ENTER_YOUR_EMAIL_ADDRESS,
      ja: japaneseText.ENTER_YOUR_EMAIL_ADDRESS,
    };

  return null;
};

export const validatePassword = (password: string): ErrorMessage | null => {
  if (!password)
    return { en: englishText.ENTER_PASSWORD, ja: japaneseText.ENTER_PASSWORD };

  const passwordFormat1 = /^[A-Za-z0-9]*$/;
  if (!passwordFormat1.test(password))
    return {
      en: englishText.PASSWORD_CONDITION_01,
      ja: japaneseText.PASSWORD_CONDITION_01,
    };

  const passwordFormat2 = /^[a-z\d]{6,20}$/i;
  if (!passwordFormat2.test(password))
    return {
      en: englishText.PASSWORD_CONDITION_02,
      ja: japaneseText.PASSWORD_CONDITION_02,
    };

  return null;
};

export const validateReenterPassword = (
  password: string,
  reenterPassword: string
): ErrorMessage | null => {
  if (password !== reenterPassword)
    return {
      en: englishText.NOT_CORRECT_PASSWORD,
      ja: japaneseText.NOT_CORRECT_PASSWORD,
    };

  return null;
};

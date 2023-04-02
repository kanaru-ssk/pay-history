import { texts } from "@/constants/texts";
import { type ErrorMessage } from "@/types/errorMessage";

export const validateEmail = (email: string): ErrorMessage | null => {
  if (!email) return texts.ENTER_YOUR_EMAIL_ADDRESS;

  const emailFormat =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!emailFormat.test(email)) return texts.INVALID_EMAIL;

  return null;
};

export const validatePassword = (password: string): ErrorMessage | null => {
  if (!password) return texts.ENTER_PASSWORD;

  const passwordFormat1 = /^[A-Za-z0-9]*$/;
  if (!passwordFormat1.test(password))
    return texts.ONLY_ALPHANUMERIC_CHARACTERS;

  const passwordFormat2 = /^[a-z\d]{6,20}$/i;
  if (!passwordFormat2.test(password)) return texts.CHARACTERS_6_to_20;

  return null;
};

export const validateReenterPassword = (
  password: string,
  reenterPassword: string
): ErrorMessage | null => {
  if (password !== reenterPassword) return texts.NOT_CORRECT_PASSWORD;

  return null;
};

import { texts } from "@/constants/texts";
import { type ErrorMessage } from "@/types/errorMessage";

export function validatePassword(password: string): ErrorMessage | null {
  if (!password) return texts.ENTER_PASSWORD;

  const passwordFormat1 = /^[A-Za-z0-9]*$/;
  if (!passwordFormat1.test(password))
    return texts.ONLY_ALPHANUMERIC_CHARACTERS;

  const passwordFormat2 = /^[a-z\d]{6,20}$/i;
  if (!passwordFormat2.test(password)) return texts.CHARACTERS_6_to_20;

  return null;
}

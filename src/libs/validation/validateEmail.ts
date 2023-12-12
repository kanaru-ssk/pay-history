import { texts } from "@/constants/texts";
import type { ErrorMessage } from "@/types/errorMessage";

export function validateEmail(email: string): ErrorMessage | null {
  if (!email) return texts.ENTER_YOUR_EMAIL_ADDRESS;

  const emailFormat =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!emailFormat.test(email)) return texts.INVALID_EMAIL;

  return null;
}

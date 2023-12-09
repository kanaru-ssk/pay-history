import { texts } from "@/constants/texts";
import { type ErrorMessage } from "@/types/errorMessage";

export function validateReenterPassword(
  password: string,
  reenterPassword: string,
): ErrorMessage | null {
  if (password !== reenterPassword) return texts.NOT_CORRECT_PASSWORD;

  return null;
}

import { logEvent } from "firebase/analytics";
import { errCodeToMessage } from "@/libs/convert";
import { auth, analytics } from "@/libs/firebase";
import type { ErrorMessage } from "@/types/errorMessage";

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

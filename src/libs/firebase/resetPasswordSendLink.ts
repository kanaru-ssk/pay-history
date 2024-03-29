import { logEvent } from "firebase/analytics";
import { errCodeToMessage } from "@/libs/convert";
import { auth, analytics } from "@/libs/firebase";
import type { ErrorMessage } from "@/types/errorMessage";

export async function resetPasswordSendLink(
  email: string,
): Promise<ErrorMessage | null> {
  try {
    const { sendPasswordResetEmail } = await import("firebase/auth");

    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_URL}/sign-in`,
      handleCodeInApp: false,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    if (analytics) logEvent(analytics, "resetPasswordSendLink");
    return null;
  } catch (error) {
    return errCodeToMessage(error);
  }
}

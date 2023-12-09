import { texts } from "@/constants/texts";
import { type ErrorMessage } from "@/types/errorMessage";
import { isAuthError } from "@/types/firebase";

export function errCodeToMessage(error: unknown): ErrorMessage {
  if (isAuthError(error)) {
    if (error.code === "auth/invalid-email") {
      return texts.INVALID_EMAIL;
    } else if (error.code === "auth/user-disabled") {
      return texts.USER_DISABLED;
    } else if (error.code === "auth/user-not-found") {
      return texts.ACCOUNT_NOT_FOUND;
    } else if (error.code === "auth/wrong-password") {
      return texts.WRONG_PASSWORD;
    } else if (error.code === "auth/too-many-requests") {
      return texts.TOO_MANY_REQUESTS;
    } else if (
      error.code === "auth/email-already-in-use" ||
      error.code === "auth/provider-already-linked"
    ) {
      return texts.EMAIL_ALREADY_USE;
    } else if (error.code === "auth/weak-password") {
      return texts.WEAK_PASSWORD;
    } else if (error.code === "auth/invalid-action-code") {
      return texts.INVALID_ACTION_CODE;
    } else if (error.code === "auth/expired-action-code") {
      return texts.EXPIRED_ACTION_CODE;
    }

    return texts.UNKNOWN_ERROR;
  }
  return texts.UNKNOWN_ERROR;
}

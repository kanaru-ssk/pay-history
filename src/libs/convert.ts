import type { ErrorMessage } from "types/errorMessage";
import type { TabStatus } from "types/tabStatus";

import englishText from "constants/englishText";
import japaneseText from "constants/japaneseText";
import { isAuthError } from "types/firebase";

export const tabToDocId = (tabStatus: TabStatus): string => {
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth() + 1;
  const year = thisMonth < tabStatus ? thisYear - 1 : thisYear;
  const docId = year.toString() + "-" + tabStatus.toString();
  return docId;
};

type InputMonthData = {
  value: string;
  min: string;
  max: string;
};

export const dateToInputData = (date: Date): InputMonthData => {
  const dateString = new Date(Number(date) - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const beginningOfMonth = new Date(date).setDate(1);
  const beginningOfMonthString = new Date(
    beginningOfMonth - new Date(beginningOfMonth).getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const now = new Date();
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const maxDate = date.getMonth() == now.getMonth() ? now : endOfMonth;
  const maxDateString = new Date(
    Number(maxDate) - maxDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const inputMonthData: InputMonthData = {
    value: dateString,
    min: beginningOfMonthString,
    max: maxDateString,
  };
  return inputMonthData;
};

const stringToHalfWidth = (value: string): string => {
  if (!value) return value;

  return String(value).replace(/[！-～]/g, (all: string): string => {
    return String.fromCharCode(all.charCodeAt(0) - 0xfee0);
  });
};

export const stringToPrice = (value: string): number => {
  const half = stringToHalfWidth(value);
  const removed = half.replace(/,/g, "");
  const pattern = /^\d*$/;
  if (pattern.test(removed)) {
    const toNum = Number(removed);
    if (0 < toNum) {
      return toNum;
    }
  }
  return 0;
};

export const errCodeToMessage = (error: unknown): ErrorMessage => {
  if (isAuthError(error)) {
    if (error.code === "auth/invalid-email") {
      return {
        en: error.message,
        ja: japaneseText.INVALID_EMAIL,
      };
    } else if (error.code === "auth/user-disabled") {
      return { en: error.message, ja: japaneseText.USER_DISABLED };
    } else if (error.code === "auth/user-not-found") {
      return { en: error.message, ja: japaneseText.ACCOUNT_NOT_FOUND };
    } else if (error.code === "auth/wrong-password") {
      return { en: error.message, ja: japaneseText.WRONG_PASSWORD };
    } else if (error.code === "auth/too-many-requests") {
      return {
        en: error.message,
        ja: japaneseText.TOO_MANY_REQUESTS,
      };
    } else if (error.code === "auth/email-already-in-use") {
      return {
        en: error.message,
        ja: japaneseText.EMAIL_ALREADY_USE,
      };
    } else if (error.code === "auth/weak-password") {
      return {
        en: error.message,
        ja: japaneseText.WEAK_PASSWORD,
      };
    } else if (error.code === "auth/provider-already-linked") {
      return { en: error.message, ja: japaneseText.PROVIDER_ALREADY_LINKED };
    } else if (error.code === "auth/invalid-action-code") {
      return { en: error.message, ja: japaneseText.INVALID_ACTION_CODE };
    } else if (error.code === "auth/expired-action-code") {
      return {
        en: error.message,
        ja: japaneseText.EXPIRED_ACTION_CODE,
      };
    }

    return { en: error.message, ja: japaneseText.UNKNOWN_ERROR };
  }
  return { en: englishText.UNKNOWN_ERROR, ja: japaneseText.UNKNOWN_ERROR };
};

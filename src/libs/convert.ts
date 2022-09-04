import type { TabStatus } from "types/tabStatus";

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

  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const maxDate = date < endOfMonth ? date : endOfMonth;
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

export const errCodeToMessage = (error: unknown) => {
  if (isAuthError(error)) {
    if (error.code === "auth/invalid-email") {
      return "メールアドレス形式が正しくありません。";
    } else if (error.code === "auth/user-disabled") {
      return "アカウントが無効になっています。";
    } else if (error.code === "auth/user-not-found") {
      return "アカウントが見つかりませんでした。";
    } else if (error.code === "auth/wrong-password") {
      return "パスワードが間違っています。";
    } else if (error.code === "auth/too-many-requests") {
      return "所定の回数以上パスワードを間違えました。時間をおいてお試しください。";
    } else if (error.code === "auth/email-already-in-use") {
      return "このメールアドレスは既に使用されています。";
    } else if (error.code === "auth/weak-password") {
      return "パスワードが脆弱です。6文字以上で入力してください。";
    } else if (error.code === "auth/provider-already-linked") {
      return "既にサインイン済みです。";
    } else if (error.code === "auth/invalid-action-code") {
      return "無効な再設定リンクです。";
    } else if (error.code === "auth/expired-action-code") {
      return "再設定リンクの有効期限が切れています。";
    }

    return "不明なエラーが発生しました。";
  }
  return "不明なエラーが発生しました。";
};

import { dateToInputData, stringToPrice, errCodeToMessage } from "./convert";

describe("dateToInputData function", () => {
  beforeAll(() => {
    const mockDate = new Date(2020, 1, 15);
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  test("return correct value for current month", () => {
    expect(dateToInputData(new Date(2020, 1, 10))).toEqual({
      value: "2020-02-10",
      min: "2020-02-01",
      max: "2020-02-15",
    });
  });
  test("return correct value for previous month", () => {
    expect(dateToInputData(new Date(2020, 0, 10))).toEqual({
      value: "2020-01-10",
      min: "2020-01-01",
      max: "2020-01-31",
    });
  });
});

describe("stringToPrice function", () => {
  test("return correct value for 1 million", () => {
    expect(stringToPrice("1,000,000")).toEqual(1000000);
  });
  test("return correct value for Double-byte character", () => {
    expect(stringToPrice("100,０００")).toEqual(100000);
  });
  test("return correct value for Double-byte character", () => {
    expect(stringToPrice("100,０００")).toEqual(100000);
  });
  test("return 0 for invalid character", () => {
    expect(stringToPrice("100,0++")).toEqual(0);
  });
  test("return 0 for negative number", () => {
    expect(stringToPrice("-100,00")).toEqual(0);
  });
});

describe("errCodeToMessage function", () => {
  test("return unknown for error is not AuthError", () => {
    expect(errCodeToMessage({ code: "unknown" })).toEqual({
      en: "An unexpected error occurred. Please try again later.",
      ja: "不明なエラーが発生しました。",
    });
  });
  test("return message for errorCode is invalid-email", () => {
    expect(
      errCodeToMessage({
        code: "auth/invalid-email",
        message: "",
      })
    ).toEqual({
      en: "Invalid email format.",
      ja: "メールアドレス形式が正しくありません。",
    });
  });
  test("return message for errorCode is user-disabled", () => {
    expect(
      errCodeToMessage({
        code: "auth/user-disabled",
        message: "",
      })
    ).toEqual({
      en: "Account not available.",
      ja: "アカウントが無効になっています。",
    });
  });
  test("return message for errorCode is user-not-found", () => {
    expect(
      errCodeToMessage({
        code: "auth/user-not-found",
        message: "",
      })
    ).toEqual({
      en: "Account not found.",
      ja: "アカウントが見つかりませんでした。",
    });
  });
  test("return message for errorCode is wrong-password", () => {
    expect(
      errCodeToMessage({
        code: "auth/wrong-password",
        message: "",
      })
    ).toEqual({
      en: "Wrong password.",
      ja: "パスワードが間違っています。",
    });
  });
  test("return message for errorCode is too-many-requests", () => {
    expect(
      errCodeToMessage({
        code: "auth/too-many-requests",
        message: "",
      })
    ).toEqual({
      en: "too many requests. please try again later.",
      ja: "リクエスト回数が上限に達しました。時間をおいてお試しください。",
    });
  });
  test("return message for errorCode is email-already-in-use", () => {
    expect(
      errCodeToMessage({
        code: "auth/email-already-in-use",
        message: "",
      })
    ).toEqual({
      en: "Sorry, this email address is already in use. Please try signing in or use a different email address to create a new account.",
      ja: "このメールアドレスは既に使用されています。お手数ですが、サインインするか、別のメールアドレスでサインアップして下さい。",
    });
  });
  test("return message for errorCode is weak-password", () => {
    expect(
      errCodeToMessage({
        code: "auth/weak-password",
        message: "",
      })
    ).toEqual({
      en: "Oops, password needs to be between 6 to 20 characters. Please try again with a password that meets this requirement.",
      ja: "パスワードは6から20文字で入力してください。",
    });
  });
  test("return message for errorCode is provider-already-linked", () => {
    expect(
      errCodeToMessage({
        code: "auth/provider-already-linked",
        message: "",
      })
    ).toEqual({
      en: "Sorry, this email address is already in use. Please try signing in or use a different email address to create a new account.",
      ja: "このメールアドレスは既に使用されています。お手数ですが、サインインするか、別のメールアドレスでサインアップして下さい。",
    });
  });
  test("return message for errorCode is invalid-action-code", () => {
    expect(
      errCodeToMessage({
        code: "auth/invalid-action-code",
        message: "",
      })
    ).toEqual({
      en: "Oops, this password reset link is invalid. Please make sure you copied the link correctly or request a new one to reset your password.",
      ja: "無効な再設定リンクです。お手数ですが、正しくリンクをコピーしたか確認するか、パスワード再設定リンクを再度リクエストして下さい。",
    });
  });
  test("return message for errorCode is expired-action-code", () => {
    expect(
      errCodeToMessage({
        code: "auth/expired-action-code",
        message: "",
      })
    ).toEqual({
      en: "Sorry, this password reset link has expired. Please request a new one to reset your password.",
      ja: "パスワード再設定リンクの有効期限が切れています。お手数ですが、パスワード再設定リンクを再度リクエストして下さい。",
    });
  });
});

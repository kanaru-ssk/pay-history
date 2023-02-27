import {
  tabToDocId,
  dateToInputData,
  stringToPrice,
  errCodeToMessage,
} from "./convert";

describe("tabToDocId function", () => {
  beforeAll(() => {
    const mockDate = new Date(2020, 0);
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  test("return 2020-1 for 1", () => {
    expect(tabToDocId(1)).toEqual("2020-1");
  });
});

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
      en: "Unknown error.",
      ja: "不明なエラーが発生しました。",
    });
  });
  test("return message for errorCode is invalid-email", () => {
    expect(
      errCodeToMessage({
        code: "auth/invalid-email",
        message: "Invalid email format.",
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
        message: "User disabled.",
      })
    ).toEqual({
      en: "User disabled.",
      ja: "アカウントが無効になっています。",
    });
  });
  test("return message for errorCode is user-not-found", () => {
    expect(
      errCodeToMessage({
        code: "auth/user-not-found",
        message: "Account not found.",
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
        message: "Wrong password.",
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
        message: "too many requests. please try again later.",
      })
    ).toEqual({
      en: "too many requests. please try again later.",
      ja: "所定の回数以上パスワードを間違えました。時間をおいてお試しください。",
    });
  });
  test("return message for errorCode is email-already-in-use", () => {
    expect(
      errCodeToMessage({
        code: "auth/email-already-in-use",
        message: "Email already in use.",
      })
    ).toEqual({
      en: "This email address is already used.",
      ja: "このメールアドレスは既に使用されています。",
    });
  });
  test("return message for errorCode is weak-password", () => {
    expect(
      errCodeToMessage({
        code: "auth/weak-password",
        message: "Weak password.",
      })
    ).toEqual({
      en: "Weak password.",
      ja: "パスワードが脆弱です。6文字以上で入力してください。",
    });
  });
  test("return message for errorCode is provider-already-linked", () => {
    expect(
      errCodeToMessage({
        code: "auth/provider-already-linked",
        message: "Provider already linked.",
      })
    ).toEqual({
      en: "Provider already linked.",
      ja: "既にサインイン済みです。",
    });
  });
  test("return message for errorCode is invalid-action-code", () => {
    expect(
      errCodeToMessage({
        code: "auth/invalid-action-code",
        message: "Invalid action code.",
      })
    ).toEqual({
      en: "Invalid action code.",
      ja: "無効な再設定リンクです。",
    });
  });
  test("return message for errorCode is expired-action-code", () => {
    expect(
      errCodeToMessage({
        code: "auth/expired-action-code",
        message: "Expired action code.",
      })
    ).toEqual({
      en: "Expired action code.",
      ja: "再設定リンクの有効期限が切れています。",
    });
  });
});

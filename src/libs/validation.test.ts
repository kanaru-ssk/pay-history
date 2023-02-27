import {
  validateEmail,
  validatePassword,
  validateReenterPassword,
} from "./validation";

describe("validateEmail function", () => {
  test("return null for correct email", () => {
    expect(validateEmail("a@a.a")).toEqual(null);
  });
  test("return ENTER_YOUR_EMAIL_ADDRESS for empty", () => {
    expect(validateEmail("")).toEqual({
      en: "Enter your email address.",
      ja: "メールアドレスを入力してください。",
    });
  });
  test("return INVALID_EMAIL for email without at sigh", () => {
    expect(validateEmail("aa.a")).toEqual({
      en: "Invalid email format.",
      ja: "メールアドレス形式が正しくありません。",
    });
  });
  test("return INVALID_EMAIL for email without period in domain name", () => {
    expect(validateEmail("a@a")).toEqual({
      en: "Invalid email format.",
      ja: "メールアドレス形式が正しくありません。",
    });
  });
  test("return INVALID_EMAIL for email without user name", () => {
    expect(validateEmail("@a.a")).toEqual({
      en: "Invalid email format.",
      ja: "メールアドレス形式が正しくありません。",
    });
  });
});

describe("validatePassword function", () => {
  test("return null for correct password", () => {
    expect(validatePassword("aaa000")).toEqual(null);
  });
  test("return ENTER_PASSWORD for empty", () => {
    expect(validatePassword("")).toEqual({
      en: "Enter password.",
      ja: "パスワードを入力して下さい。",
    });
  });
  test("return PASSWORD_CONDITION_01 for password with not alphanumeric", () => {
    expect(validatePassword("aaa_000")).toEqual({
      en: "only alphanumeric characters",
      ja: "半角英数字のみ使用できます。",
    });
  });
  test("return PASSWORD_CONDITION_02 for email less than 6 characters", () => {
    expect(validatePassword("aaa00")).toEqual({
      en: "use 6 to 20 characters",
      ja: "6から20文字で入力してください。",
    });
  });
  test("return PASSWORD_CONDITION_02 for email more than 20 characters", () => {
    expect(validatePassword("aaaaabbbbb01234567890")).toEqual({
      en: "use 6 to 20 characters",
      ja: "6から20文字で入力してください。",
    });
  });
});

describe("validateReenterPassword function", () => {
  test("return null for reenterPassword equal to password", () => {
    expect(validateReenterPassword("aaa000", "aaa000")).toEqual(null);
  });
  test("return NOT_CORRECT_PASSWORD for reenterPassword does not equal to password", () => {
    expect(validateReenterPassword("aaa000", "aaa0000")).toEqual({
      en: "Password did not match.",
      ja: "パスワードが一致しませんでした。",
    });
  });
});

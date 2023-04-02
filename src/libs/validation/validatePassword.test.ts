import { validatePassword } from "./validatePassword";

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
      en: "Only alphanumeric characters",
      ja: "半角英数字のみ使用できます。",
    });
  });
  test("return PASSWORD_CONDITION_02 for email less than 6 characters", () => {
    expect(validatePassword("aaa00")).toEqual({
      en: "Use 6 to 20 characters",
      ja: "6から20文字で入力してください。",
    });
  });
  test("return PASSWORD_CONDITION_02 for email more than 20 characters", () => {
    expect(validatePassword("aaaaabbbbb01234567890")).toEqual({
      en: "Use 6 to 20 characters",
      ja: "6から20文字で入力してください。",
    });
  });
});

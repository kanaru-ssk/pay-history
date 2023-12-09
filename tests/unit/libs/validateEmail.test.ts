import { validateEmail } from "../../../src/libs/validation/validateEmail";

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

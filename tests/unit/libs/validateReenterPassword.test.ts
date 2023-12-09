import { validateReenterPassword } from "../../../src/libs/validation/validateReenterPassword";

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

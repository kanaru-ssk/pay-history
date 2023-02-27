import { displayMonth } from "./displayMonth";

describe("displayMonth function", () => {
  test("return Jan for 1 and en", () => {
    expect(displayMonth(1, "en")).toEqual("Jan");
  });
  test("return 1月 for 1 and ja", () => {
    expect(displayMonth(1, "ja")).toEqual("1月");
  });
});

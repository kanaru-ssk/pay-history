import { stringToPrice } from "../../../src/libs/convert/stringToPrice";

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

import { dateToDocId } from "../../../src/libs/convert/dateToDocId";

describe("dateToDocId function", () => {
  test("return correct value for january", () => {
    expect(dateToDocId(new Date("2023-01"))).toEqual("2023-01");
  });
  test("return correct value for December", () => {
    expect(dateToDocId(new Date("2023-12"))).toEqual("2023-12");
  });
});

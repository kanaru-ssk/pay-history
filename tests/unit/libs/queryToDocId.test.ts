import { dateToDocId } from "../../../src/libs/convert/dateToDocId";
import { queryToDocId } from "../../../src/libs/convert/queryToDocId";

describe("queryToDocId function", () => {
  test("return correct value for undefined", () => {
    expect(queryToDocId(undefined)).toEqual(dateToDocId(new Date()));
  });
  test("return correct value for December", () => {
    expect(queryToDocId(["0", "1"])).toEqual(dateToDocId(new Date()));
  });
  test("return correct value for invalid string", () => {
    expect(queryToDocId("invalid")).toEqual(dateToDocId(new Date()));
  });
  test("return correct value for valid string", () => {
    expect(queryToDocId("2023-01")).toEqual("2023-01");
  });
});

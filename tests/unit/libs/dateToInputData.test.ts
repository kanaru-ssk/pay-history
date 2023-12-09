import { dateToInputData } from "../../../src/libs/convert/dateToInputData";

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

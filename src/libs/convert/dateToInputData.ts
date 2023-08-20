type InputMonthData = {
  value: string;
  min: string;
  max: string;
};

export const dateToInputData = (date: Date): InputMonthData => {
  const dateString = new Date(Number(date) - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const beginningOfMonth = new Date(date).setDate(1);
  const beginningOfMonthString = new Date(
    beginningOfMonth - new Date(beginningOfMonth).getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const now = new Date();
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const maxDate = date.getMonth() == now.getMonth() ? now : endOfMonth;
  const maxDateString = new Date(
    Number(maxDate) - maxDate.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const inputMonthData: InputMonthData = {
    value: dateString,
    min: beginningOfMonthString,
    max: maxDateString,
  };
  return inputMonthData;
};

export type TabState = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const isTabState = (arg: any): arg is TabState => {
  if (
    arg === 1 ||
    arg === 2 ||
    arg === 3 ||
    arg === 4 ||
    arg === 5 ||
    arg === 6 ||
    arg === 7 ||
    arg === 8 ||
    arg === 9 ||
    arg === 10 ||
    arg === 11 ||
    arg === 12
  ) {
    return true;
  }
  return false;
};

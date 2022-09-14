import TabItem from "./TabItem";

import { isTabState } from "types/tabState";

const Tab = () => {
  const tmp = new Date().getMonth() + 1;
  const thisMonth = isTabState(tmp) ? tmp : 1;

  let months = [];
  months.push(
    <TabItem key={thisMonth} text={thisMonth + "月"} month={thisMonth} />
  );
  for (let i = 1; i < 12; i++) {
    const month = 0 < thisMonth - i ? thisMonth - i : 12 + thisMonth - i;
    if (isTabState(month)) {
      months.push(<TabItem key={month} text={month + "月"} month={month} />);
    }
  }

  return (
    <div className="sticky top-12 z-10 flex h-16 flex-row-reverse items-center overflow-x-scroll bg-sub-color px-[50vw] md:top-20">
      {months}
    </div>
  );
};

export default Tab;

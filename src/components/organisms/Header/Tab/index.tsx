import { isTabStatus } from "types/tabStatus";
import TabItem from "./TabItem";

const Tab = () => {
  const tmp = new Date().getMonth() + 1;
  const thisMonth = isTabStatus(tmp) ? tmp : 1;

  let months = [];
  months.push(<TabItem key={thisMonth} month={thisMonth} />);
  for (let i = 1; i < 12; i++) {
    const month = 0 < thisMonth - i ? thisMonth - i : 12 + thisMonth - i;
    if (isTabStatus(month)) {
      months.push(<TabItem key={month} month={month} />);
    }
  }

  return (
    <div className="sticky top-12 z-10 flex h-16 flex-row-reverse items-center overflow-x-scroll bg-gray-200 px-[50vw] md:top-20">
      {months}
    </div>
  );
};

export default Tab;

import { useRouter } from "next/router";

import TabItem from "./TabItem";

const Tab = () => {
  const router = useRouter();

  const { id } = router.query;

  const date = new Date();
  const nowYear = date.getFullYear();
  const thisMonth = date.getMonth() + 1;

  let months = [];
  for (let i = 1; i < 12; i++) {
    const month =
      0 < thisMonth - i
        ? (thisMonth - i).toString()
        : (12 + thisMonth - i).toString();
    const path = nowYear.toString() + "-" + month;
    months.push(
      <TabItem
        text={month + "月"}
        href={"/data/" + path}
        key={i}
        isActive={id === path}
      />
    );
  }

  return (
    <div className="vertical-rl flex w-full flex-col overflow-scroll py-2 pr-[45vw]">
      <TabItem
        text={thisMonth.toString() + "月"}
        href="/"
        isActive={id === undefined}
      />
      {months}
    </div>
  );
};

export default Tab;

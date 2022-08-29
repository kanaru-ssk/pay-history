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
        key={month}
        isActive={id?.[0] === path}
      />
    );
  }

  return (
    <div className="sticky top-12 z-10 flex h-16 flex-row-reverse items-center overflow-x-scroll bg-sub-color px-[40vw] md:top-20">
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

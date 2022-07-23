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
        isActive={id?.[0] === path}
      />
    );
  }

  return (
    <>
      <div className="vertical-rl fixed top-12 left-0 z-20 flex h-16 w-full flex-col items-center overflow-y-hidden overflow-x-scroll bg-sub-color md:top-20">
        <div className="mr-[45vw]">
          <TabItem
            text={thisMonth.toString() + "月"}
            href="/"
            isActive={id === undefined}
          />
        </div>

        {months}
      </div>
      <div className="h-16"></div>
    </>
  );
};

export default Tab;

import TabItem from "./TabItem";

type Props = {
  month: number;
};
const Tab = ({ month }: Props) => {
  let months = [];
  for (let i = 1; i < 12; i++) {
    const _month =
      0 < month - i ? (month - i).toString() : (12 + month - i).toString();
    months.push(
      <TabItem text={_month + "月"} href={"/data/" + _month} key={i} />
    );
  }
  return (
    <div className="vertical-rl flex w-full flex-col overflow-scroll pr-[45vw]">
      <TabItem text={month.toString() + "月"} href="/" />
      {months}
    </div>
  );
};

export default Tab;

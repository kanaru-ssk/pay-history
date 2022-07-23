import type { MonthlyData } from "types/firebase";

type Props = {
  thisMonthData: MonthlyData;
};

const Payments = ({ thisMonthData }: Props) => {
  return (
    <table className="mx-auto mt-8 w-full table-auto">
      <thead className="border-b">
        <tr>
          <th className="pl-8 text-left">支払い日</th>
          <th className="pr-8 text-right">金額</th>
        </tr>
      </thead>
      <tbody>
        {thisMonthData.payments.map((value) => {
          return (
            <tr key={value.atCreated.toString()}>
              <td className="pl-8 text-left">
                {value.atPaied.toDate().getMonth() + 1}日
                {value.atPaied.toDate().getDate()}日
              </td>
              <td className="pr-8 text-right">
                {value.price.toLocaleString()}円
              </td>
            </tr>
          );
        })}
        {thisMonthData.payments.length === 0 && (
          <tr className="text-center text-gray">支払いデータがありません。</tr>
        )}
      </tbody>
    </table>
  );
};

export default Payments;

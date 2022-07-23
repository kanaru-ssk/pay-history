import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import type { MonthlyData } from "types/firebase";

import { useAuth } from "hooks/auth";
import { createMonthlyData, pathToMonth } from "libs/monthlyData";

type Props = {
  setThisMonthData: React.Dispatch<React.SetStateAction<MonthlyData | null>>;
};

const Introduction = ({ setThisMonthData }: Props) => {
  const user = useAuth();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {}, [id, router]);

  const onClickHundler = () => {
    const month = pathToMonth(id);
    if (month) {
      createMonthlyData(user, month[1], month[0], 10000).then((result) => {
        setThisMonthData(result);
      });
    }
  };

  return (
    <main>
      <div className="my-12 text-center">
        <button
          onClick={onClickHundler}
          className="rounded-full bg-main-color py-4 px-12 text-white"
        >
          予算管理を始める
        </button>
      </div>
      <h1>pay history</h1>
      <p>クレジットカードの予算管理、しっかり出来ていますか？</p>
      <p>
        カード明細は反映に時間がかかってしまい、今いくら使ったのか把握するのは難しいですよね。
      </p>
      <p>pay historyを使ってカードの予算管理を簡単にしましょう!</p>
      <h2>使い方</h2>
      <ol className="list-inside list-decimal">
        <li>月の予算を入力する</li>
        <li>カードで支払いしたら金額を入力</li>
        <li>完了!</li>
      </ol>
      <div className="my-12 text-center">
        <button
          onClick={onClickHundler}
          className="rounded-full bg-main-color py-4 px-12 text-white"
        >
          予算管理を始める
        </button>
      </div>
    </main>
  );
};

export default Introduction;

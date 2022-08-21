import Image from "next/image";
import { useRouter } from "next/router";

import { useAuth } from "hooks/auth";
import { createMonthlyData, pathToMonth } from "libs/monthlyData";

const Introduction = () => {
  const { authUser, dbUser } = useAuth();
  const router = useRouter();

  const { id } = router.query;

  const onClickHundler = () => {
    const month = pathToMonth(id?.[0]);
    if (month) {
      createMonthlyData(authUser, month[1], month[0], dbUser?.budget);
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
      <h1>Pay History</h1>
      <p>予算管理ツール「Pay History」</p>
      <p className="mb-4">月の予算管理、しっかりできていますか？</p>
      <p className="mb-4">
        クレジットカード明細は反映まで時間がかかってしまい、月初からいくら使ったのか把握するのは難しいですよね。
      </p>
      <p className="mb-8">
        予算管理ツール「Pay History」なら、月の
        <span className="font-bold text-main-color">予算</span>、
        <span className="font-bold text-main-color">支出額</span>、予算の
        <span className="font-bold text-main-color">残高</span>
        を最もシンプルに管理できます。
      </p>
      <Image
        src="/img/screenshot.png"
        width={992}
        height={1264}
        alt="screenshot"
      />
      <h2>使い方</h2>
      <ol className="list-inside list-decimal">
        <li>月の予算を入力する</li>
        <li>支払いしたらアプリで金額を入力</li>
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

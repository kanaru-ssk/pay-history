import Image from "next/image";

import CtaBtn from "./CtaBtn";

const LandingPage = () => {
  return (
    <div>
      <div className="my-12 text-center">
        <CtaBtn />
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
        <CtaBtn />
      </div>
    </div>
  );
};

export default LandingPage;

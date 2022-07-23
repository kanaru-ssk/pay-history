import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import Manager from "components/Manager";

const Question = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {}, [id]);

  return (
    <>
      <Head>
        {/* <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL + "/data/" + questionSsr?.docId}
        /> */}

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/img/ogp.png"}
        />
        <meta property="og:title" content="pay history" />
        <meta
          property="og:description"
          content="カードの予算管理を簡単にしましょう! カード明細は反映に時間がかかってしまい、今いくら使ったのか把握するのは難しいですよね。pay historyを使えば月の予算とその月に使った金額を簡単に管理できます。"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <title>pay history</title>
        <meta
          name="description"
          content="カードの予算管理を簡単にしましょう! カード明細は反映に時間がかかってしまい、今いくら使ったのか把握するのは難しいですよね。pay historyを使えば月の予算とその月に使った金額を簡単に管理できます。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Manager />
    </>
  );
};

export default Question;

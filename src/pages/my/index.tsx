import Head from "next/head";

import Header from "components/Header";
import My from "components/My";

const MyPage = () => {
  return (
    <>
      <Head>
        <title>マイページ | Pay History</title>
      </Head>

      <Header />
      <main>
        <My />
      </main>
    </>
  );
};

export default MyPage;

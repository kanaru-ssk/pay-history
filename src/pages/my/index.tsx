import Head from "next/head";

import My from "components/pages/My";

const MyPage = () => {
  return (
    <>
      <Head>
        <title>マイページ | Pay History</title>
      </Head>

      <My />
    </>
  );
};

export default MyPage;

import Head from "next/head";

import My from "components/pages/My";

const MyPage = () => {
  return (
    <>
      <Head>
        <title>My Page | Pay History</title>
      </Head>

      <My />
    </>
  );
};

export default MyPage;

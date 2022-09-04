import Head from "next/head";

import ChangePassword from "components/ChangePassword";
import Header from "components/Header";

const ChangePasswordPage = () => {
  return (
    <>
      <Head>
        <title>パスワード変更 | Pay History</title>
      </Head>

      <Header />
      <main>
        <ChangePassword />
      </main>
    </>
  );
};

export default ChangePasswordPage;

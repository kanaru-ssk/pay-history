import Head from "next/head";

import Header from "components/Header";
import ResetPassword from "components/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>パスワード再設定 | Pay History</title>
      </Head>

      <Header />
      <main>
        <ResetPassword />
      </main>
    </>
  );
};

export default ResetPasswordPage;

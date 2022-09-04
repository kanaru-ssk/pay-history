import Head from "next/head";

import Header from "components/Header";
import SetNewPassword from "components/SetNewPassword";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>パスワード再設定 | Pay History</title>
      </Head>

      <Header />
      <main>
        <SetNewPassword />
      </main>
    </>
  );
};

export default ResetPasswordPage;

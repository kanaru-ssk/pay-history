import Head from "next/head";

import ResetPassword from "components/pages/ResetPassword/SendLink";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>パスワード再設定 | Pay History</title>
      </Head>

      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;

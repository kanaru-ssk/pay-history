import Head from "next/head";

import SetNew from "components/pages/ResetPassword/SetNew";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>パスワード再設定 | Pay History</title>
      </Head>

      <SetNew />
    </>
  );
};

export default ResetPasswordPage;

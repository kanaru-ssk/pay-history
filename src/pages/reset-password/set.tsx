import Head from "next/head";

import Set from "components/pages/ResetPassword/Set";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>パスワード再設定 | Pay History</title>
      </Head>

      <Set />
    </>
  );
};

export default ResetPasswordPage;

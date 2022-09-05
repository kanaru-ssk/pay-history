import Head from "next/head";

import ChangePassword from "components/pages/My/ChangePassword";

const ChangePasswordPage = () => {
  return (
    <>
      <Head>
        <title>パスワード変更 | Pay History</title>
      </Head>

      <ChangePassword />
    </>
  );
};

export default ChangePasswordPage;

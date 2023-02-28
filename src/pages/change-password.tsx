import Head from "next/head";

import ChangePassword from "components/pages/ChangePassword";
import { useLocale } from "hooks/locale";

const ChangePasswordPage = () => {
  const { text } = useLocale();
  return (
    <>
      <Head>
        <title>{text.CHANGE_PASSWORD} | Pay History</title>
      </Head>

      <ChangePassword />
    </>
  );
};

export default ChangePasswordPage;

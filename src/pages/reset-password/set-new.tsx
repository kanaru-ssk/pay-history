import Head from "next/head";

import SetNew from "components/pages/ResetPassword/SetNew";
import { useLocale } from "hooks/locale";

const ResetPasswordPage = () => {
  const { text } = useLocale();
  return (
    <>
      <Head>
        <title>{text.RESET_PASSWORD} | Pay History</title>
      </Head>

      <SetNew />
    </>
  );
};

export default ResetPasswordPage;

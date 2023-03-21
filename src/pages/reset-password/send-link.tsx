import Head from "next/head";
import ResetPassword from "components/pages/ResetPassword/SendLink";
import { useLocale } from "hooks/locale";

const ResetPasswordPage = () => {
  const { text } = useLocale();
  return (
    <>
      <Head>
        <title>{text.RESET_PASSWORD} | Pay History</title>
      </Head>

      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;

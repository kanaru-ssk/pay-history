import { useEffect, useState } from "react";
import Heading1 from "@/components/atoms/Heading1";
import Heading3 from "@/components/atoms/Heading3";
import Input from "@/components/atoms/Input";
import LinkText from "@/components/atoms/LinkText";
import ButtonWithStatus from "@/components/molecules/ButtonWithStatus";
import Notification from "@/components/molecules/Notification";
import Head from "@/components/organisms/Head";
import { useLocale } from "@/hooks/useLocale";
import { resetPasswordSendLink } from "@/libs/firebase";
import { validateEmail } from "@/libs/validation";

const SetLink = () => {
  const { locale, text } = useLocale();
  const [email, setEmail] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [noticeMessage, setNoticeMessage] = useState<string>("");

  // validation check
  useEffect(() => {
    setIsReady(validateEmail(email) === null);
  }, [email]);

  // send password reset link
  const submitSendResetPasswordLink = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await resetPasswordSendLink(email);
      setIsLoading(false);
      if (result === null) {
        setNoticeMessage(text.PASSWORD_RESET_LINK_SENT);
      } else {
        setNoticeMessage(locale === "en" ? result.en : result.ja);
        setIsError(result !== null);
      }
    }
  };

  const validationEmail = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const validationResult = validateEmail(e.target.value);
    if (validationResult) {
      setErrorMessageEmail(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessageEmail("");
    }
  };

  return (
    <>
      <Head title={`${text.RESET_PASSWORD} | Pay History`} />
      <div className="px-4">
        <Heading1>{text.RESET_PASSWORD}</Heading1>

        <Notification text={noticeMessage} isError />

        <form onSubmit={submitSendResetPasswordLink}>
          <div className="my-4">
            <Heading3>{text.EMAIL_ADDRESS}</Heading3>
            {errorMessageEmail && (
              <div className="text-red">{errorMessageEmail}</div>
            )}
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validationEmail}
              placeholder={text.EMAIL_ADDRESS_PLACEHOLDER}
            />
          </div>

          <div className="my-8">
            <ButtonWithStatus isReady={isReady} isLoading={isLoading}>
              {noticeMessage === "" ? text.SEND : text.RESEND}
            </ButtonWithStatus>
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text={text.SIGN_IN} href="/signIn" />
        </div>
      </div>
    </>
  );
};

export default SetLink;

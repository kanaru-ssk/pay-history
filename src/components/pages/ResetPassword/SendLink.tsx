import { useEffect, useState } from "react";

import Button from "components/common/Button";
import Header from "components/common/Header";
import Input from "components/common/Input";
import LinkText from "components/common/LinkText";
import Notice from "components/common/Notice";
import { useLocale } from "hooks/locale";
import { resetPasswordSendLink } from "libs/auth";
import { validateEmail } from "libs/validation";

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
      <Header />
      <main>
        <h1>{text.RESET_PASSWORD}</h1>

        <Notice text={noticeMessage} error={isError} />

        <form onSubmit={submitSendResetPasswordLink}>
          <div className="my-4">
            <h3>{text.EMAIL_ADDRESS}</h3>
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
            <Button
              text={noticeMessage === "" ? text.SEND : text.RESEND}
              isReady={isReady}
              isLoading={isLoading}
            />
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text={text.SIGN_IN} href="/signIn" />
        </div>
      </main>
    </>
  );
};

export default SetLink;

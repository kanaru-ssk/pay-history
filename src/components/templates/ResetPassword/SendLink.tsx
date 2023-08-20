import { useEffect, useState, type FocusEvent, type FormEvent } from "react";
import { ButtonWithStatus } from "@/components/ui/button/ButtonWithStatus";
import { Head } from "@/components/ui/contents/Head";
import { Notification } from "@/components/ui/contents/Notification";
import { Input } from "@/components/ui/input/Input";
import { Heading1 } from "@/components/ui/text/Heading1";
import { Heading3 } from "@/components/ui/text/Heading3";
import { LinkText } from "@/components/ui/text/LinkText";
import { useLocale } from "@/hooks/useLocale";
import { resetPasswordSendLink } from "@/libs/firebase";
import { validateEmail } from "@/libs/validation";

export const SendLink = () => {
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
  const submitSendResetPasswordLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await resetPasswordSendLink(email);
      setIsLoading(false);
      if (result === null) {
        setNoticeMessage(text.PASSWORD_RESET_LINK_SENT);
        setIsError(false);
      } else {
        setNoticeMessage(locale === "en" ? result.en : result.ja);
        setIsError(true);
      }
    }
  };

  const validationEmail = (e: FocusEvent<HTMLInputElement, Element>) => {
    const validationResult = validateEmail(e.target.value);
    if (validationResult) {
      setErrorMessageEmail(
        locale === "en" ? validationResult.en : validationResult.ja,
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

        <Notification text={noticeMessage} isError={isError} />

        <form onSubmit={submitSendResetPasswordLink}>
          <div className="my-4">
            <label>
              <Heading3>{text.EMAIL_ADDRESS}</Heading3>
              {errorMessageEmail && (
                <div className="text-red-400">{errorMessageEmail}</div>
              )}
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validationEmail}
                placeholder={text.EMAIL_ADDRESS_PLACEHOLDER}
              />
            </label>
          </div>
          <div className="my-8">
            <ButtonWithStatus isReady={isReady} isLoading={isLoading}>
              {noticeMessage === "" ? text.SEND : text.RESEND}
            </ButtonWithStatus>
          </div>
        </form>
        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text={text.SIGN_IN} href="/signIn" />
          <LinkText text={text.RETURN_TO_HOME} href="/" />
        </div>
      </div>
    </>
  );
};

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Heading1 from "@/components/atoms/Heading1";
import Heading3 from "@/components/atoms/Heading3";
import Input from "@/components/atoms/Input";
import LinkText from "@/components/atoms/LinkText";
import ButtonWithStatus from "@/components/molecules/ButtonWithStatus";
import Notification from "@/components/molecules/Notification";
import Head from "@/components/organisms/Head";
import { useLocale } from "@/hooks/locale";
import { resetPasswordSetNew } from "@/libs/firebase";
import { validatePassword, validateReenterPassword } from "@/libs/validation";

const SetNew = () => {
  const { push } = useRouter();
  const { locale, text } = useLocale();

  const [oobCode, setOobCode] = useState<string>("");
  const [continueUrl, setContinueUrl] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setReenterNewPassword] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessagePassword, setErrorMessageNewPassword] =
    useState<string>("");
  const [errorMessageReenterNewPassword, setErrorMessageReenterNewPassword] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // get GET parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCodeValue = queryParams.get("oobCode") || "";
    const continueUrlValue = queryParams.get("continueUrl") || "";
    setOobCode(oobCodeValue);
    setContinueUrl(continueUrlValue);
  }, []);

  // validation check
  useEffect(() => {
    setIsReady(
      validatePassword(newPassword) === null &&
        validateReenterPassword(newPassword, newPasswordConfirm) === null
    );
  }, [newPassword, newPasswordConfirm]);

  // reset password
  const submitSetNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await resetPasswordSetNew(oobCode, newPassword);

      if (result !== null) {
        setErrorMessage(locale === "en" ? result.en : result.ja);
        setIsLoading(false);
      } else {
        push(continueUrl);
      }
    }
  };

  const validationNewPassword = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const validationResult = validatePassword(e.target.value);
    if (validationResult) {
      setErrorMessageNewPassword(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessageNewPassword("");
    }
  };

  const validationReenterNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReenterNewPassword(e.target.value);
    const validationResult = validateReenterPassword(
      newPassword,
      e.target.value
    );
    if (validationResult) {
      setErrorMessageReenterNewPassword(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessageReenterNewPassword("");
    }
  };

  return (
    <>
      <Head title={`${text.RESET_PASSWORD} | Pay History`} />
      <div className="px-4">
        <Heading1>{text.RESET_PASSWORD}</Heading1>

        <Notification text={errorMessage} isError />

        <form onSubmit={submitSetNewPassword}>
          <div className="my-4">
            <Heading3>{text.NEW_PASSWORD}</Heading3>
            {errorMessagePassword && (
              <div className="text-red">{errorMessagePassword}</div>
            )}
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={validationNewPassword}
              placeholder={text.PASSWORD_PLACEHOLDER}
            />
          </div>

          <div className="my-4">
            <Heading3>{text.REENTER_NEW_PASSWORD}</Heading3>
            {errorMessageReenterNewPassword && (
              <div className="text-red">{errorMessageReenterNewPassword}</div>
            )}
            <Input
              type="password"
              value={newPasswordConfirm}
              onChange={validationReenterNewPassword}
              placeholder={text.PASSWORD_PLACEHOLDER}
            />
          </div>

          <div className="my-8">
            <ButtonWithStatus isReady={isReady} isLoading={isLoading}>
              {text.RESET}
            </ButtonWithStatus>
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText
            text={text.RESEND_RESET_LINK}
            href="/reset-password/send-link"
          />
          <LinkText text="Return To Home" href="/" />
        </div>
      </div>
    </>
  );
};

export default SetNew;

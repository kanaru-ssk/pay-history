import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/common/Button";
import Header from "components/common/Header";
import Input from "components/common/Input";
import LinkText from "components/common/LinkText";
import Notice from "components/common/Notice";
import { useLocale } from "hooks/locale";
import { resetPasswordSetNew } from "libs/auth";
import { validatePassword, validateReenterPassword } from "libs/validation";

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
      <Header />
      <main>
        <h1>{text.RESET_PASSWORD}</h1>

        <Notice text={errorMessage} error />

        <form onSubmit={submitSetNewPassword}>
          <div className="my-4">
            <h3>{text.NEW_PASSWORD}</h3>
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
            <h3>{text.REENTER_NEW_PASSWORD}</h3>
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
            <Button text={text.RESET} isReady={isReady} isLoading={isLoading} />
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText
            text={text.RESEND_RESET_LINK}
            href="/reset-password/send-link"
          />
          <LinkText text="Return To Home" href="/" />
        </div>
      </main>
    </>
  );
};

export default SetNew;

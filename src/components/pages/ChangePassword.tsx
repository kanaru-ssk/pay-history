import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "components/common/Header";
import Input from "components/common/atoms/Input";
import LinkText from "components/common/atoms/LinkText";
import ButtonWithStatus from "components/common/molecules/ButtonWithStatus";
import Notification from "components/common/molecules/Notification";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { changePassword } from "libs/auth";
import { validatePassword, validateReenterPassword } from "libs/validation";

const ChangePassword = () => {
  const { push } = useRouter();
  const { authUser } = useAuth();
  const { locale, text } = useLocale();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [reenterNewPassword, setReenterNewPassword] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState<string>("");
  const [errorMessagePassword, setErrorMessageNewPassword] =
    useState<string>("");
  const [errorMessageReenterNewPassword, setErrorMessageReenterNewPassword] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setIsReady(
      validatePassword(currentPassword) === null &&
        validatePassword(newPassword) === null &&
        validateReenterPassword(newPassword, reenterNewPassword) === null
    );
  }, [currentPassword, newPassword, reenterNewPassword]);

  // change password
  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await changePassword(
        authUser?.email,
        currentPassword,
        newPassword
      );

      if (result !== null) {
        setErrorMessage(locale === "en" ? result.en : result.ja);
        setIsLoading(false);
      } else {
        push("/?changePasswordSuccess=true");
      }
    }
  };

  const validationCurrentPassword = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const validationResult = validatePassword(e.target.value);
    if (validationResult) {
      setErrorCurrentPassword(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorCurrentPassword("");
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
        <h1>{text.CHANGE_PASSWORD}</h1>

        <Notification text={errorMessage} isError />

        <form onSubmit={submitChangePassword}>
          <div className="my-4">
            <h3>{text.CURRENT_PASSWORD}</h3>
            {errorCurrentPassword && (
              <div className="text-red">{errorCurrentPassword}</div>
            )}
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onBlur={validationCurrentPassword}
            />
          </div>

          <div className="my-4">
            <h3>{text.NEW_PASSWORD}</h3>
            <div className="pb-2 leading-5 text-dark-gray">
              {text.ONLY_ALPHANUMERIC_CHARACTERS}
              <br />
              {text.CHARACTERS_6_to_20}
            </div>
            {errorMessagePassword && (
              <div className="text-red">{errorMessagePassword}</div>
            )}
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={validationNewPassword}
            />
          </div>

          <div className="my-4">
            <h3>{text.REENTER_NEW_PASSWORD}</h3>
            {errorMessageReenterNewPassword && (
              <div className="text-red">{errorMessageReenterNewPassword}</div>
            )}
            <Input
              type="password"
              value={reenterNewPassword}
              onChange={validationReenterNewPassword}
            />
          </div>

          <div className="my-8">
            <ButtonWithStatus isReady={isReady} isLoading={isLoading}>
              {text.CHANGE}
            </ButtonWithStatus>
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText
            text={text.FORGET_PASSWORD}
            href="/reset-password/send-link"
          />
          <LinkText text={text.RETURN_TO_HOME} href="/" />
        </div>
      </main>
    </>
  );
};

export default ChangePassword;

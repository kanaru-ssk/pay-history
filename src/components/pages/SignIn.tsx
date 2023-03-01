import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "components/common/Header";
import Input from "components/common/atoms/Input";
import LinkText from "components/common/atoms/LinkText";
import ButtonWithStatus from "components/common/molecules/ButtonWithStatus";
import Notification from "components/common/molecules/Notification";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { signIn } from "libs/auth";
import { validateEmail, validatePassword } from "libs/validation";

const SignIn = () => {
  const { push } = useRouter();
  const { authUser } = useAuth();
  const { locale, text } = useLocale();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // when email authentication is complete, redirect to Home
  useEffect(() => {
    if (!authUser?.isAnonymous) push("/");
  }, [authUser?.isAnonymous, push]);

  // validation check
  useEffect(() => {
    setIsReady(
      validateEmail(email) === null && validatePassword(password) === null
    );
  }, [email, password]);

  // sign in
  const submitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await signIn(email, password);

      if (result !== null) {
        setErrorMessage(locale === "en" ? result.en : result.ja);
        setIsLoading(false);
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

  const validationPassword = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const validationResult = validatePassword(e.target.value);
    if (validationResult) {
      setErrorMessagePassword(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessagePassword("");
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>{text.SIGN_IN}</h1>

        <Notification text={errorMessage} isError />

        <form onSubmit={submitSignIn}>
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

          <div className="my-4">
            <h3>{text.PASSWORD}</h3>
            {errorMessagePassword && (
              <div className="text-red">{errorMessagePassword}</div>
            )}
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validationPassword}
              placeholder={text.PASSWORD_PLACEHOLDER}
            />
          </div>

          <div className="my-8">
            <ButtonWithStatus isReady={isReady} isLoading={isLoading}>
              {text.SIGN_IN}
            </ButtonWithStatus>
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text={text.NEW_REGISTRATION} href="/signUp" />
          <LinkText
            text={text.FORGET_PASSWORD}
            href="/reset-password/send-link"
          />
          <LinkText text="Return To Home" href="/" />
        </div>
      </main>
    </>
  );
};

export default SignIn;

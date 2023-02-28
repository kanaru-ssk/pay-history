import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "components/common/Header";
import Notification from "components/common/Notification";
import Button from "components/common/atoms/Button";
import Input from "components/common/atoms/Input";
import LinkText from "components/common/atoms/LinkText";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { signUp } from "libs/auth";
import { updateUser } from "libs/user";
import {
  validateEmail,
  validatePassword,
  validateReenterPassword,
} from "libs/validation";

const SignUp = () => {
  const { push } = useRouter();
  const { dbUser } = useAuth();
  const { locale, text } = useLocale();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reenterPassword, setReenterPassword] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessagePasswordConfirm, setErrorMessageReenterPassword] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // when email authentication is complete, redirect to Home
  useEffect(() => {
    if (dbUser?.isAnonymous === false) push("/");
  }, [dbUser, push]);

  // validation check
  useEffect(() => {
    setIsReady(
      validateEmail(email) === null &&
        validatePassword(password) === null &&
        validateReenterPassword(password, reenterPassword) === null
    );
  }, [email, password, reenterPassword]);

  // sign up
  const submitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await signUp(email, password);

      if (result === null)
        updateUser(dbUser, { email: email, isAnonymous: false });
      else {
        setIsLoading(false);
        setErrorMessage(locale === "en" ? result.en : result.ja);
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
      setErrorMessageReenterPassword(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessageReenterPassword("");
    }
  };

  const validationReenterPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReenterPassword(e.target.value);
    const validationResult = validateReenterPassword(password, e.target.value);
    if (validationResult) {
      setErrorMessageReenterPassword(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessageReenterPassword("");
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>{text.CREATE_ACCOUNT}</h1>

        <Notification text={errorMessage} isError />

        <form onSubmit={submitSignUp}>
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

          <div className="my-4">
            <h3>{text.REENTER_PASSWORD}</h3>
            {errorMessagePasswordConfirm && (
              <div className="text-red">{errorMessagePasswordConfirm}</div>
            )}
            <Input
              type="password"
              value={reenterPassword}
              onChange={validationReenterPassword}
              placeholder={text.PASSWORD_PLACEHOLDER}
            />
          </div>

          <div className="my-8">
            <Button
              text={text.CREATE_ACCOUNT}
              isReady={isReady}
              isLoading={isLoading}
            />
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text={text.ALREADY_HAVE_AN_ACCOUNT} href="/signIn" />
        </div>
      </main>
    </>
  );
};

export default SignUp;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Heading1 from "components/atoms/Heading1";
import Heading3 from "components/atoms/Heading3";
import Input from "components/atoms/Input";
import LinkText from "components/atoms/LinkText";
import ButtonWithStatus from "components/molecules/ButtonWithStatus";
import Notification from "components/molecules/Notification";
import Head from "components/organisms/Head";
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
      setErrorMessagePassword(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessagePassword("");
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
      <Head title={`${text.SIGN_UP} | Pay History`} />
      <div>
        <Heading1>{text.CREATE_ACCOUNT}</Heading1>

        <Notification text={errorMessage} isError />

        <form onSubmit={submitSignUp}>
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

          <div className="my-4">
            <Heading3>{text.PASSWORD}</Heading3>
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
            <Heading3>{text.REENTER_PASSWORD}</Heading3>
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
            <ButtonWithStatus isReady={isReady} isLoading={isLoading}>
              {text.CREATE_ACCOUNT}
            </ButtonWithStatus>
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text={text.ALREADY_HAVE_AN_ACCOUNT} href="/signIn" />
        </div>
      </div>
    </>
  );
};

export default SignUp;

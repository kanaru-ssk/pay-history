import { useRouter } from "next/router";
import { useEffect, useState, type FocusEvent, type FormEvent } from "react";
import { Heading1 } from "@/components/atoms/Heading1";
import { Heading3 } from "@/components/atoms/Heading3";
import { Input } from "@/components/atoms/Input";
import { LinkText } from "@/components/atoms/LinkText";
import { ButtonWithStatus } from "@/components/molecules/ButtonWithStatus";
import { Notification } from "@/components/molecules/Notification";
import { Head } from "@/components/organisms/Head";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { signIn } from "@/libs/firebase";
import { validateEmail, validatePassword } from "@/libs/validation";

export const SignIn = () => {
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
  const submitSignIn = async (e: FormEvent<HTMLFormElement>) => {
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

  const validationEmail = (e: FocusEvent<HTMLInputElement, Element>) => {
    const validationResult = validateEmail(e.target.value);
    if (validationResult) {
      setErrorMessageEmail(
        locale === "en" ? validationResult.en : validationResult.ja
      );
    } else {
      setErrorMessageEmail("");
    }
  };

  const validationPassword = (e: FocusEvent<HTMLInputElement, Element>) => {
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
      <Head title={`${text.SIGN_IN} | Pay History`} />
      <div className="px-4">
        <Heading1>{text.SIGN_IN}</Heading1>

        <Notification text={errorMessage} isError />

        <form onSubmit={submitSignIn}>
          <div className="my-4">
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
          </div>

          <div className="my-4">
            <Heading3>{text.PASSWORD}</Heading3>
            {errorMessagePassword && (
              <div className="text-red-400">{errorMessagePassword}</div>
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
            <ButtonWithStatus
              type="submit"
              isReady={isReady}
              isLoading={isLoading}
            >
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
          <LinkText text={text.RETURN_TO_HOME} href="/" />
        </div>
      </div>
    </>
  );
};

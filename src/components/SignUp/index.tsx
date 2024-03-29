"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { ButtonWithStatus } from "@/components/ui/button/ButtonWithStatus";
import { Notification } from "@/components/ui/contents/Notification";
import { Input } from "@/components/ui/input/Input";
import { Heading1 } from "@/components/ui/text/Heading1";
import { Heading3 } from "@/components/ui/text/Heading3";
import { LinkText } from "@/components/ui/text/LinkText";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { signUp } from "@/libs/firebase";
import { updateUser } from "@/libs/firebase";
import {
  validateEmail,
  validatePassword,
  validateReenterPassword,
} from "@/libs/validation";

export function SignUp() {
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
        validateReenterPassword(password, reenterPassword) === null,
    );
  }, [email, password, reenterPassword]);

  // sign up
  async function submitSignUp(e: FormEvent<HTMLFormElement>) {
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
  }

  function validationEmail(e: FocusEvent<HTMLInputElement, Element>) {
    const validationResult = validateEmail(e.target.value);
    if (validationResult) {
      setErrorMessageEmail(
        locale === "en" ? validationResult.en : validationResult.ja,
      );
    } else {
      setErrorMessageEmail("");
    }
  }

  function validationPassword(e: FocusEvent<HTMLInputElement, Element>) {
    const validationResult = validatePassword(e.target.value);
    if (validationResult) {
      setErrorMessagePassword(
        locale === "en" ? validationResult.en : validationResult.ja,
      );
    } else {
      setErrorMessagePassword("");
    }
  }

  function validationReenterPassword(e: ChangeEvent<HTMLInputElement>) {
    setReenterPassword(e.target.value);
    const validationResult = validateReenterPassword(password, e.target.value);
    if (validationResult) {
      setErrorMessageReenterPassword(
        locale === "en" ? validationResult.en : validationResult.ja,
      );
    } else {
      setErrorMessageReenterPassword("");
    }
  }

  return (
    <div className="px-4">
      <Heading1>{text.CREATE_ACCOUNT}</Heading1>

      <Notification text={errorMessage} isError />

      <form onSubmit={submitSignUp}>
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
        <div className="my-4">
          <label>
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
          </label>
        </div>
        <div className="my-4">
          <label>
            <Heading3>{text.REENTER_PASSWORD}</Heading3>
            {errorMessagePasswordConfirm && (
              <div className="text-red-400">{errorMessagePasswordConfirm}</div>
            )}
            <Input
              type="password"
              value={reenterPassword}
              onChange={validationReenterPassword}
              placeholder={text.PASSWORD_PLACEHOLDER}
            />
          </label>
        </div>
        <div className="my-8">
          <ButtonWithStatus isReady={isReady} isLoading={isLoading}>
            {text.CREATE_ACCOUNT}
          </ButtonWithStatus>
        </div>
      </form>
      <div className="my-16 flex flex-col items-center gap-4">
        <LinkText text={text.ALREADY_HAVE_AN_ACCOUNT} href="/sign-in" />
        <LinkText text={text.RETURN_TO_HOME} href="/" />
      </div>
    </div>
  );
}

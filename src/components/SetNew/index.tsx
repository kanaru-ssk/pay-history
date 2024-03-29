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
import { useLocale } from "@/hooks/useLocale";
import { resetPasswordSetNew } from "@/libs/firebase";
import { validatePassword, validateReenterPassword } from "@/libs/validation";

export function SetNew() {
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
        validateReenterPassword(newPassword, newPasswordConfirm) === null,
    );
  }, [newPassword, newPasswordConfirm]);

  // reset password
  async function submitSetNewPassword(e: FormEvent<HTMLFormElement>) {
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
  }

  function validationNewPassword(e: FocusEvent<HTMLInputElement, Element>) {
    const validationResult = validatePassword(e.target.value);
    if (validationResult) {
      setErrorMessageNewPassword(
        locale === "en" ? validationResult.en : validationResult.ja,
      );
    } else {
      setErrorMessageNewPassword("");
    }
  }

  function validationReenterNewPassword(e: ChangeEvent<HTMLInputElement>) {
    setReenterNewPassword(e.target.value);
    const validationResult = validateReenterPassword(
      newPassword,
      e.target.value,
    );
    if (validationResult) {
      setErrorMessageReenterNewPassword(
        locale === "en" ? validationResult.en : validationResult.ja,
      );
    } else {
      setErrorMessageReenterNewPassword("");
    }
  }

  return (
    <div className="px-4">
      <Heading1>{text.RESET_PASSWORD}</Heading1>

      <Notification text={errorMessage} isError />

      <form onSubmit={submitSetNewPassword}>
        <div className="my-4">
          <Heading3>{text.NEW_PASSWORD}</Heading3>
          {errorMessagePassword && (
            <div className="text-red-400">{errorMessagePassword}</div>
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
            <div className="text-red-400">{errorMessageReenterNewPassword}</div>
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
        <LinkText text={text.RETURN_TO_HOME} href="/" />
      </div>
    </div>
  );
}

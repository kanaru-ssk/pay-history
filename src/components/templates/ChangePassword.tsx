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
import { Head } from "@/components/ui/contents/Head";
import { Notification } from "@/components/ui/contents/Notification";
import { Input } from "@/components/ui/input/Input";
import { Heading1 } from "@/components/ui/text/Heading1";
import { Heading3 } from "@/components/ui/text/Heading3";
import { LinkText } from "@/components/ui/text/LinkText";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { changePassword } from "@/libs/firebase";
import { validatePassword, validateReenterPassword } from "@/libs/validation";

export function ChangePassword() {
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
        validateReenterPassword(newPassword, reenterNewPassword) === null,
    );
  }, [currentPassword, newPassword, reenterNewPassword]);

  // change password
  const submitChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await changePassword(
        authUser?.email,
        currentPassword,
        newPassword,
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
    e: FocusEvent<HTMLInputElement, Element>,
  ) => {
    const validationResult = validatePassword(e.target.value);
    if (validationResult) {
      setErrorCurrentPassword(
        locale === "en" ? validationResult.en : validationResult.ja,
      );
    } else {
      setErrorCurrentPassword("");
    }
  };

  const validationNewPassword = (e: FocusEvent<HTMLInputElement, Element>) => {
    const validationResult = validatePassword(e.target.value);
    if (validationResult) {
      setErrorMessageNewPassword(
        locale === "en" ? validationResult.en : validationResult.ja,
      );
    } else {
      setErrorMessageNewPassword("");
    }
  };

  const validationReenterNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <>
      <Head title={`${text.CHANGE_PASSWORD} | Pay History`} />
      <div className="px-4">
        <Heading1>{text.CHANGE_PASSWORD}</Heading1>

        <Notification text={errorMessage} isError />

        <form onSubmit={submitChangePassword}>
          <div className="my-4">
            <Heading3>{text.CURRENT_PASSWORD}</Heading3>
            {errorCurrentPassword && (
              <div className="text-red-400">{errorCurrentPassword}</div>
            )}
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onBlur={validationCurrentPassword}
            />
          </div>

          <div className="my-4">
            <Heading3>{text.NEW_PASSWORD}</Heading3>
            <div className="pb-2 leading-5 text-gray-500">
              {text.ONLY_ALPHANUMERIC_CHARACTERS}
              <br />
              {text.CHARACTERS_6_to_20}
            </div>
            {errorMessagePassword && (
              <div className="text-red-400">{errorMessagePassword}</div>
            )}
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={validationNewPassword}
            />
          </div>

          <div className="my-4">
            <Heading3>{text.REENTER_NEW_PASSWORD}</Heading3>
            {errorMessageReenterNewPassword && (
              <div className="text-red-400">
                {errorMessageReenterNewPassword}
              </div>
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
      </div>
    </>
  );
}

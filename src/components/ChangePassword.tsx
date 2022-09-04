import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import LinkText from "components/LinkText";
import { useAuth } from "hooks/auth";
import {
  changePassword,
  validatePassword,
  validatePasswordConfirm,
} from "libs/auth";

const ChangePassword = () => {
  const { push } = useRouter();

  const { authUser } = useAuth();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOldPassword, setErrorOldPassword] = useState<string>("");
  const [errorMessagePassword, setErrorMessageNewPassword] =
    useState<string>("");
  const [errorMessageNewPasswordConfirm, setErrorMessageNewPasswordConfirm] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    validatePassword(oldPassword) === "" &&
    validatePassword(newPassword) === "" &&
    validatePasswordConfirm(newPassword, newPasswordConfirm) === ""
      ? setIsReady(true)
      : setIsReady(false);
  }, [oldPassword, newPassword, newPasswordConfirm]);

  const onSubmitHundler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isReady) {
      setIsLoading(true);

      const result = await changePassword(
        authUser?.email,
        oldPassword,
        newPassword
      );
      setErrorMessage(result);
      if (result !== "") {
        setIsLoading(false);
      } else {
        push("/my?changepass=true");
      }
    }
  };

  return (
    <div>
      <h1>パスワード変更</h1>

      {errorMessage && (
        <div className="rounded border border-red bg-light-red p-4 text-red">
          {errorMessage}
        </div>
      )}

      <form onSubmit={onSubmitHundler}>
        <div className="my-4">
          <h3>現在のパスワード</h3>
          {errorOldPassword && (
            <div className="text-red">{errorOldPassword}</div>
          )}
          <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            onBlur={(e) => {
              setErrorOldPassword(validatePassword(e.target.value));
            }}
            placeholder="現在のパスワードを入力"
          />
        </div>

        <div className="my-4">
          <h3>新しいパスワードを入力</h3>
          {errorMessagePassword && (
            <div className="text-red">{errorMessagePassword}</div>
          )}
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={(e) =>
              setErrorMessageNewPassword(validatePassword(e.target.value))
            }
            placeholder="新しいパスワードを入力"
          />
        </div>

        <div className="my-4">
          <h3>新しいパスワードを再入力</h3>
          {errorMessageNewPasswordConfirm && (
            <div className="text-red">{errorMessageNewPasswordConfirm}</div>
          )}
          <Input
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => {
              setNewPasswordConfirm(e.target.value);
              setErrorMessageNewPasswordConfirm(
                validatePasswordConfirm(newPassword, e.target.value)
              );
            }}
            placeholder="新しいパスワードを再入力"
          />
        </div>

        <div className="my-8">
          <Button text="変更" isReady={isReady} isLoading={isLoading} />
        </div>
      </form>

      <div className="my-16 flex flex-col items-center gap-4">
        <LinkText
          text="パスワードをお忘れの場合はこちら"
          href="/reset-password"
        />
        <LinkText text="マイページへ" href="/my" />
      </div>
    </div>
  );
};

export default ChangePassword;

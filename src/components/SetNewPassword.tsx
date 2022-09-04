import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import LinkText from "components/LinkText";
import Notice from "components/Notice";
import { resetPassword } from "libs/auth";
import { validatePassword, validatePasswordConfirm } from "libs/validation";

const SetNewPassword = () => {
  const { push } = useRouter();

  const [oobCode, setOobCode] = useState<string>("");
  const [continueUrl, setContinueUrl] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessagePassword, setErrorMessageNewPassword] =
    useState<string>("");
  const [errorMessageNewPasswordConfirm, setErrorMessageNewPasswordConfirm] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // getパラメータ取得
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCodeValue = queryParams.get("oobCode") || "";
    const continueUrlValue = queryParams.get("continueUrl") || "";
    setOobCode(oobCodeValue);
    setContinueUrl(continueUrlValue);
  }, []);

  // validation通過チェック
  useEffect(() => {
    setIsReady(
      validatePassword(newPassword) === "" &&
        validatePasswordConfirm(newPassword, newPasswordConfirm) === ""
    );
  }, [newPassword, newPasswordConfirm]);

  // パスワード再設定
  const submitSetNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await resetPassword(oobCode, newPassword);
      setErrorMessage(result);
      if (result !== "") {
        setIsLoading(false);
      } else {
        push(continueUrl);
      }
    }
  };

  return (
    <div>
      <h1>パスワード再設定</h1>

      <Notice text={errorMessage} error />

      <form onSubmit={submitSetNewPassword}>
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
          <Button text="再設定" isReady={isReady} isLoading={isLoading} />
        </div>
      </form>

      <div className="my-16 flex flex-col items-center gap-4">
        <LinkText text="再設定リンクをもう一度送信" href="/reset-password" />
        <LinkText text="ホームへ" href="/my" />
      </div>
    </div>
  );
};

export default SetNewPassword;

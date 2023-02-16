import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/common/Button";
import Header from "components/common/Header";
import Input from "components/common/Input";
import LinkText from "components/common/LinkText";
import Notice from "components/common/Notice";
import { resetPasswordSetNew } from "libs/auth";
import { validatePassword, validatePasswordConfirm } from "libs/validation";

const SetNew = () => {
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
      validatePassword(newPassword) === "" &&
        validatePasswordConfirm(newPassword, newPasswordConfirm) === ""
    );
  }, [newPassword, newPasswordConfirm]);

  // reset password
  const submitSetNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await resetPasswordSetNew(oobCode, newPassword);
      setErrorMessage(result);
      if (result !== "") {
        setIsLoading(false);
      } else {
        push(continueUrl);
      }
    }
  };

  return (
    <>
      <Header />
      <main>
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
          <LinkText
            text="再設定リンクをもう一度送信"
            href="/reset-password/send-link"
          />
          <LinkText text="ホームへ" href="/my" />
        </div>
      </main>
    </>
  );
};

export default SetNew;

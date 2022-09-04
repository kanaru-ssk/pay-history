import { useEffect, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import LinkText from "components/LinkText";
import Notice from "components/Notice";
import { sendResetPasswordLink, validateEmail } from "libs/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [noticeMessage, setNoticeMessage] = useState<string>("");

  useEffect(() => {
    validateEmail(email) === "" ? setIsReady(true) : setIsReady(false);
  }, [email]);

  const onSubmitHundler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isReady) {
      setIsLoading(true);

      const result = await sendResetPasswordLink(email);
      setNoticeMessage(result);
      setIsLoading(false);
      setIsError(result !== "");
      if (result === "") setNoticeMessage("再設定リンクを送信しました。");
    }
  };

  return (
    <div>
      <h1>パスワード再設定</h1>

      <Notice text={noticeMessage} error={isError} />

      <form onSubmit={onSubmitHundler}>
        <div className="my-4">
          <h3>メールアドレス</h3>
          {errorMessageEmail && (
            <div className="text-red">{errorMessageEmail}</div>
          )}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => {
              setErrorMessageEmail(validateEmail(e.target.value));
            }}
            placeholder="メールアドレスを入力"
          />
        </div>

        <div className="my-8">
          <Button
            text={noticeMessage === "" ? "送信" : "再送信"}
            isReady={isReady}
            isLoading={isLoading}
          />
        </div>
      </form>

      <div className="my-16 flex flex-col items-center gap-4">
        <LinkText text="サインイン" href="/signin" />
      </div>
    </div>
  );
};

export default ResetPassword;

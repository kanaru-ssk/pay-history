import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import LinkText from "components/LinkText";
import { resetPassword, validateEmail } from "libs/auth";

const ResetPassword = () => {
  const { push } = useRouter();

  const [email, setEmail] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    validateEmail(email) === "" ? setIsReady(true) : setIsReady(false);
  }, [email]);

  const onSubmitHundler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isReady) {
      setIsLoading(true);

      const result = await resetPassword(email);
      setErrorMessage(result);
      if (result !== "") {
        setIsLoading(false);
      } else {
        push("/reset-password/complete");
      }
    }
  };

  return (
    <div>
      <h1>パスワード再設定</h1>

      {errorMessage && (
        <div className="rounded border border-red bg-light-red p-4 text-red">
          {errorMessage}
        </div>
      )}

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
          <Button text="送信" isReady={isReady} isLoading={isLoading} />
        </div>
      </form>

      <div className="my-16 flex flex-col items-center gap-4">
        <LinkText text="サインイン" href="/signin" />
      </div>
    </div>
  );
};

export default ResetPassword;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import LinkText from "components/LinkText";
import Notice from "components/Notice";
import { useAuth } from "hooks/auth";
import { signIn, validateEmail, validatePassword } from "libs/auth";

const Signin = () => {
  const { push } = useRouter();
  const { authUser } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!authUser?.isAnonymous) push("/my");
  }, [authUser?.isAnonymous, push]);

  useEffect(() => {
    validateEmail(email) === "" && validatePassword(password) === ""
      ? setIsReady(true)
      : setIsReady(false);
  }, [email, password]);

  const onSubmitHundler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isReady) {
      setIsLoading(true);
      const result = await signIn(email, password);
      setErrorMessage(result);
      if (result !== "") setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>サインイン</h1>

      <Notice text={errorMessage} error />

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

        <div className="my-4">
          <h3>パスワードを入力</h3>
          {errorMessagePassword && (
            <div className="text-red">{errorMessagePassword}</div>
          )}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => {
              setErrorMessagePassword(validatePassword(e.target.value));
            }}
            placeholder="パスワードを入力"
          />
        </div>

        <div className="my-8">
          <Button text="サインイン" isReady={isReady} isLoading={isLoading} />
        </div>
      </form>

      <div className="my-16 flex flex-col items-center gap-4">
        <LinkText text="新規登録はこちら" href="/signup" />
        <LinkText
          text="パスワードをお忘れの場合はこちら"
          href="/reset-password"
        />
        <LinkText text="ホームへ戻る" href="/" />
      </div>
    </div>
  );
};

export default Signin;
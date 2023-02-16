import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/common/Button";
import Header from "components/common/Header";
import Input from "components/common/Input";
import LinkText from "components/common/LinkText";
import Notice from "components/common/Notice";
import { useAuth } from "hooks/auth";
import { signUp } from "libs/auth";
import { updateUser } from "libs/user";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "libs/validation";

const Signup = () => {
  const { push } = useRouter();
  const { dbUser } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessagePasswordConfirm, setErrorMessagePasswordConfirm] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // when email authentication is complete, redirect to My Page
  useEffect(() => {
    if (dbUser?.isAnonymous === false) push("/my");
  }, [dbUser, push]);

  // validation check
  useEffect(() => {
    setIsReady(
      validateEmail(email) === "" &&
        validatePassword(password) === "" &&
        validatePasswordConfirm(password, passwordConfirm) === ""
    );
  }, [email, password, passwordConfirm]);

  // sign up
  const submitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady) {
      setIsLoading(true);
      const result = await signUp(email, password);
      setErrorMessage(result);
      if (result === "")
        updateUser(dbUser, { email: email, isAnonymous: false });
      else setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>アカウント作成</h1>

        <Notice text={errorMessage} error />

        <form onSubmit={submitSignUp}>
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
              onBlur={(e) =>
                setErrorMessagePassword(validatePassword(e.target.value))
              }
              placeholder="パスワードを入力"
            />
          </div>

          <div className="my-4">
            <h3>パスワードを再入力</h3>
            {errorMessagePasswordConfirm && (
              <div className="text-red">{errorMessagePasswordConfirm}</div>
            )}
            <Input
              type="password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setErrorMessagePasswordConfirm(
                  validatePasswordConfirm(password, e.target.value)
                );
              }}
              placeholder="パスワードを再入力"
            />
          </div>

          <div className="my-8">
            <Button
              text="アカウント作成"
              isReady={isReady}
              isLoading={isLoading}
            />
          </div>
        </form>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text="アカウントをお持ちの場合はこちら" href="/signin" />
        </div>
      </main>
    </>
  );
};

export default Signup;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/common/Button";
import Header from "components/common/Header";
import LinkText from "components/common/LinkText";
import Notice from "components/common/Notice";
import { useAuth } from "hooks/auth";
import { signOut } from "libs/auth";

const My = () => {
  const { query, push } = useRouter();
  const { changepass } = query;
  const { authUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // when anonymous authentication, redirect to SignIn Page
  useEffect(() => {
    if (authUser?.isAnonymous) push("/signin");
  }, [authUser?.isAnonymous, push]);

  // sign out
  const clickSignOut = () => {
    signOut();
    setIsLoading(true);
  };

  return (
    <>
      <Header />
      <main>
        <h1>マイページ</h1>

        <Notice text={changepass ? "パスワードを変更しました。" : ""} />

        <div className="my-4">
          <h3>メールアドレス</h3>
          <div>{authUser?.email}</div>
        </div>

        <div className="flex gap-2">
          <Button
            text="パスワード変更"
            onClick={() => push("/my/change-password")}
          />
          <Button
            text="サインアウト"
            onClick={clickSignOut}
            isLoading={isLoading}
            red
          />
        </div>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text="ホームへ戻る" href="/" />
        </div>
      </main>
    </>
  );
};

export default My;

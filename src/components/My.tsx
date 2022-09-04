import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/Button";
import LinkText from "components/LinkText";
import Notice from "components/Notice";
import { useAuth } from "hooks/auth";
import { signOut } from "libs/auth";

const My = () => {
  const { query, push } = useRouter();
  const { changepass } = query;
  const { authUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 匿名認証の時、サインインページに遷移
  useEffect(() => {
    if (authUser?.isAnonymous) push("/signin");
  }, [authUser?.isAnonymous, push]);

  // サインアウト
  const clickSignOut = () => {
    signOut();
    setIsLoading(true);
  };

  return (
    <div>
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
    </div>
  );
};

export default My;

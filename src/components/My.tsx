import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/Button";
import LinkText from "components/LinkText";
import { useAuth } from "hooks/auth";
import { signout } from "libs/auth";

const My = () => {
  const { query, push } = useRouter();
  const { changepass } = query;
  const { authUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (authUser?.isAnonymous) push("/signin");
  }, [authUser?.isAnonymous, push]);

  const onSignOut = () => {
    signout();
    setIsLoading(true);
  };

  return (
    <div>
      <h1>マイページ</h1>

      {changepass && (
        <div className="rounded border border-main-color bg-light-gray p-4 text-main-color">
          {changepass && "パスワードを変更しました。"}
        </div>
      )}

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
          onClick={onSignOut}
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

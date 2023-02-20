import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "components/common/Button";
import Header from "components/common/Header";
import LinkText from "components/common/LinkText";
import Notice from "components/common/Notice";
import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { signOut } from "libs/auth";

const My = () => {
  const { query, push } = useRouter();
  const { changePasswordSuccess } = query;
  const { authUser } = useAuth();
  const { text } = useLocale();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // when anonymous authentication, redirect to SignIn Page
  useEffect(() => {
    if (authUser?.isAnonymous) push("/signIn");
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
        <h1>My Page</h1>

        <Notice text={changePasswordSuccess ? text.PASSWORD_CHANGED : ""} />

        <div className="my-4">
          <h3>{text.MAIL_ADDRESS}</h3>
          <div>{authUser?.email}</div>
        </div>

        <div className="flex gap-2">
          <Button
            text={text.CHANGE_PASSWORD}
            onClick={() => push("/my/change-password")}
          />
          <Button
            text={text.SIGN_OUT}
            onClick={clickSignOut}
            isLoading={isLoading}
            red
          />
        </div>

        <div className="my-16 flex flex-col items-center gap-4">
          <LinkText text="Return To Home" href="/" />
        </div>
      </main>
    </>
  );
};

export default My;

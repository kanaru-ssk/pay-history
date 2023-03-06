import Link from "next/link";

import MenuItem from "./MenuItem";

import { useAuth } from "hooks/auth";
import { useLocale } from "hooks/locale";
import { signOut } from "libs/auth";

type Props = {
  onClick: () => void;
};

const SignedInMenu = ({ onClick }: Props) => {
  const { authUser } = useAuth();
  const { text } = useLocale();

  // sign out
  const clickSignOut = () => {
    signOut();
    onClick();
  };

  return (
    <div>
      <div>{authUser?.email}</div>

      <MenuItem>
        <Link href="/change-password">
          <a onClick={onClick}>{text.CHANGE_PASSWORD}</a>
        </Link>
      </MenuItem>

      <MenuItem>
        <button onClick={clickSignOut} className="text-red">
          {text.SIGN_OUT}
        </button>
      </MenuItem>
    </div>
  );
};

export default SignedInMenu;

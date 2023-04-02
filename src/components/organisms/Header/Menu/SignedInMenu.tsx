import Link from "next/link";
import { MenuItem } from "./MenuItem";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { signOut } from "@/libs/firebase";

type Props = {
  onClick: () => void;
};

export const SignedInMenu = ({ onClick }: Props) => {
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
        <Link href="/change-password" onClick={onClick}>
          {text.CHANGE_PASSWORD}
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

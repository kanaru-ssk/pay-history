import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { signOut } from "@/libs/firebase";
import { LanguageMenu } from "./LanguageMenu";
import { MenuItem } from "./MenuItem";

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
    <div className="p-8">
      <div>{authUser?.email}</div>
      <MenuItem>
        <Link href="/change-password" onClick={onClick}>
          {text.CHANGE_PASSWORD}
        </Link>
      </MenuItem>
      <MenuItem>
        <button onClick={clickSignOut} className="text-red-400">
          {text.SIGN_OUT}
        </button>
      </MenuItem>
      <div className="mt-8">
        <LanguageMenu />
      </div>
    </div>
  );
};

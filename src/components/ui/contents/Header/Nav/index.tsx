import { SettingIcon } from "@/components/ui/icon/SettingIcon";
import { useAuth } from "@/hooks/useAuth";
import { useSlideIn } from "@/hooks/useSlideIn";
import { AnonymousMenu } from "./AnonymousMenu";
import { SignedInMenu } from "./SignedInMenu";

export const Nav = () => {
  const { setSlideInContents } = useSlideIn();
  const { authUser } = useAuth();

  if (!authUser) return null;
  const onClickHandler = () => {
    if (!authUser || authUser.isAnonymous)
      setSlideInContents(
        <AnonymousMenu onClick={() => setSlideInContents(null)} />,
      );
    else
      setSlideInContents(
        <SignedInMenu onClick={() => setSlideInContents(null)} />,
      );
  };

  return (
    <button
      name="menu-open"
      aria-label="menu-open"
      onClick={onClickHandler}
      className="px-4"
    >
      <SettingIcon />
    </button>
  );
};

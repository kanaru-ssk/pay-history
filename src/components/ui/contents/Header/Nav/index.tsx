import { AnonymousMenu } from "./AnonymousMenu";
import { SignedInMenu } from "./SignedInMenu";
import { SettingIcon } from "@/components/ui/icon/SettingIcon";
import { useAuth } from "@/hooks/useAuth";
import { useSlideIn } from "@/hooks/useSlideIn";

export const Nav = () => {
  const { setSlideInContents } = useSlideIn();
  const { authUser } = useAuth();
  const onClickHandler = () => {
    if (authUser?.isAnonymous)
      setSlideInContents(
        <AnonymousMenu onClick={() => setSlideInContents(null)} />
      );
    else
      setSlideInContents(
        <SignedInMenu onClick={() => setSlideInContents(null)} />
      );
  };

  return (
    <button onClick={onClickHandler} className="px-4">
      <SettingIcon />
    </button>
  );
};

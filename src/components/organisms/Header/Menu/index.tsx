import { type Dispatch, type SetStateAction } from "react";
import { AnonymousMenu } from "./AnonymousMenu";
import { LanguageMenu } from "./LanguageMenu";
import { SignedInMenu } from "./SignedInMenu";
import { SlideIn } from "@/components/molecules/SlideIn";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const Menu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const { authUser } = useAuth();

  return (
    <SlideIn isShown={isMenuOpen} onHide={() => setIsMenuOpen(false)}>
      <div className="m-8">
        {authUser?.isAnonymous ? (
          <AnonymousMenu onClick={() => setIsMenuOpen(false)} />
        ) : (
          <SignedInMenu onClick={() => setIsMenuOpen(false)} />
        )}
        <div className="mt-8">
          <LanguageMenu />
        </div>
      </div>
    </SlideIn>
  );
};

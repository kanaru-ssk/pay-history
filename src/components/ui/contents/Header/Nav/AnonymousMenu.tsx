import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { LanguageMenu } from "./LanguageMenu";

type Props = {
  onClick: () => void;
};

export function AnonymousMenu({ onClick }: Props) {
  const { text } = useLocale();
  return (
    <div className="p-8">
      <Link href="/sign-up" onClick={onClick} className="font-bold">
        {text.SIGN_UP}
      </Link>
      <span className="mx-4">/</span>
      <Link href="/sign-in" onClick={onClick} className="font-bold">
        {text.SIGN_IN}
      </Link>
      <div className="mt-8">
        <LanguageMenu />
      </div>
    </div>
  );
}

import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

type Props = {
  onClick: () => void;
};

export const AnonymousMenu = ({ onClick }: Props) => {
  const { text } = useLocale();
  return (
    <div>
      <Link href="/signUp" onClick={onClick} className="font-bold">
        {text.SIGN_UP}
      </Link>
      <span className="mx-4">/</span>
      <Link href="/signIn" onClick={onClick} className="font-bold">
        {text.SIGN_IN}
      </Link>
    </div>
  );
};

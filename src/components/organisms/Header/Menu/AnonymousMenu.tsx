import Link from "next/link";

type Props = {
  onClick: () => void;
};

const AnonymousMenu = ({ onClick }: Props) => {
  return (
    <div>
      <Link href="/signUp" onClick={onClick} className="font-bold">
        Sign Up
      </Link>
      <span className="mx-4">/</span>
      <Link href="/signIn" onClick={onClick} className="font-bold">
        Sign In
      </Link>
    </div>
  );
};

export default AnonymousMenu;

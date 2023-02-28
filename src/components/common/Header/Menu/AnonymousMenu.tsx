import Link from "next/link";

type Props = {
  onClick: () => void;
};

const AnonymousMenu = ({ onClick }: Props) => {
  return (
    <div>
      <Link href="/signUp">
        <a onClick={onClick} className="font-bold">
          Sign Up
        </a>
      </Link>
      <span className="mx-4">/</span>
      <Link href="/signIn">
        <a onClick={onClick} className="font-bold">
          Sign In
        </a>
      </Link>
    </div>
  );
};

export default AnonymousMenu;

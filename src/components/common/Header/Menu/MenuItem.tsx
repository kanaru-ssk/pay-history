import Link from "next/link";

type Props = {
  text: string;
  href: string;
  onClick: () => void;
};
const MenuItem = ({ text, href, onClick }: Props) => {
  return (
    <div className="mt-4 flex h-8 items-center justify-center font-bold">
      <Link href={href}>
        <a onClick={onClick}>{text}</a>
      </Link>
    </div>
  );
};
export default MenuItem;

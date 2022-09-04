import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const LinkText = ({ text, href }: Props) => {
  return (
    <Link href={href}>
      <a className="text-main-color underline hover:text-gray">{text}</a>
    </Link>
  );
};

export default LinkText;

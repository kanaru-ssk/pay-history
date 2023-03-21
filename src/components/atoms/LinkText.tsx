import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const LinkText = ({ text, href }: Props) => {
  return (
    <Link href={href} className="text-main-color underline hover:text-gray">
      {text}
    </Link>
  );
};

export default LinkText;

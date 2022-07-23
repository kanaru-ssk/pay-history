import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const TabItem = ({ text, href }: Props) => {
  return (
    <Link href={href}>
      <a>
        <div className="horizontal-rl w-12 py-2 text-center">{text}</div>
      </a>
    </Link>
  );
};

export default TabItem;

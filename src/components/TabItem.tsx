import Link from "next/link";

type Props = {
  text: string;
  href: string;
  isActive: boolean;
};

const TabItem = ({ text, href, isActive }: Props) => {
  return (
    <Link href={href}>
      <a>
        <div
          className={
            (isActive ? "font-bold" : "") +
            " horizontal-rl mx-2 w-12 py-2 text-center"
          }
        >
          {text}
        </div>
      </a>
    </Link>
  );
};

export default TabItem;

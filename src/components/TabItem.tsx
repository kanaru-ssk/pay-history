import Link from "next/link";

type Props = {
  text: string;
  href: string;
  isActive: boolean;
};

const TabItem = ({ text, href, isActive }: Props) => {
  return (
    <Link href={href}>
      <a className="relative mx-2 block h-12 w-12 shrink-0 py-2">
        <div
          className={
            (isActive ? "font-bold" : "") + "  horizontal-rl text-center"
          }
        >
          {text}
        </div>
      </a>
    </Link>
  );
};

export default TabItem;

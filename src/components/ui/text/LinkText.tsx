import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

export function LinkText({ text, href }: Props) {
  return (
    <Link href={href} className="text-black underline hover:text-gray-400">
      {text}
    </Link>
  );
}

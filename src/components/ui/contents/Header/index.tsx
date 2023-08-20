import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-white dark:bg-gray-950 md:h-20 md:px-16">
      <Link href="/" aria-label="go to top page" className="px-4">
        <Image
          src="/logo.svg"
          alt="logo"
          width={41}
          height={14}
          className="h-6 w-auto text-white md:h-10"
        />
      </Link>
      <Nav />
    </header>
  );
};

import Link from "next/link";
import { Logo } from "./Logo.tsx";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between bg-white dark:bg-gray-950 md:h-20 md:px-16">
      <Link href="/" aria-label="go to top page" className="px-4">
        <Logo />
      </Link>
      <Nav />
    </header>
  );
}

import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

export function CtaBtn() {
  const { text } = useLocale();

  return (
    <Link href="/" data-cy="cta">
      <div className="rounded-full bg-black py-2 text-center font-bold text-white dark:bg-gray-200 dark:text-black">
        {text.START_BUDGETING}
      </div>
    </Link>
  );
}

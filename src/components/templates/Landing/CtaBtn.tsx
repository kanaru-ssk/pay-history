import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

export function CtaBtn() {
  const { text } = useLocale();

  return (
    <Link href="/" data-cy="cta">
      <div className="rounded-full bg-black py-2 text-center text-white">
        {text.START_BUDGETING}
      </div>
    </Link>
  );
}

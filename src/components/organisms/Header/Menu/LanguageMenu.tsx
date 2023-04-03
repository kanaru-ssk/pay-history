import Link from "next/link";
import { LanguageIcon } from "@/components/atoms/icons/LanguageIcon";
import { languages } from "@/constants/languages";
import { useLocale } from "@/hooks/useLocale";

export const LanguageMenu = () => {
  const { locale } = useLocale();
  return (
    <details className="w-48 rounded border border-gray-400 px-8">
      <summary className="cursor-pointer p-1 font-bold">
        <span className="mx-1 mb-1">
          <LanguageIcon />
        </span>
        {languages.find((language) => language.locale === locale)?.name}
      </summary>
      <div className="mt-2">
        {languages.map((language) => {
          return (
            <Link
              href="/"
              locale={language.locale}
              passHref
              key={language.locale}
            >
              <div className="m-1 text-center">{language.name}</div>
            </Link>
          );
        })}
      </div>
    </details>
  );
};

import Link from "next/link";

import LanguageIcon from "components/atoms/icons/LanguageIcon";
import { languages } from "constants/languages";
import { useLocale } from "hooks/locale";

const LanguageMenu = () => {
  const { locale } = useLocale();
  return (
    <details className="border rounded-lg border-gray px-8 w-48">
      <summary className="font-bold p-1 cursor-pointer">
        <span className="mx-1">
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
              <a>
                <div className="m-1 text-center">{language.name}</div>
              </a>
            </Link>
          );
        })}
      </div>
    </details>
  );
};

export default LanguageMenu;

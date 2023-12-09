import { LanguageIcon } from "@/components/ui/icon/LanguageIcon";
import { languages } from "@/constants/languages";
import { useLocale } from "@/hooks/useLocale";

export const LanguageMenu = () => {
  const { locale, setLocale } = useLocale();

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
            <button
              key={language.locale}
              onClick={() => setLocale(language.locale)}
              className="m-1 block text-center"
            >
              {language.name}
            </button>
          );
        })}
      </div>
    </details>
  );
};

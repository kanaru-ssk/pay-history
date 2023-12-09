export const languages = [
  { locale: "en", name: "English" },
  { locale: "ja", name: "日本語" },
] as const;

export const locales = languages.map((lang) => lang.locale);

export const defaultLocale = "en";

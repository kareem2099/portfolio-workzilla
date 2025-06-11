export const validLocales = ['en', 'ru', 'ar'] as const;
export type ValidLocale = typeof validLocales[number];

export function isValidLocale(locale: string): locale is ValidLocale {
  return validLocales.includes(locale as ValidLocale);
}

export function getValidLocale(locale: string): ValidLocale {
  return isValidLocale(locale) ? locale : 'en';
}

export type PageProps = {
  locale: ValidLocale;
};

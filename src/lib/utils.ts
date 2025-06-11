import enTranslations from '@/translations/en.json';
import ruTranslations from '@/translations/ru.json';
import arTranslations from '@/translations/ar.json';

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

type Translations = {
  [locale: string]: TranslationObject;
};

const translations: Translations = {
  en: enTranslations,
  ru: ruTranslations,
  ar: arTranslations
};

export function t(key: string, locale: string = 'en'): string {
  const keys = key.split('.');
  let current: string | TranslationObject = translations[locale] || translations.en;
  
  for (const k of keys) {
    if (typeof current === 'string') {
      break;
    }
    current = current[k];
    if (current === undefined) {
      return key; // Return the key if translation not found
    }
  }
  
  return typeof current === 'string' ? current : key;
}

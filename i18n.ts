import { getRequestConfig } from 'next-intl/server';

// Statically import all message files
import enMessages from './src/translations/en.json';
import ruMessages from './src/translations/ru.json';
import arMessages from './src/translations/ar.json';

const allMessages = {
  en: enMessages,
  ru: ruMessages,
  ar: arMessages,
};

export default getRequestConfig(async ({ locale }) => {
  const baseLocale = locale ?? 'en'; // Fallback to 'en' if undefined
  return {
    locale: baseLocale,
    messages: allMessages[baseLocale as keyof typeof allMessages]
  };
});

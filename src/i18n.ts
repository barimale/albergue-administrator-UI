import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const maini18n = i18next.createInstance();

maini18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'translation',
    preload:  ['en', 'pt', 'nl', 'de'],
    fallbackLng: ['en', 'pt', 'nl', 'de'],
    supportedLngs: ['en', 'pt', 'nl', 'de'],
    debug: true,
    backend: {
      loadPath: '/locales/main/{{lng}}/{{ns}}.json'
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    }
  });

export default maini18n;
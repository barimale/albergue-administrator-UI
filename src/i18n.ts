import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import LocalStorageBackend from "i18next-localstorage-backend";
// import ChainedBackend from "i18next-chained-backend";
// import Cache from 'i18next-localstorage-cache';

i18n
  .use(Backend)
  .use(LanguageDetector)
  // .use(LocalStorageBackend)s
  // .use(Cache)
  .use(initReactI18next)
  .init({
    defaultNS: 'translation',
    preload:  ['en', 'pt', 'nl', 'de'],
    fallbackLng: ['en', 'pt', 'nl', 'de'],
    supportedLngs: ['en', 'pt', 'nl', 'de'],
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },
    // initImmediate: true
  });

export default i18n;
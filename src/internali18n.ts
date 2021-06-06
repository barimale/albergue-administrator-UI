import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const internali18n = i18next.createInstance();

internali18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS: 'externals',
    backend: {
      loadPath: '/locales/externals/{{lng}}.json',
      addPath: '/locales/externals/{{lng}}.json',
      reloadInterval: 10000
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false
    },
  });

export default internali18n;
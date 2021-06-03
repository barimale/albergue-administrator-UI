import i18next from 'i18next';
import Backend from 'i18next-http-backend';

const internali18n = i18next.createInstance();

internali18n
  .use(Backend)
  .init({
    debug: true,
    defaultNS: 'externals',
    preload:  ['en', 'pt'],
    fallbackLng: ['en', 'pt'],
    supportedLngs: ['en', 'pt'],
    backend: {
      loadPath: '/{{ns}}/{{lng}}.json'
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
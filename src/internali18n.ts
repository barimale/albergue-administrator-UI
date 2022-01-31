import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const loadPath = `${process.env.REACT_APP_ADMINISTRATOR_BACKEND_APP}/locales/{{lng}}/{{ns}}.json`;

const internali18n = i18next.createInstance();

internali18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    defaultNS: 'externals',
    fallbackLng: 'en',
    backend: {
      loadPath,
      addPath: loadPath,
      crossDomain: true,
      withCredentials: false,
      requestOptions: {
        // mode: 'no-cors',
        mode: 'cors', credentials: 'same-origin', cache: 'default',
      },
      // reloadInterval: 10000,
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },
  });

export default internali18n;

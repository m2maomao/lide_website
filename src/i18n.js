import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationCh from './translations/ch/translations.json'
import translationEn from './translations/en/translations.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ch: {
        translations: translationCh,
      },
      en: {
        translations: translationEn,
      },
    },
    fallbackLng: 'ch',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

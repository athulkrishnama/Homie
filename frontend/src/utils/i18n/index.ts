import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import mlLang from './locales/ml/ml.json'
import enLang from './locales/en/en.json'
const resources = {
    en:{
        translation:enLang
    },

    ml:{
        translation:mlLang
    }
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng:'en',
    
})
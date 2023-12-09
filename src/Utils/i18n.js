import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translations/en.json";
import hi from "../translations/hi.json";

export const LANG = {
  EN: "en",
  HI: "hi",
};

const resources = {
  [LANG.EN]: {
    translation: en,
  },
  [LANG.HI]: {
    translation: hi,
  },
};

const getI18nInstance = (lang) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

export default getI18nInstance;

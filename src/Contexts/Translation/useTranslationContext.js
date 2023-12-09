import { I18nextProvider, useTranslation } from "react-i18next";
import useLocalStorage from "../../Hooks/useLocalStorage";
import getI18nInstance, { LANG } from "../../Utils/i18n";

export const TranslationProvider = ({ children }) => {
  const [lang] = useLocalStorage("lang", LANG.EN);

  return (
    <>
      <I18nextProvider i18n={getI18nInstance(lang)}>{children}</I18nextProvider>
    </>
  );
};

const useTranslationContext = (...args) => {
  const [, setLang] = useLocalStorage("lang");

  const props = useTranslation(args);

  const changeLanguage = (lang) => {
    setLang(lang);
    props.i18n.changeLanguage(lang);
  };

  return {
    ...props,
    changeLanguage,
  };
};

export default useTranslationContext;

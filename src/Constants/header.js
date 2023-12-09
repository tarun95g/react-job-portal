import { THEME } from "../Contexts/ThemeContext/ThemeContext";
import { LANG } from "../Utils/i18n";

export const MENU_KEYS = {
  THEME: "theme",
  TRANSLATIONS: "language",
};

export const themeItems = (t) => [
  {
    label: t("theme.light"),
    key: THEME.LIGHT,
  },
  {
    label: t("theme.dark"),
    key: THEME.DARK,
  },
];

export const languageItems = (t) => [
  {
    label: "English",
    key: LANG.EN,
  },
  {
    label: t("language.hindi"),
    key: LANG.HI,
  },
];

export const nonLoggedInItems = (t) => {
  return [
    {
      label: t("theme.label"),
      key: MENU_KEYS.THEME,
      children: themeItems(t),
    },
    {
      label: t("language.label"),
      key: MENU_KEYS.TRANSLATIONS,
      children: languageItems(t),
    },
  ];
};

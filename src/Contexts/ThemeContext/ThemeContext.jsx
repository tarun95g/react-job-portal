/* eslint-disable */
import React, { useState, useContext, createContext } from "react";
import classNames from 'classnames';
import styles from './styles.module.scss';
import useLocalStorage from "../../Hooks/useLocalStorage";
import usePrefersColorScheme from "../../Hooks/usePreferColorScheme";

export const THEME = {
    LIGHT: 'light',
    DARK: 'dark'
}

const ThemeValueContext = createContext({
    theme: '',
    updateTheme: () => null
});

const ThemeContext = (props) => {
    const preferredColorSchema = usePrefersColorScheme();
    const isDarkMode = preferredColorSchema === 'dark';

    const [themValue, setTheme] = useLocalStorage('theme',isDarkMode ?  THEME.DARK: THEME.LIGHT);
    const [theme, updateTheme] = useState(themValue);

    const updateThemeValue = (value) => {
        updateTheme(value);
        setTheme(value)
    }

    return (
        <ThemeValueContext.Provider value={{ theme, updateTheme: updateThemeValue }}>
            <div className={classNames(styles[theme])}>
                {
                    props.children
                }
            </div>
        </ThemeValueContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeValueContext);

export default ThemeContext;
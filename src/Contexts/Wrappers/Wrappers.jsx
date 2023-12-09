import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AlertContext from '../AlertContext/AlertContext';
import Auth from '../Auth/Auth';
import ThemeContext from '../ThemeContext/ThemeContext';
import { TranslationProvider } from '../Translation/useTranslationContext';

const Wrappers = ({ children }) => (
  <TranslationProvider>
    <HelmetProvider context={{}}>
      <ThemeContext>
        <Auth>
          <AlertContext >
            {children}
          </AlertContext>
        </Auth>
      </ThemeContext>
    </HelmetProvider>
  </TranslationProvider>
);


export default Wrappers;

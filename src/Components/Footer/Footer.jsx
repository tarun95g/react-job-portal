import React from 'react';
import { Link } from 'react-router-dom';
import useTranslationContext from '../../Contexts/Translation/useTranslationContext';
import { ROUTES } from '../../Routes/routes';
import styles from './Footer.module.scss'

const Footer = () => {
    const { t } = useTranslationContext();

    return (
        <footer className={styles.footer}>
            <Link to={ROUTES.HOME}>
                <svg width="85" viewBox="0 0 260 53" fill="none" xmlns="http://www.w3.org/2000/svg" data-di-res-id="310f2900-f42caf6a" data-di-rand="1681912898782"><path d="M133.457 30.1055C133.457 42.7658 143.954 52.0264 157.29 52.0264C170.625 52.0264 181.134 42.7658 181.134 30.1055V1.01878H168.221V28.6059C168.221 35.4397 163.482 40.0414 157.255 40.0414C151.028 40.0414 146.289 35.4626 146.289 28.6059V1.01878H133.377L133.457 30.1055ZM215.635 12.6603H231.042V51.0648H243.954V12.6603H259.362V0.995884H215.635V12.6603ZM207.29 0.995884H194.378V51.0648H207.29V0.995884ZM81.2933 12.6603H96.7008V51.0648H109.613V12.6603H125.009V0.995884H81.2933V12.6603ZM13.5502 0.995884H0.638062V51.0648H13.5502V0.995884ZM74.4938 21.9095C74.4938 9.24913 63.9969 0 50.6498 0C37.3026 0 26.8058 9.24913 26.8058 21.9095V51.0648H39.7179V23.4777C39.7179 16.6439 44.457 12.0422 50.6841 12.0422C56.9112 12.0422 61.6503 16.621 61.6503 23.4777V51.0648H74.5624L74.4823 21.9095H74.4938Z" fill="#236CFF"></path></svg>
            </Link>
            <h4>
                {t('footer.disclaimer')}
            </h4>
        </footer>
    )
};



export default Footer;
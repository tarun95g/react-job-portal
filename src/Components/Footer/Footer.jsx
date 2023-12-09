import React from 'react';
import { Link } from 'react-router-dom';
import useTranslationContext from '../../Contexts/Translation/useTranslationContext';
import { ROUTES } from '../../Routes/routes';
import styles from './Footer.module.scss'
import { Image } from 'antd';

const Footer = () => {
    const { t } = useTranslationContext();

    return (
        <footer className={styles.footer}>
            <Link to={ROUTES.HOME} className={styles.footerLogo}>
                <Image className='' preview={false} src={require('../../assets/img/Pro1.png')} />
            </Link>
            <h4>
                {t('footer.disclaimer')}
            </h4>
        </footer>
    )
};



export default Footer;

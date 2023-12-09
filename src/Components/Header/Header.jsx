import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import {
  UserOutlined,
  BulbOutlined
} from '@ant-design/icons';
import classNames from "classnames";
import { ROUTES } from "../../Routes/routes";
import { Dropdown } from "antd";
import { useThemeContext } from "../../Contexts/ThemeContext/ThemeContext";
import { useAuthContext, USER_TYPE } from "../../Contexts/Auth/Auth";
import { MENU_KEYS, nonLoggedInItems } from "../../Constants/header";
import useTranslationContext from "../../Contexts/Translation/useTranslationContext";
import { useMemo } from "react";


function Header({ withNavLinks = true }) {

  const { updateTheme } = useThemeContext();
  const { logoutUser, isUserAuthenticated, auth: { user } } = useAuthContext();
  const navigate = useNavigate();
  const { t, changeLanguage } = useTranslationContext();
  const isLoggedInUser = isUserAuthenticated()

  const onClick = ({ key, keyPath }) => {
    if (keyPath.includes(MENU_KEYS.THEME)) {
      updateTheme(key);
    } else if (keyPath.includes(MENU_KEYS.TRANSLATIONS)) {
      changeLanguage(key)
    }
  };

  const onLogout = async (event) => {
    event.stopPropagation();
    await logoutUser();
    navigate({ pathname: ROUTES.HOME })
  }


  const nonLoggedItems = useMemo(() => {
    return nonLoggedInItems(t)
  }, [t])

  const loggedInItems = [
    {
      ...(user.type === USER_TYPE.FREELANCE ? {
        key: 'profile',
        label: (<Link to={ROUTES.USERS.USER(12)} onClick={event => event.stopPropagation()}> {t('links.profile')} </Link>)
      } : {})
    },
    ...nonLoggedInItems(t),
    {
      key: 'logout',
      label: (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={onLogout} >{t('links.logout')}</a>)
    },
  ];

  return (
    <header className="header">
      <div className="header__content">
        <Link to={`${ROUTES.HOME}`} className="header__content__logo">
          <svg width="85" viewBox="0 0 260 53" fill="none" xmlns="http://www.w3.org/2000/svg" data-di-res-id="310f2900-f42caf6a" data-di-rand="1681912898782"><path d="M133.457 30.1055C133.457 42.7658 143.954 52.0264 157.29 52.0264C170.625 52.0264 181.134 42.7658 181.134 30.1055V1.01878H168.221V28.6059C168.221 35.4397 163.482 40.0414 157.255 40.0414C151.028 40.0414 146.289 35.4626 146.289 28.6059V1.01878H133.377L133.457 30.1055ZM215.635 12.6603H231.042V51.0648H243.954V12.6603H259.362V0.995884H215.635V12.6603ZM207.29 0.995884H194.378V51.0648H207.29V0.995884ZM81.2933 12.6603H96.7008V51.0648H109.613V12.6603H125.009V0.995884H81.2933V12.6603ZM13.5502 0.995884H0.638062V51.0648H13.5502V0.995884ZM74.4938 21.9095C74.4938 9.24913 63.9969 0 50.6498 0C37.3026 0 26.8058 9.24913 26.8058 21.9095V51.0648H39.7179V23.4777C39.7179 16.6439 44.457 12.0422 50.6841 12.0422C56.9112 12.0422 61.6503 16.621 61.6503 23.4777V51.0648H74.5624L74.4823 21.9095H74.4938Z" fill="#236CFF"></path></svg>
        </Link>
        <nav className={classNames('header__content__nav')} >
          {
            withNavLinks ?
              <ul>
                <li>
                  <Link to={`${ROUTES.JOBS}`}>{t('links.jobs')}</Link>
                </li>

                {
                  (!isLoggedInUser || user.type === USER_TYPE.EMPLOYER) &&
                  <li>
                    <Link to={`${ROUTES.POST_JOB}`}>{t('links.postJob')}</Link>
                  </li>
                }

                {!isLoggedInUser && <Link to={`${ROUTES.LOGIN}`}>
                  <button className="btn btn__login">{t('links.login')}</button>
                </Link>}


                {
                  isLoggedInUser &&
                  <li>
                    <Link to={`${ROUTES.MY_JOBS.JOBS}`}>{t('links.myJob')}</Link>
                  </li>
                }

              </ul> : null
          }

          {
            isLoggedInUser ?
              <Dropdown menu={{ items: loggedInItems, onClick }}>
                <UserOutlined className={'theme'} href={''} onClick={(e) => e.preventDefault()}>
                </UserOutlined>
              </Dropdown> :
              <Dropdown menu={{ items: nonLoggedItems, onClick }}>
                <BulbOutlined className={'theme'} href={''} onClick={(e) => e.preventDefault()}>

                </BulbOutlined>
              </Dropdown>

          }
        </nav>




      </div>
    </header>
  );
}

export default Header;
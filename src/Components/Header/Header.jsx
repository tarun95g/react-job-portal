import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import {
  UserOutlined,
  BulbOutlined
} from '@ant-design/icons';
import classNames from "classnames";
import { ROUTES } from "../../Routes/routes";
import { Dropdown, Image } from "antd";
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
        <Image preview={false} src={require('../../assets/img/Pro1.png')} />
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
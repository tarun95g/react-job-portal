import { Image } from 'antd';
import classNames from 'classnames';
import { Navigate, useSearchParams } from 'react-router-dom';
import BaseLayout from '../../Components/BaseLayout/BaseLayout';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import LoginUser from '../../Components/LoginUser/LoginUser';
import Seo from '../../Components/Seo/Seo';
import { useAuthContext } from '../../Contexts/Auth/Auth';
import { ROUTES } from '../../Routes/routes';
import styles from './Login.module.scss';

const Login = () => {
  const [searchParams] = useSearchParams();
  const { isUserAuthenticated } = useAuthContext();


  if (isUserAuthenticated()) {
    return <Navigate to={searchParams.get('redirectUrl') || `${ROUTES.HOME}`} replace />;
  }

  return (
    <BaseLayout header={<Header withNavLinks={false} />} footer={<Footer />} seo={<Seo title='Login page' />}>
      <section className={styles.mainContentWrapper} >
        <section className={styles.leftSection}>
          <Image rootClassName={styles.image} preview={false} src={require('../../assets/img/login.jpg')}></Image>
        </section>
        <section className={classNames(styles.rightSection, styles.center)}>

          <section className={styles.loginWrapper}>
            <h2>Sign In</h2>
            <LoginUser />
          </section>
        </section>
      </section>
    </BaseLayout>
  )
};


export default Login;
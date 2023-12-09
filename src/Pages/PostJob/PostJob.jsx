import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../Components/BaseLayout/BaseLayout';
import EmployerPrivateAccess from '../../Components/EmployerPrivateAccess/EmployerPrivateAccess';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import PostJobEmployer from '../../Components/PostJobEmployer/PostJobEmployer';
import Seo from '../../Components/Seo/Seo';
import { USER_TYPE } from '../../Contexts/Auth/Auth';
import useTranslationContext from '../../Contexts/Translation/useTranslationContext';
import { ROUTES } from '../../Routes/routes';
import styles from './PostJob.module.scss';

const PostJob = () => {
  const { t } = useTranslationContext()
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate({ pathname: ROUTES.MY_JOBS.JOBS })
  }

  return (
    <EmployerPrivateAccess redirectTo={`?user=${USER_TYPE.EMPLOYER}&redirectUrl=${ROUTES.POST_JOB}`}>
      <BaseLayout header={<Header />} footer={<Footer />} seo={<Seo title='Post a Job | Employer' />}>
        <section className={styles.container}>
          <section className={styles.formWrapper}>
            <h2 className={styles.heading}>{t('links.postJob')}</h2>
            <PostJobEmployer onSubmit={onSubmit} />
          </section>
        </section>
      </BaseLayout>
    </EmployerPrivateAccess >
  )
}


export default PostJob;

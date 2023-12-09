import React from 'react';
import Jobs from '../../Pages/Jobs/Jobs';
import styles from './UserJobs.module.scss';

const UserJobs = () => {

  return (
    <div className={styles.userJobsWrapper}>
      <Jobs seoTitle={'Applied Jobs'} showSearch={false} type={'APPLIED'} />
    </div>
  )
};

export default UserJobs;

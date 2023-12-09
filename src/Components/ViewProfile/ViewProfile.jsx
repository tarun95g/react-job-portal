import { Empty, Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Contexts/Auth/Auth';
import { ROUTES } from '../../Routes/routes';
import GitHubProjects from '../GitHubProjects/GitHubProjects';
import styles from './ViewProfile.module.scss';

const ViewProfile = () => {
  const { auth: { user: { details: { skills } } } } = useAuthContext();

  return (
    <div className={styles.ViewProfileWrapper}>
      <Card
        title={'Skills'}

        extra={!skills && <Link to={`../${ROUTES.USERS.PROFILE.EDIT}`}>Add skills</Link>}
      >

        {skills ? <h4>{skills}</h4> : <Empty />}
      </Card>
      <GitHubProjects />
    </div >
  )
};


export default ViewProfile;

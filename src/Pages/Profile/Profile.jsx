import { UserOutlined, EditOutlined, ProfileOutlined, DollarOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Avatar, Card } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import BaseLayout from '../../Components/BaseLayout/BaseLayout';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Seo from '../../Components/Seo/Seo';
import { useAuthContext, USER_TYPE } from '../../Contexts/Auth/Auth';
import { ROUTES } from '../../Routes/routes';
import styles from './Profile.module.scss';


const Profile = () => {
  const { auth: { user: { email, type, details } } } = useAuthContext();
  const { name, experience, salary, github_username } = details
  const isFreelance = (type === USER_TYPE.FREELANCE)


  return (
    <div>
      <BaseLayout
        header={<Header />}
        footer={<Footer />}
        seo={<Seo title='User profile' />}
      >
        <section className={styles.wrapper}>
          <section className={styles.container}>

            <section className={styles.leftSection}>

              {
                isFreelance && <div className={styles.editProfileSection} >
                  <h1>Profile</h1>

                  <Link to={ROUTES.USERS.PROFILE.EDIT} >
                    <Avatar className={styles.editProfile} size={32} icon={<EditOutlined />} />
                  </Link>

                </div>
              }
              <div className={styles.profileOverview}>
                <Link to={ROUTES.USERS.PROFILE.VIEW} >
                  <Avatar
                    size={128}
                    // src={'https://avatars.githubusercontent.com/u/24898559?v=4'} 
                    icon={<UserOutlined />}
                  />
                </Link>

                <div className={styles.username}>
                  <h3>{email}</h3>
                </div>
              </div>

              <div className={styles.profileDetails}>
                <Card
                  title="Profile details">
                  {
                    <div className={styles.username}>
                      <label className={styles.label}>
                        <UserOutlined />
                        Name
                      </label>
                      <span className={styles.text}>{name}</span>
                    </div>
                  }
                  {
                    <div className={styles.username}>
                      <label className={styles.label}>
                        <ProfileOutlined />

                        Experience
                      </label>
                      <span>{experience}</span>
                    </div>
                  }
                  {
                    <div className={styles.username}>
                      <label className={styles.label}>
                        <DollarOutlined />

                        Salary
                      </label>
                      <span>{salary}</span>
                    </div>
                  }


                </Card>
                {
                  github_username &&
                  <Button target='_blank' href={`https://github.com/${github_username}`} type='primary'>
                    <GithubOutlined />
                    View Github Profile
                  </Button>
                }
              </div>
            </section>

            <section className={styles.rightSection}>
              <Outlet />
            </section>

          </section>
        </section>
      </BaseLayout>
    </div >
  )
};


export default Profile;

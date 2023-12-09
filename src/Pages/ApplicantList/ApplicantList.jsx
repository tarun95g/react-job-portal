import React, { useMemo } from 'react';
import BaseLayout from '../../Components/BaseLayout/BaseLayout';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Seo from '../../Components/Seo/Seo';
import { Space, Table, Tag } from 'antd';
import styles from './ApplicantList.module.scss'
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../Routes/routes';
import { useAuthContext } from '../../Contexts/Auth/Auth';
import JobDetailCard from '../../Components/JobsList/JobDetailCard/JobDetailCard';
import { GithubOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Name',
    dataIndex: ['details', 'name'],
  },
  {
    title: 'Experience',
    dataIndex: ['details', 'experience'],

  },
  {
    title: 'Address',
    dataIndex: ['details', 'address'],
  },
  {
    title: 'Skills',
    dataIndex: ['details', 'skills'],
    render: (_, { details: { skills } }) => (
      <>
        {(skills || []).map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Github',
    dataIndex: ['details', 'github_username'],
    render: (props) => <a href={`https://github.com/${props}`} target='_blank' rel="noreferrer" ><GithubOutlined /></a>
  },
  {
    title: 'Action',
    key: 'details.action',
    render: (_, record) => (
      <Space size="middle">
        <Link to={ROUTES.USERS.USER(record.key)}>View Profile </Link>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    username: 'john_coder',
    details: {
      name: 'John Brown',
      experience: '1 year',
      address: 'Gurugram',
      skills: ['React', 'Frontend'],
      github_username: 'ScriptedAlchemy'
    }
  },
  {
    key: '2',
    username: 'ajay_95',
    details: {
      name: 'Ajay ',
      experience: '2 years',
      address: 'Bangalore',
      skills: ['Angular'],
      github_username: 'ScriptedAlchemy'
    }
  },
  {
    key: '3',
    username: 'deepak_95',
    details: {
      name: 'Deepak ',
      experience: '5+ years',
      address: 'Bangalore',
      skills: ['React', 'Problem solving'],
      github_username: 'ScriptedAlchemy'
    }
  },
];

const ApplicantList = () => {
  const params = useParams()
  const { updateUser, auth: { user: { postedJobs } } } = useAuthContext();

  const jobData = useMemo(() => postedJobs.find(item => item.jobId === +params.jobId), [params.jobId, postedJobs])

  return (

    <BaseLayout
      header={<Header />}
      footer={<Footer />}
      set={<Seo title='Job Applicants' />}
    >

      <div className={styles.container}>
        <h2>Job details and Applicants list</h2>
        <div className={styles.ApplicantListWrapper}>
          <div className={styles.jobCard}>
            <JobDetailCard isLoading={false} data={jobData || {}} hideApplicantList={true} />
          </div>
          <div className={styles.applicantCard}>
            <Table
              onRow={(record) => {
                return {
                  onClick: () => { updateUser({ email: record.username, details: { ...record.details, skills: record.details.skills.join(',') } }) },
                };
              }} columns={columns} dataSource={data} />
          </div>
        </div>
      </div>

    </BaseLayout>

  )
};


export default ApplicantList;

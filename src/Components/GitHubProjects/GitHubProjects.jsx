import React, { useEffect, useState } from 'react';
import { useAuthContext, USER_TYPE } from '../../Contexts/Auth/Auth';
import { Empty, List, Tag, Card } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Routes/routes';
import { fetchGitHubProfile } from '../../api/service';
import styles from './GitHubProjects.module.scss';

const GitHubProjects = () => {
  const [projects, setProjects] = useState([])
  const { auth: { user: { type, details: { github_username } } } } = useAuthContext();

  useEffect(() => {

    const getProjects = async (username) => {
      const data = await fetchGitHubProfile(username);
      setProjects(data);

    }

    github_username && getProjects(github_username)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasProjects = projects && projects.length ? true : false;


  return (
    <div className={styles.GitHubProjectsWrapper}>
      <Card title='Github projects' extra={type === USER_TYPE.FREELANCE && !hasProjects && <Link to={`../${ROUTES.USERS.PROFILE.EDIT}`}>Add profile</Link>}>
        {hasProjects ?

          <List
            itemLayout="horizontal"
            dataSource={projects}
            pagination={true}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<a className={styles.title} target={'_blank'} href={item.html_url} rel="noreferrer">{item.full_name}</a>}
                  description={item.description}
                />
                <Tag color='blue'>{item.language}</Tag>
                <Tag color='green'>{item.visibility}</Tag>

              </List.Item>
            )}
          />

          : <Empty />}
      </Card>
    </div>
  )
};


export default GitHubProjects;

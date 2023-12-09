import { Pagination } from 'antd';
import React from 'react';
import styles from './JobsList.module.scss'

const JobsList = ({ jobsData, total, page, onChange, renderElement }) => {
  return (
    <section className={styles.jobWrapper}>
      <ul className={styles.jobList}>
        {
          jobsData.map((job, index) => (
            renderElement(job, index)
          ))
        }
      </ul>

      <Pagination defaultPageSize={2} current={page} showSizeChanger={false} total={total} onChange={onChange} />
    </section>
  )
}

export default JobsList;

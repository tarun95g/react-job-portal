import React from 'react';
import SearchJobs from '../SearchJobs/SearchJobs';
import { Image } from 'antd';
import styles from './BannerWithSearch.module.scss';

const BannerWithSearch = ({ title }) => (
  <div className={styles.BannerWithSearchWrapper}>
    <Image preview={false} src={require('../../assets/img/handshake.jpg')} />
    <div className={styles.center}>
      <h1 className={styles.filterHeading}>{title}</h1>
      <SearchJobs />
    </div>
  </div>
);


export default BannerWithSearch;

import { Empty } from 'antd';
import React from 'react';
import BaseLayout from '../../Components/BaseLayout/BaseLayout';
import Header from '../../Components/Header/Header';
import styles from './NotFound.module.scss';

const NotFound = () => (
  <div className="NotFoundWrapper">
    <BaseLayout
      header={<Header />}
    >
      <section className={styles.notFoundContainer}>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={
            <h2>
              404 - Route not found
            </h2>
          }
        >
        </Empty>
      </section>
    </BaseLayout>
  </div >
);


export default NotFound;

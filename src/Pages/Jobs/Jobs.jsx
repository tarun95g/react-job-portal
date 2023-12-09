import React, { useRef, useState, useEffect } from 'react';
import BaseLayout from '../../Components/BaseLayout/BaseLayout';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Seo from '../../Components/Seo/Seo';
import styles from './Jobs.module.scss'
import JobsList from '../../Components/JobsList/JobsList';
import JobDetailCard from '../../Components/JobsList/JobDetailCard/JobDetailCard';
import JobCard from '../../Components/JobsList/JobCard/JobCard';
import { useSearchParams } from 'react-router-dom';
import useJobList from '../../Hooks/useJobList';
import BannerWithSearch from '../../Components/BannerWithSearch/BannerWithSearch';
import JobSearchContext from '../../Contexts/JobSearchContext/JobSearchContext';
import { getQueryParams } from '../../Utils/jobs';
import { Empty } from 'antd';
import useTranslationContext from '../../Contexts/Translation/useTranslationContext';

const Jobs = ({ showSearch = true, type = 'ALL', seoTitle = 'Search Jobs' }) => {
  const { isLoading, jobsData, fetchNewJobs } = useJobList({ type });
  const [selectedCard, setCard] = useState();
  const { t } = useTranslationContext()

  let [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const detailRef = useRef()

  const scroll = () => {
    detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onChange = (pageValue) => {

    const newParams = getQueryParams(searchParams, { page: pageValue || 1 });

    setSearchParams(newParams);
    setCard(undefined);
    // scroll();
  }

  useEffect(() => {
    setCard(jobsData.data?.[0])
  }, [jobsData])

  useEffect(() => {
    fetchNewJobs(getQueryParams(searchParams));
  }, [fetchNewJobs, searchParams]);

  const onSearch = (params) => {
    setSearchParams(params);
  };

  const { total } = jobsData;


  return (
    <BaseLayout
      header={<Header />}
      footer={<Footer />}
      seo={<Seo title={seoTitle} />}
    >
      <JobSearchContext value={{
        onSearch,
        params: getQueryParams(searchParams),
        isLoading: total && isLoading
      }}>
        <section className={styles.container}>
          {showSearch && <section className={styles.filterWrapper}>
            <BannerWithSearch title={t('job_banner_title')} />
          </section>}

          <section className={styles.jobWrapper}>
            <h2 className={styles.heading}>Jobs ({type === 'ALL' ? 'Found' : type === 'POSTED' ? 'Posted' : 'Applied'} {total} jobs )</h2>

            {total || isLoading ?
              <div className={styles.jobContainer}>
                <section className={styles.jobListWrapper}>
                  <JobsList
                    renderElement={(job, index) =>
                      <li key={`${job.jobId}${index}`}
                        onClick={() => {
                          setCard(job);
                          // scroll();
                        }}>
                        <JobCard loading={isLoading} hoverable={true} selected={!isLoading && job.jobId === selectedCard?.jobId} data={job} />
                      </li>
                    }
                    jobsData={jobsData.data}
                    page={page}
                    onChange={onChange}
                    total={total}
                  />
                </section>

                <section ref={detailRef} className={styles.jobDetail}>
                  <JobDetailCard isLoading={isLoading || !selectedCard} data={selectedCard} />
                </section>
              </div> :
              <Empty />
            }

          </section>
        </section>
      </JobSearchContext>
    </BaseLayout>
  )
};


export default Jobs;

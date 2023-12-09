import { Button, Select, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { locationOptions } from '../../Constants/search';
import { useJobSearchContext } from '../../Contexts/JobSearchContext/JobSearchContext';
import useTranslationContext from '../../Contexts/Translation/useTranslationContext';
import styles from './SearchJobs.module.scss';

const SearchJobs = () => {
  const { onSearch, params, isLoading } = useJobSearchContext();
  const [keyword, setKeyword] = useState(params.keyword);
  const [location, setLocation] = useState(params.location);
  const { t } = useTranslationContext()


  useEffect(() => {
    setKeyword(params.keyword)
  }, [params.keyword])

  return (
    <div data-testid='searchFilters' className={styles.searchWrapper}>
      <div className={styles.boxWrapper}>
        <div className={styles.searchFields}>
          <div className={styles.inputWrapper}>
            <Input
              data-testid='searchKeyword'
              value={keyword}
              allowClear
              onChange={
                event => {
                  event.stopPropagation();
                  // eslint-disable-next-line no-useless-escape
                  const value = event.target.value.replace(/[^A-Za-z\.\- ]/ig, '')

                  if (keyword !== value)
                    setKeyword(value)
                }
              }
              placeholder={t('placeholder_search')} />
          </div>
          <div className={styles.pipe}></div>
          <div className={styles.inputWrapper}>
            <Select
              bordered={false}
              value={location}
              options={locationOptions}
              onSelect={
                value => {
                  if (location !== value)
                    setLocation(value)
                }
              }
              placeholder={t('placeholder_location')} />
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button data-testid='searchCTA' loading={isLoading} type='primary' onClick={() =>
            onSearch({ keyword: keyword ? keyword : '', location: location || '' })
          }> {t('button_search_label')}</Button>
        </div>
      </div>
    </div>
  )
};

SearchJobs.propTypes = {
  // bla: PropTypes.string,
};

SearchJobs.defaultProps = {
  // bla: 'test',
};

export default SearchJobs;

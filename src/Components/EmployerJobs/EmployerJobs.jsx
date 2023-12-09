import React from 'react';
import Jobs from '../../Pages/Jobs/Jobs';

const EmployerJobs = () => {

  return (
    <div className="EmployerJobsWrapper">
      <Jobs seoTitle='Posted Jobs' showSearch={false} type={'POSTED'} />
    </div>
  )
};

export default EmployerJobs;


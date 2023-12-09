import React from 'react';
import styles from './JobCard.module.scss'
import { Badge, Button, Card } from 'antd';
import JobTags from '../../JobTags/JobTags';
import classNames from 'classnames';
import { USER_TYPE, useAuthContext } from '../../../Contexts/Auth/Auth';
import { useAlertContext } from '../../../Contexts/AlertContext/AlertContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../Routes/routes';

const JobCard = ({ data, selected, hoverable, loading }) => {
  const { jobId, companyName, createdDate, title, placeholders, tagsAndSkills, footerPlaceholderLabel } = data;
  const postedOn = new Date(createdDate);
  const { updateMyJobs, isUserAuthenticated } = useAuthContext();
  const { openNotification } = useAlertContext();
  const navigate = useNavigate()
  const location = useLocation();

//   const applyJob = (jobsId) => {
//     if (isUserAuthenticated()) {
//        openNotification({ type: 'success', message: 'Job Applied Successfully' });
//        updateMyJobs(jobsId);
//     }
//     else {
//        navigate({
//           pathname: ROUTES.LOGIN,
//           search: `user=${USER_TYPE.FREELANCE}&redirectUrl=${location.pathname}${location.search}`
//        })
//     }
//  }


  const Heading = () => (
    <div className={styles.heading}>
      <h4>{title}</h4>
    </div>
  )

  return (
    <Badge.Ribbon color={(loading || !footerPlaceholderLabel) && 'transparent'} text={loading ? '' : footerPlaceholderLabel}>
      <Card className={classNames(styles.background, { [styles.selected]: selected, })} hoverable={hoverable} loading={loading} title={<Heading />}>
        <h3  >{companyName}</h3>
        <JobTags jobId={jobId} tags={placeholders} />

        <h4 >{tagsAndSkills}</h4>
        <p >Posted on : {postedOn.toDateString()}</p>
        {/* <Button type="primary" onClick={() => applyJob(jobId)}>
          Apply
        </Button> */}
      </Card>
    </Badge.Ribbon >
  )
};



export default JobCard;

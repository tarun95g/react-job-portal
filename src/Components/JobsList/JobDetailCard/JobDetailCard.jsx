import { Badge, Button, Card, Tag } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAlertContext } from '../../../Contexts/AlertContext/AlertContext';
import { useAuthContext, USER_TYPE } from '../../../Contexts/Auth/Auth';
import { ROUTES } from '../../../Routes/routes';
import JobTags from '../../JobTags/JobTags';
import styles from './JobDetailCard.module.scss';

const JobDetailCard = ({ isLoading, data = {}, hideApplicantList }) => {
   const { jobId, title, jobDescription, placeholders, companyName, tagsAndSkills, isApplied } = data || {};
   const { openNotification } = useAlertContext();
   const { updateMyJobs, isUserAuthenticated, auth: { user: { type, myJobs, postedJobs } } } = useAuthContext();
   const navigate = useNavigate();
   const location = useLocation();
   const isAppliedAlready = isApplied || myJobs.includes(jobId);

   const Heading = () => (
      <div className={styles.heading}>
         <h2>{title}</h2>
      </div>
   );

   const applyJob = (jobsId) => {
      if (isUserAuthenticated()) {
         openNotification({ type: 'success', message: 'Job Applied Successfully' });
         updateMyJobs(jobsId);
      }
      else {
         navigate({
            pathname: ROUTES.LOGIN,
            search: `user=${USER_TYPE.FREELANCE}&redirectUrl=${location.pathname}${location.search}`
         })
      }
   }

   const Meta = () => {

      return (
         <>
            {
               isAppliedAlready ? <Tag color="green">Applied</Tag> :
                  ((type === USER_TYPE.FREELANCE) || !isUserAuthenticated()) &&
                  <Button type="primary" onClick={() => applyJob(jobId)}>
                     Apply
                  </Button>
            }

            {
               (type === USER_TYPE.EMPLOYER && !hideApplicantList && (postedJobs || []).find(item => item.jobId === jobId)) &&
               <Badge count={3} offset={[10]} showZero>
                  <Link to={`${ROUTES.MY_JOBS.JOBS}/${ROUTES.MY_JOBS.JOB_APPLICANT(jobId)}`} relative>
                     Applicants List
                  </Link>
               </Badge>
            }
         </>
      )

   }

   return (
      <Card className={isLoading ? '' : styles.background} loading={isLoading} title={<Heading />} extra={isLoading ? null : <Meta />}>
         <h2 >{companyName}</h2>
         <JobTags jobId={jobId} tags={placeholders} />

         <div className={styles.detailsWrapper}>
            <h4 className={styles.heading} >Job Skills</h4>
            <p className={styles.description}> {tagsAndSkills} </p>

            <h4 className={styles.heading} >Job Description</h4>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: jobDescription }}></p>
         </div>

         {(!isAppliedAlready && ((type === USER_TYPE.FREELANCE) || !isUserAuthenticated())) && <><h4 className={styles.heading} >Click below to apply for this Job</h4> <Meta /></>}

      </Card>
   )
};


export default JobDetailCard;

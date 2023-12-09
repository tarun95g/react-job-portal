import React from 'react';
import EmployerJobs from '../../Components/EmployerJobs/EmployerJobs';
import PrivateRoute from '../../Components/PrivateRoute/PrivateRoute';
import UserJobs from '../../Components/UserJobs/UserJobs';
import { useAuthContext, USER_TYPE } from '../../Contexts/Auth/Auth';
import { ROUTES } from '../../Routes/routes';

const MyJobs = () => {
  const { auth: { user: { type } } } = useAuthContext();

  return (
    <PrivateRoute redirectTo={`?redirectUrl=${ROUTES.MY_JOBS.JOBS}`}>
      {type === USER_TYPE.FREELANCE ? <UserJobs /> : <EmployerJobs />}
    </PrivateRoute>
  )
}


export default MyJobs;

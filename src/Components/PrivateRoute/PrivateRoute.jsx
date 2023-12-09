import React from 'react';
import { useAuthContext } from '../../Contexts/Auth/Auth';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '../../Routes/routes';

const PrivateRoute = ({ children, redirectTo = '', type }) => {
  const { isUserAuthenticated, auth: { user: { type: userType } } } = useAuthContext();

  if (!isUserAuthenticated()) {
    return (<Navigate to={`${ROUTES.LOGIN}${redirectTo}`} replace={true} />)
  } else if (
    (type && userType !== type)
  ) {
    return (
      <>
        <h4>No Access</h4>
        <Link to={ROUTES.HOME}>Navigate to Home</Link>
      </>
    );
  }

  return (
    <>
      {
        children
      }
    </>
  )
};

export default PrivateRoute;

import React from 'react';
import { USER_TYPE } from '../../Contexts/Auth/Auth';
import PrivateRoute from '../PrivateRoute/PrivateRoute';


const EmployerPrivateAccess = ({ children, redirectTo = '' }) => {
  return <PrivateRoute type={USER_TYPE.EMPLOYER} redirectTo={redirectTo}>{children}</PrivateRoute>
};

export default EmployerPrivateAccess;



import React, { useEffect } from 'react';
import { useAuthContext } from '../../Contexts/Auth/Auth';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../Routes/routes';

const Logout = () => {
  const { logoutUser, isUserAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isUserAuthenticated())
      logoutUser();
  }, [isUserAuthenticated, logoutUser])

  return (
    <>
      {
        !isUserAuthenticated() ? <Navigate to={ROUTES.HOME} /> : null
      }
    </>
  )
}


export default Logout;

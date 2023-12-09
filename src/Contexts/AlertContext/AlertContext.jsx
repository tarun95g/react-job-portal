import { notification } from 'antd';
import React, { createContext, useContext } from 'react';


const AlertValueContext = createContext({
  api: {}, 
  openNotification: () => {}
});


const AlertContext = ({children}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({type='open', message, description, duration = 3}) => {
    api?.[type]?.({
      message,
      description,
      duration,
    });
  };

  return (
    <>  
      {contextHolder}
      <AlertValueContext.Provider value={{api, openNotification}} >
        {children}
      </AlertValueContext.Provider >
    </>
  )
};

export const useAlertContext = () => useContext(AlertValueContext);

export default AlertContext;

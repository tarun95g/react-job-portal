import React from 'react';
import { Skeleton } from 'antd';

const Loader = ({isLoading, children}) => (
  <Skeleton loading={isLoading} >
    {children}
  </Skeleton>
);


export default Loader;

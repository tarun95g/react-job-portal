

import React, { createContext, useContext } from 'react';


const JobSearchValueContext = createContext({
    params: {},
    onSearch: () => { },
    isLoading: false
});


const JobSearchContext = ({ value, children }) => {
    return (
        <>
            <JobSearchValueContext.Provider value={value} >
                {children}
            </JobSearchValueContext.Provider >
        </>
    )
};

export const useJobSearchContext = () => useContext(JobSearchValueContext);

export default JobSearchContext;

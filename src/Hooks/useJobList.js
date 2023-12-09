import { useCallback, useState } from "react";
import { fetchJobs } from "../api/service";
import { useAuthContext } from "../Contexts/Auth/Auth";

const range = (value) => {
  const data = [];
  let i = 0;
  while (i < value) {
    data.push({});
    i++;
  }

  return data;
};

const useJobList = ({ type }) => {
  const [isLoading, setLoading] = useState(true);
  const [jobsData, setJobs] = useState({ data: range(10), total: 0 });
  const {
    auth: { user },
  } = useAuthContext();

  const fetchNewJobs = useCallback(
    async (params) => {
      setLoading(true);
      const { total, data } = await fetchJobs({ ...params, type: type, user });
      setJobs({ total, data });
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type]
  );

  return {
    isLoading,
    jobsData,
    fetchNewJobs,
  };
};

export default useJobList;

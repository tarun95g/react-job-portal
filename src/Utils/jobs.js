import { USER_TYPE } from "../Contexts/Auth/Auth";

export const getParams = (searchParams) => {
  const newParams = {};
  searchParams.forEach((value, key) => {
    newParams[key] = value;
  });

  return newParams;
};

export const getQueryParams = (searchParams, params = {}) => {
  const mapper = {
    page: 1,
  };

  const queryParams = { ...getParams(searchParams), ...params };

  const { page, location } = queryParams;
  queryParams.page = isNaN(page) ? (!page ? mapper.page : Number(page)) : page;

  queryParams.location =
    !!location && location !== "null" && location !== "undefined"
      ? location
      : undefined;

  return queryParams;
};

export const getLoginType = (type) => {
  if (
    type &&
    [USER_TYPE.EMPLOYER, USER_TYPE.FREELANCE].includes(type.toUpperCase())
  ) {
    return type.toUpperCase();
  } else {
    return undefined;
  }
};

export const getJobSchema = (formValues) => {
  const {
    jobDescription,
    companyName,
    experience,
    salary,
    location,
    jobTitle,
    tagsAndSkills,
  } = formValues;

  return {
    jobId: Math.random(),
    title: jobTitle,
    companyName,
    jobDescription,
    tagsAndSkills,
    createdDate: +new Date(),
    placeholders: [
      {
        type: "salary",
        label: salary || "Not Disclosed",
      },
      {
        type: "location",
        label: location,
      },
      {
        type: "experience",
        label: experience,
      },
    ],
  };
};

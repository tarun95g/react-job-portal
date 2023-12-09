import GITHUB_DATA from "../mocks/github";
import JOB_DATA from "../mocks/job";

export const fakeDelay = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, delay);
  });
};

// Search data according to keyword
export const searchByKeyword = (item, keyword) => {
  return (
    item.jobDescription.includes(keyword) ||
    item.title.includes(keyword) ||
    item.companyName.includes(keyword) ||
    item.tagsAndSkills.includes(keyword) ||
    searchByLocation(item, keyword)
  );
};

// Search data according to location
export const searchByLocation = (item, value) => {
  const { label } = (item?.placeholders || []).find(
    (placeholderItem) => placeholderItem.type === "location"
  ) || { label: "" };

  const location = label.toLowerCase();
  value = value.toLowerCase();

  return location.includes(value) || location === value;
};

// Source data
export const getSourceData = ({ user, jobType }) => {
  let data = JOB_DATA;
  const { myJobs, postedJobs } = user;

  if (jobType === "APPLIED") {
    data = data.filter((item) => myJobs.includes(item.jobId));
  } else if (jobType === "POSTED") {
    data = postedJobs;
  }

  return data;
};

// fetch jobs according to keyword, userType, page
export const fetchJobs = async ({
  page,
  keyword = "",
  location = "",
  type,
  user,
}) => {
  let data = getSourceData({ user, jobType: type });

  const keywordValue = keyword.trim();

  // Search keyword from data json
  if (!!keywordValue || !!location) {
    data = data.filter(
      (item) =>
        (!!keywordValue ? searchByKeyword(item, keywordValue) : true) &&
        (!!location && location !== "null"
          ? searchByLocation(item, location)
          : true)
    );
  }

  await fakeDelay(1000);

  const paginatedData = data.slice((page - 1) * 2, page * 2);

  return {
    total: paginatedData.length ? data.length : paginatedData.length,
    data: paginatedData.map((item) => ({
      ...item,
    })),
  };
};

// User login
export const userLogin = async (data) => {
  await fakeDelay(1000);

  return {
    user: {
      email: data.username,
      type: data.userType,
      myJobs: [],
      postedJobs: [],
    },
  };
};

export const fetchGitHubProfile = async (_username) => {
  try {
    // const json = await fetch(` https://api.github.com/users/${username}/repos`);
    // const res = json.json();

    return GITHUB_DATA || [];
  } catch {
    return [];
  }
};

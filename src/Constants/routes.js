export const PAGE_ROUTES = {
  HOME: "/",
  JOBS: "/jobs",
  POST_JOB: "/post-job",

  LOGIN: "/login",
  LOGOUT: "/logout",
  NOT_FOUND: "/not-found",
  MY_JOBS: {
    JOBS: "/my-jobs",
    JOB_APPLICANT: (jobId) => `${jobId}/applicants`,
  },
  USERS: {
    USER: (id) => `/user/${id}`,
    PROFILE: {
      PROFILE: "profile",
      VIEW: "view",
      EDIT: "edit",
    },
  },
};

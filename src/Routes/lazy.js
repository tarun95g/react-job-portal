import {lazy} from "react";

export const LazyLoader = (loader) =>
 lazy(loader);

export const Home = LazyLoader(() => import("../Pages/Home/Home"));

export const Login = LazyLoader(() => import("../Pages/Login/Login"));
export const Logout = LazyLoader(() => import("../Pages/Logout/Logout"));

export const Jobs = LazyLoader(() => import("../Pages/Jobs/Jobs"));
export const PostJob = LazyLoader(() => import("../Pages/PostJob/PostJob"));
export const MyJobs = LazyLoader(() => import("../Pages/MyJobs/MyJobs"));

export const ApplicantList = LazyLoader(() =>
  import("../Pages/ApplicantList/ApplicantList")
);

export const Profile = LazyLoader(() => import("../Pages/Profile/Profile"));

export const NotFound = LazyLoader(() => import("../Pages/NotFound/NotFound"));

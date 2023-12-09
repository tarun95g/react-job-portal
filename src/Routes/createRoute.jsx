import { message } from "antd";
import { createBrowserRouter, redirect } from "react-router-dom";
import EditProfile from "../Components/EditProfile/EditProfile";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import ViewProfile from "../Components/ViewProfile/ViewProfile";
import { PAGE_ROUTES } from "../Constants/routes";
import { USER_TYPE } from "../Contexts/Auth/Auth";
import Root from "../Pages/Root/Root";
import { ApplicantList, Home, Jobs, Login, Logout, MyJobs, NotFound, PostJob, Profile } from "./lazy";


const PAGES = createBrowserRouter([
    {
        path: PAGE_ROUTES.HOME,
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [{
            errorElement: <ErrorPage />,
            children: [

                {
                    index: true,
                    Component: Home,
                },
                {
                    path: 'home',
                    Component: Home,
                },
                {
                    path: PAGE_ROUTES.PROFILE,
                    Component: Profile,
                },
                {
                    path: PAGE_ROUTES.POST_JOB,
                    Component: PostJob,
                },
                {
                    path: PAGE_ROUTES.JOBS,
                    Component: Jobs,
                },
                {
                    path: PAGE_ROUTES.LOGIN,
                    Component: Login
                },
                {
                    path: PAGE_ROUTES.LOGOUT,
                    Component: Logout
                },
                {
                    path: PAGE_ROUTES.MY_JOBS.JOBS,
                    children: [
                        {
                            index: true,
                            Component: MyJobs,
                        },
                        {
                            path: PAGE_ROUTES.MY_JOBS.JOB_APPLICANT(':jobId'),
                            Component: ApplicantList
                        }
                    ]
                },

                {
                    path: PAGE_ROUTES.USERS.USER(':id'),
                    children: [
                        {
                            index: true,
                            loader: () => {
                                return redirect(PAGE_ROUTES.USERS.PROFILE.PROFILE, { status: 302 })
                            }
                        },
                        {
                            path: PAGE_ROUTES.USERS.PROFILE.PROFILE,
                            Component: Profile,
                            children: [
                                {
                                    index: true,
                                    loader: () => {
                                        return redirect(PAGE_ROUTES.USERS.PROFILE.VIEW, { status: 302 })
                                    }
                                },
                                {
                                    path: PAGE_ROUTES.USERS.PROFILE.EDIT,
                                    element: <PrivateRoute type={USER_TYPE.FREELANCE} ><EditProfile /></PrivateRoute>
                                },
                                {
                                    path: PAGE_ROUTES.USERS.PROFILE.VIEW,
                                    Component: ViewProfile
                                },

                                {
                                    path: '*',
                                    loader: () => {
                                        message.info('Invalid route, Redirecting to home')
                                        return redirect(PAGE_ROUTES.HOME, { status: 302 })
                                    }
                                }
                            ]
                        }]
                },
                {
                    path: PAGE_ROUTES.NOT_FOUND,
                    Component: NotFound
                },
                {
                    path: '*',
                    loader: () => {
                        return redirect(PAGE_ROUTES.NOT_FOUND)
                    }
                },
            ],
        }]
    },
]);


const createRoute = () => {
    return PAGES;
}

export default createRoute
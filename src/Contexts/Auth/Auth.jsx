/* eslint-disable */
import React, { useContext, createContext, useReducer } from "react";
import { useEffect } from "react";
import { userLogin } from "../../api/service";
import useLocalStorage from "../../Hooks/useLocalStorage";

export const AUTH = {
    IN_PROGRESS: 'USER_IS_FETCHING',
    LOGIN: 'USER_LOGIN',
    LOGOUT: 'USER_LOGOUT',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_JOBS: 'UPDATE_USER_JOBS',
    UPDATE_USER_POST_JOBS: 'UPDATE_USER_POST_JOBS'
}

export const USER_TYPE = {
    EMPLOYER: 'EMPLOYER',
    FREELANCE: 'FREELANCER'
}

const defaultUser = {
    myJobs: [],
    postedJobs: [],
    type: undefined,
    email: '',
    details: {}
}


const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH.IN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case AUTH.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: { ...state.user, ...action.payload.user },
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                isLoading: false
            };
        case AUTH.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: defaultUser,
                token: null
            };
        case AUTH.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload.user }
            };
        case AUTH.UPDATE_USER_JOBS:
            return {
                ...state,
                user: { ...state.user, myJobs: [...state.user.myJobs, ...action.payload.jobIds] }
            };
        case AUTH.UPDATE_USER_POST_JOBS:
            return {
                ...state,
                user: { ...state.user, postedJobs: [action.payload.postedJob, ...state.user.postedJobs] }
            };
        default:
            return state;
    }
};

const initialInfo = {
    isAuthenticated: false,
    user: defaultUser,
    token: undefined,
    refreshToken: undefined,
    isLoading: false,
};

export const AuthContext = createContext({
    auth: initialInfo,
    authDispatch: () => null
});

const Auth = (props) => {
    const [user, setUser] = useLocalStorage('user', initialInfo);
    const [auth, authDispatch] = useReducer(authReducer, user);

    useEffect(() => { setUser(auth) }, [auth])

    const loginUser = async ({ userType, params }) => {
        authDispatch(
            {
                type: AUTH.IN_PROGRESS
            }
        );

        const res = await userLogin({ userType: userType, ...params });

        console.log(authDispatch({
            type: AUTH.LOGIN,
            payload: {
                user: res.user
            }
        }));
    }

    const logoutUser = async () => {
        authDispatch(
            {
                type: AUTH.LOGOUT
            }
        );
    }

    const updateMyJobs = async (jobId) => {
        authDispatch(
            {
                type: AUTH.UPDATE_USER_JOBS,
                payload: {
                    jobIds: [jobId]
                }
            }
        );
    }

    const postJob = async (job) => {
        authDispatch(
            {
                type: AUTH.UPDATE_USER_POST_JOBS,
                payload: {
                    postedJob: job
                }
            }
        );
    }

    const updateUser = (userInfo) => {
        authDispatch(
            {
                type: AUTH.UPDATE_USER,
                payload: {
                    user: userInfo
                }
            }
        );
    }


    const isUserAuthenticated = () => {
        return auth.isAuthenticated
    }


    return (
        <AuthContext.Provider value={{
            auth, authDispatch,
            loginUser, logoutUser, updateMyJobs, postJob,
            updateUser,
            isUserAuthenticated
        }}>
            {
                props.children
            }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

export default Auth;
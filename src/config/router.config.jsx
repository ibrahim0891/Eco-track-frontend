/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, useLocation } from "react-router";

import Login from "../pages/auth/Login";
import Challenges from "../pages/challanges/Challenges";
import ChallengeDetails from "../pages/challanges/ChallengeDetails";
import AddChallenges from "../pages/challanges/AddChallenges";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";

let AuthPageLoader = () => {
    return (
        <div className='p-10  text-center w-screen'>
            <h1> Authenticating...</h1>
            <p> Please wait while we authenticate you</p>
        </div>
    );
};

const PublicRoute = ({ children }) => {
    let { user } = useAuth();
    let { state } = useLocation();
   
    return user ? <Navigate to={state ?? "/"} /> : children;
};

const PrivetRoute = ({ children }) => {
    let { user } = useAuth();
    let { pathname } = useLocation();

     
    return !user
        ? (function () {
              return <Navigate to={`/auth`} state={pathname} />;
          })()
        : children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/challenges",
                element: (
                    <PrivetRoute>
                        <Challenges />
                    </PrivetRoute>
                ),
            },
            {
                path: "/challenges/:id",
                element: (
                    <PrivetRoute>
                        <ChallengeDetails />
                    </PrivetRoute>
                ),
            },
            {
                path: "/challenges/add",
                element: (
                    <PrivetRoute>
                        <AddChallenges />
                    </PrivetRoute>
                ),
            },
            {
                path: "/my-activities",
                element: (
                    <PrivetRoute>
                        <div>My Activities Page</div>
                    </PrivetRoute>
                ),
            },
            {
                path: "/my-activities/:id",
                element: (
                    <PrivetRoute>
                        <div>My Activity Details Page</div>
                    </PrivetRoute>
                ),
            },
        ],
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "register",
                element: (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                ),
            },
            {
                path: "forgot-password",
                element: (
                    <PublicRoute>
                        <ForgetPasswordPage />
                    </PublicRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <div>404 Not Found</div>,
    },
]);

export default router;

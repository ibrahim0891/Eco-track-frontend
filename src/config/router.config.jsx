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
    let { user, loading } = useAuth();
    let { state } = useLocation();

    if (loading) {
        return <AuthPageLoader />;
    }
    return user ? <Navigate to={state ?? "/"} /> : children;
};

const PrivetRoute = ({ children }) => {
    let { user, loading } = useAuth();
    let { pathname } = useLocation();

    if (loading) {
        return <AuthPageLoader />;
    }

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
                element:<Home />,
            },
            {
                path: "/challenges",
                element: <Challenges />,
            },
            {
                path: "/challenges/:id",
                element: <ChallengeDetails />,
            },
            {
                path: "/challenges/add",
                element: <AddChallenges />,
            },
            {
                path: "/my-activities",
                element: <div>My Activities Page</div>,
            },
            {
                path: "/my-activities/:id",
                element: <div>My Activity Details Page</div>,
            },
        ],
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "forgot-password",
                element: <ForgetPasswordPage />,
            },
        ],
    },
    {
        path: "*",
        element: <div>404 Not Found</div>,
    },
]);


export default router;

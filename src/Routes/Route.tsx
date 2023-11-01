import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilPage";
// import ErrorPage from "../Pages/PageNotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <DashboardPage />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
    // {
    //     path: "*",
    //     element: <ErrorPage />
    // }
]);
import { lazy } from "react";
import { lazyLoaded } from "hocs/lazyLoaded";
import { RouteProps } from "react-router-dom";
import Navigate from "components/Link/Navigate";

const HomeView = lazyLoaded(lazy(() => import("app/views/Home/Home")));
const Error404View = lazyLoaded(lazy(() => import("app/views/404/404")));
const Login = lazyLoaded(lazy(() => import("app/views/Login/Login")));

export const ROUTES: RouteProps[] = [
    { path: "/", element: <Navigate to="/" />, index: true },
    { path: "/:lang", Component: HomeView, index: true },
    { path: "/:lang/login", Component: Login },
    { path: "/*", Component: Error404View },
];

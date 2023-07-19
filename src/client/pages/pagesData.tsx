import { routerType } from "../interfaces/router.types";
import CouldNotFind from "./404";
import Home from "./home";
import Login from "./login";
import OauthLoginPage from "./LoginOauth";
import Logout from "./logout";
import Register from "./register";
import { Trips, CreateTrips, TripModify } from "./trips";

const pagesData: routerType[] = [
  {
    path: "/login",
    element: <Login />,
    title: "Log in",
  },
  {
    path: "*",
    element: <CouldNotFind />,
    title: "404 Could not find",
  },
  {
    path: "/logout",
    element: <Logout />,
    title: "Logout",
  },
  {
    path: "/register",
    element: <Register />,
    title: "Register",
  },
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/trips",
    element: <Trips />,
    title: "Home",
  },
  {
    path: "/trips/create",
    element: <CreateTrips />,
    title: "Home",
  },
  {
    path: "/trip/:id",
    element: <TripModify />,
    title: "Trip config",
  },
  {
    path: "/oauthlogin",
    element: <OauthLoginPage />,
    title: "Trip config",
  },
];

export default pagesData;

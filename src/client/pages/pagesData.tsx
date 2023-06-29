import { routerType } from "../types/router.types";
import CouldNotFind from "./404";
import Home from "./home";
import Login from "./login";
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
    path: "/trips/:id",
    element: <TripModify />,
    title: "Trip config",
  },
];

export default pagesData;

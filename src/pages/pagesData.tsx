import { routerType } from "../types/router.types";
import CouldNotFind from "./404";
import Home from "./home";
import Login from "./login";
import Logout from "./logout";
import Register from "./register";
import Trips from "./trips";

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
];

export default pagesData;

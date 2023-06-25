import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Logout from "./components/Logout";
import NoMatchingRoutes from "./components/nomatchingroutes";
import Register from "./components/register";
import React from "react";

interface RoutesInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const AppRoutes = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserName,
}: RoutesInterface) => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
          }
        />
        {/* <Route path="/challenges" element={<Challenges />} /> */}
        {/* <Route
        path="/AddChallenge"
        element={<AddChallenge isLoggedIn={isLoggedIn} />}
      /> */}
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoMatchingRoutes />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

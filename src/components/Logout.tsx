import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface LogoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

function Logout({ setIsLoggedIn, setUserName }: LogoutProps) {
  const [logoutError, setLogoutError] = useState<string>("");
  const navigate = useNavigate();

  const logoutMutation = useMutation(() =>
    axios.post("http://localhost:8080/logout", { withCredentials: true })
  );

  async function attemptLogout() {
    try {
      const response = await logoutMutation.mutateAsync();
      console.log(response);
      Cookies.remove("connect.sid", { path: "/", domain: "localhost" });
      setIsLoggedIn(false);
      setUserName("");
    } catch (err) {
      console.error(err);
    } finally {
      window.location.replace("/challenges");
    }
  }

  useEffect(() => {
    attemptLogout();
  }, []);

  return (
    <>
      <div>Error: {logoutError} </div>
    </>
  );
}

export default Logout;

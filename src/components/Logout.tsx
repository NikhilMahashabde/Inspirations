import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface LogoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

type ErrorResponse = {
  response: {
    data: {
      message?: string;
    };
  };
};

function Logout({ setIsLoggedIn, setUserName }: LogoutProps) {
  const [logoutError, setLogoutError] = useState<string>("");
  const navigate = useNavigate();

  const logoutMutation = useMutation(
    () => axios.post("/logout", { withCredentials: true }),
    {
      onSuccess: (response) => {
        setIsLoggedIn(false);
        console.log(response);
        setUserName("");
        Cookies.remove("connect.sid", { path: "/", domain: "localhost" });
        navigate("/");
      },
      onError: (error: ErrorResponse) => {
        setLogoutError(error.response.data.message || "");
      },
    }
  );

  async function attemptLogout() {
    await logoutMutation.mutateAsync();
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

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";

type ErrorResponse = {
  response: {
    data: {
      message?: string;
    };
  };
};

function LogoutForm() {
  const [logoutError, setLogoutError] = useState<string>("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserName } = useContext(AuthContext);

  const logoutMutation = useMutation(
    () => axios.post("/logout", { withCredentials: true }),
    {
      onSuccess: () => {
        setIsAuthenticated(false);
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

  if (logoutMutation.isLoading) {
    return <div>Logging out.... please wait....</div>;
  }
  return (
    <>
      <div>Error: {logoutError} </div>
    </>
  );
}

export default LogoutForm;

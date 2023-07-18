import axios from "axios";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { DataContext } from "../../context/AppContext";

type ErrorResponse = {
  response: {
    data: {
      message?: string;
    };
  };
};

function LogoutForm() {
  const {
    setIsAuthenticated,
    setUserName,
    navigate,
    errorResponse,
    setErrorResponse,
  } = useContext(DataContext);

  const logoutMutation = useMutation(
    () => axios.post("/api/logout", { withCredentials: true }),
    {
      onSuccess: () => {
        setIsAuthenticated(false);
        setUserName("");
        Cookies.remove("connect.sid", { path: "/", domain: "localhost" });
        setErrorResponse("");
        navigate("/");
      },
      onError: (error: ErrorResponse) => {
        setErrorResponse(error.response.data.message || "");
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
      <div>Error: {errorResponse} </div>
    </>
  );
}

export default LogoutForm;

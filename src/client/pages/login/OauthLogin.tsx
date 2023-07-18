import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { LoginButton } from "../../components/buttons/login-button";
import { useAuth0 } from "@auth0/auth0-react";

function OauthLogin() {
  const { getAccessTokenSilently } = useAuth0();

  const {
    setIsAuthenticated,
    setUserName,
    userName,
    navigate,
    setErrorResponse,
  } = useContext(DataContext);

  const loginStateMutationJWT = useMutation(
    (accessToken: string) =>
      axios.get("/auth/login", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }),
    {
      onSuccess: (response) => {
        setIsAuthenticated(response.data.isAuthenticated);
        setUserName(response.data.name);
        navigate("/trips");
      },
      onError: (error: { response: { data: { error: string } } }) => {
        console.log(error.response.data);
        setErrorResponse(error.response.data.error);
        navigate("/login");
      },
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        await loginStateMutationJWT.mutateAsync(accessToken);
      } catch (error) {
        /* empty */
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loginStateMutationJWT.isLoading && (
        <div> mutation has started loading</div>
      )}
      {loginStateMutationJWT.isSuccess && <div> mutation has successed</div>}
      trying to load
      {userName}
    </>
  );
}

export default OauthLogin;

import axios from "axios";
import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";

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
        <div>
          {" "}
          Attempting to login with your Single sign on account.... please wait
        </div>
      )}
      {loginStateMutationJWT.isSuccess && (
        <div> Succes!....Welcome {userName}, Redirecting.....</div>
      )}
    </>
  );
}

export default OauthLogin;

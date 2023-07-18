import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { LoginButton } from "../../components/buttons/login-button";

interface LoginFormData {
  email: string;
  password: string;
  [key: string]: string;
}

interface LoginResponse {
  data: {
    success: boolean;
    name: string;
  };
}

type ErrorResponse = {
  response: {
    data: {
      message?: string;
    };
  };
};

function LoginForm() {
  const {
    setIsAuthenticated,
    setUserName,
    navigate,
    errorResponse,
    setErrorResponse,
    isAuthenticated,
  } = useContext(DataContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation(
    (loginFormData: LoginFormData) =>
      axios.post<ErrorResponse, LoginResponse>("/api/login", loginFormData, {
        withCredentials: true,
      }),
    {
      onSuccess: (response) => {
        setIsAuthenticated(true);
        setUserName(response.data.name);
        navigate("/");
      },
      onError: (error: ErrorResponse) => {
        setErrorResponse(error.response.data.message || "");
      },
    }
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await loginMutation.mutateAsync(loginFormData);
  };

  return (
    <div>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginFormData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginFormData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Login</button>

        {loginMutation.isLoading && <div>Loading...</div>}
        {loginMutation.isError && <div>Error: {errorResponse}</div>}
      </form>
      {!isAuthenticated && <LoginButton />}
      {errorResponse && <div>Error: {errorResponse}</div>}
    </div>
  );
}

export default LoginForm;

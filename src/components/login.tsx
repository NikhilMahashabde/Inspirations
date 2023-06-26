import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

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

interface LoginError {
  message: string;
  name: string;
}

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function Login({ setIsLoggedIn, setUserName, setCount }: LoginProps) {
  const [errorResponse, setErrorResponse] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [setCount]);

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

  type ErrorResponse = {
    response: {
      data: {
        message?: string;
      };
    };
  };

  const loginMutation = useMutation(
    (loginFormData: LoginFormData) =>
      axios.post<ErrorResponse, LoginResponse>("/login", loginFormData, {
        withCredentials: true,
      }),
    {
      onSuccess: (response) => {
        setIsLoggedIn(true);
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

    Object.keys(loginFormData).map((key: string) => {
      console.log(`${key}: ${loginFormData[key]}`);
      return null;
    });

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
    </div>
  );
}

export default Login;

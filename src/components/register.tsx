import axios from "axios";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

interface LoginFormData {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
}

type ErrorResponse = {
  response: {
    data: {
      message?: string;
    };
  };
};

function Register() {
  const [registerError, setRegisterError] = useState<string>("");
  const [registerSuccess, setRegisterSuccess] = useState<string>("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserName } = useContext(AuthContext);

  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  type RegisterError = {
    response: {
      data: {
        message?: string;
      };
    };
  };

  interface RegisterSuccess {
    data: {
      success: boolean;
      name: string;
    };
  }

  const registerMutation = useMutation(
    (formData: LoginFormData) =>
      axios.post<RegisterError, RegisterSuccess>("/api/users", formData),
    {
      onSuccess: (response) => {
        setIsLoggedIn(true);
        setUserName(response.data.name);
        setRegisterError("");
        navigate("/");
      },
      onError: (error: ErrorResponse) => {
        setRegisterError(error.response.data.message || "");
      },
    }
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Object.entries(formData).forEach(([key,value]) => {
    // console.log(key, ":", value)
    // })

    await registerMutation.mutateAsync(formData);
  };

  return (
    <>
      <h2>Register user page</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Verify Password:</label>
            <input
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              value={formData.verifyPassword}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Register User</button>

          {registerMutation.isLoading && <div>Loading...</div>}
          {registerMutation.isError && <div>Error: {registerError}</div>}
          {registerMutation.isSuccess && <div> {registerSuccess}</div>}
        </form>
      </div>
    </>
  );
}

export default Register;

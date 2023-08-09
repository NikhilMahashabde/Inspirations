import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { LoginButton } from "../../components/buttons/login-button";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

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

  if (isAuthenticated) navigate("/");

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
      <form onSubmit={handleSubmit}>
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading fontSize={"2xl"}>Sign in to your account</Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.500"}>Forgot password?</Text>
                </Stack>
                <Button colorScheme={"blue"} variant={"solid"} type="submit">
                  Sign in
                </Button>
                {!isAuthenticated && <LoginButton />}

                {loginMutation.isLoading && <div>Loading...</div>}
                {loginMutation.isError && <div>Error: {errorResponse}</div>}

                {errorResponse && <div>Error: {errorResponse}</div>}
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={"Login Image"}
              objectFit={"cover"}
              src={
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
              }
            />
          </Flex>
        </Stack>
      </form>
    </div>
  );
}

export default LoginForm;

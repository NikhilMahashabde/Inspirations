import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import "./css/styles.css";
import { DataContext } from "../../context/AppContext";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface LoginFormData {
  name: string;
  lastname: string;
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

export default function RegisterForm() {
  const { setIsAuthenticated, setUserName, navigate } = useContext(DataContext);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    lastname: "",
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
        setIsAuthenticated(true);
        setUserName(response.data.name);
        toast({
          title: "User Registered!",
          description: "Redirecting to your space",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // setRegisterError("");
        navigate("/");
      },
      onError: (error: ErrorResponse) => {
        // setRegisterError(error.response.data.message || "");
        toast({
          title: "Failed to create user",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please try again",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } else {
      await registerMutation.mutateAsync(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Verify Password</FormLabel>
                <InputGroup>
                  <Input
                    id="verifyPassword"
                    name="verifyPassword"
                    value={formData.verifyPassword}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                {!registerMutation.isLoading && (
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                    {registerMutation.isLoading && (
                      <Spinner color="green.500" />
                    )}
                  </Button>
                )}
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/oauthlogin",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <>
      <Button
        w={"full"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
        onClick={handleLogin}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
      <Button
        w={"full"}
        variant={"outline"}
        leftIcon={<AiFillGithub />}
        onClick={handleLogin}
      >
        <Center>
          <Text>Sign in with Github</Text>
        </Center>
      </Button>
    </>
  );
};

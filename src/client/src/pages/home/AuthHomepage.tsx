import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AuthHomepage() {
  const navigate = useNavigate();
  navigate("/trips");

  return (
    <>
      <Heading size="4xl" color="gray.500">
        Inspirations
      </Heading>
    </>
  );
}

import { useDisclosure, Button } from "@chakra-ui/react";
import AddNodeModalWrapper from "./AddNodeModalWrapper";
import { BsHouseAddFill } from "react-icons/bs";

export function AddNodeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        // bg={useColorModeValue("yellow.400", "yellow.800")}
        variant="outline"
        // color={useColorModeValue("white", "gray.800")}
        colorScheme="teal"
        _hover={{
          bg: "red.600",
        }}
        aria-label="Subscribe"
        leftIcon={<BsHouseAddFill />}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        Add Travel Leg
      </Button>

      <AddNodeModalWrapper isOpen={isOpen} onClose={onClose} />
    </>
  );
}

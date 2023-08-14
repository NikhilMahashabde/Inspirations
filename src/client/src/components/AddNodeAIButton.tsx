import { useDisclosure, Button } from "@chakra-ui/react";
import AddNodeAIModalWrapper from "../pages/trips/AddNodeAIModal/AddNodeAIModalWrapper";
import { BsHouseAddFill } from "react-icons/bs";

export function AddNodeAIButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        // bg={useColorModeValue("yellow.400", "yellow.800")}
        variant="outline"
        // color={useColorModeValue("white", "gray.800")}
        colorScheme="teal"
        _hover={{
          bg: "green.600",
        }}
        aria-label="AI node generate"
        leftIcon={<BsHouseAddFill />}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        Generate Leg with AI
      </Button>

      <AddNodeAIModalWrapper isOpen={isOpen} onClose={onClose} />
    </>
  );
}

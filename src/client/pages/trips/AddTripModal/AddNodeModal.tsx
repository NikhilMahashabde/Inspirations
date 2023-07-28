import { useDisclosure, IconButton, useColorModeValue } from "@chakra-ui/react";
import AddNodeModalWrapper from "./AddNodeModalWrapper";
import { BsHouseAddFill } from "react-icons/bs";

export function AddNodeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        bg={useColorModeValue("yellow.400", "yellow.800")}
        color={useColorModeValue("white", "gray.800")}
        _hover={{
          bg: "red.600",
        }}
        aria-label="Subscribe"
        icon={<BsHouseAddFill />}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      />

      <AddNodeModalWrapper isOpen={isOpen} onClose={onClose} />
    </>
  );
}

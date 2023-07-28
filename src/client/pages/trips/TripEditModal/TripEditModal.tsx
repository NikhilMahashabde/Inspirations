import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { DataContext } from "../../../context/AppContext";
import { EditTripDataForm } from "./EditTripDataForm";
import EditTripModalWrapper from "./EditTripModalWrapper";

export function TripEditModal({ index }: { index: number }) {
  const { tripData } = useContext(DataContext);

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
        icon={<AiFillEdit />}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      />
      <EditTripModalWrapper
        index={index}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

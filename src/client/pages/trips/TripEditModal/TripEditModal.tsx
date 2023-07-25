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
import { useContext } from "react";
import { AiFillEdit } from "react-icons/ai";
import { DataContext } from "../../../context/AppContext";
import { EditTripDataForm } from "./EditTripDataForm";

export function TripEditModal({ index }: { index: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { tripData } = useContext(DataContext);

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
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tripData?.nodes[index].destination}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditTripDataForm index={index} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

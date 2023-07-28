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
import { DataContext } from "../../../context/AppContext";
import { EditTripDataForm } from "./EditTripDataForm";

export function EditTripModalWrapper({
  index,
  onOpen,
  onClose,
  isOpen,
}: {
  index: number;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}) {
  const { tripData } = useContext(DataContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{tripData?.nodes[index]?.destination}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditTripDataForm index={index} />
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditTripModalWrapper;

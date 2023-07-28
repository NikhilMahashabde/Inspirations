import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddNodeDataForm } from "./AddNodeDataForm";

export function AddTripModalWrapper({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Trip!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddNodeDataForm />
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

export default AddTripModalWrapper;

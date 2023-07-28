import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { BsHouseAddFill } from "react-icons/bs";
import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { useContext, useRef, useState } from "react";

const AddAccomodationButton = ({ id }: { id: string | undefined }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { tripData, setTripData } = useContext(DataContext);

  const data = {
    _id: id,
    addNodeType: "accomodation",
  };
  const [index, setIndex] = useState(tripData.nodes.length + 1);

  const AddAccomodationMutation = useMutation(
    () => axios.post(`/api/trip/${id}`, data),

    {
      onSuccess: (response) => {
        setTripData(response.data.trip);
        console.log(response.data.trip.nodes.length);
        setIndex(response.data.trip.nodes.length);
        onOpen();
      },

      onError: () => console.log("failed to add leg"),
    }
  );

  const AddAccomodationToTrip = async () => {
    if (id) AddAccomodationMutation.mutateAsync();
  };

  return (
    <>
      <Button
        variant="outline"
        colorScheme="teal"
        leftIcon={<BsHouseAddFill />}
        onClick={AddAccomodationToTrip}
      >
        Add Accomadation
      </Button>
      {/* <EditTripModalWrapper
        index={index}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
    </>

    // <IconButton
    //   variant="outline"
    //   colorScheme="teal"
    //   aria-label="Call Sage"
    //   fontSize="20px"
    //   icon={<BsHouseAddFill />}
    //   onClick={AddAccomodationToTrip}
    // />
  );
};

export default AddAccomodationButton;

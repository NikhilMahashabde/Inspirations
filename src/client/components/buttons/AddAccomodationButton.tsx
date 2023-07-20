import { IconButton } from "@chakra-ui/react";
import axios from "axios";
import { BsHouseAddFill } from "react-icons/bs";
import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { useContext } from "react";

const AddAccomodationButton = ({ id }: { id: string | undefined }) => {
  const { setTripData } = useContext(DataContext);
  const data = {
    _id: id,
    addNodeType: "accomodation",
  };

  const AddAccomodationMutation = useMutation(
    () => axios.post(`/api/trip/${id}`, data),

    {
      onSuccess: (response) => {
        console.log(response.data);
        setTripData(response.data.trip);
      },

      onError: () => console.log("failed to add leg"),
    }
  );

  const AddAccomodationToTrip = async () => {
    if (id) AddAccomodationMutation.mutateAsync();
  };

  return (
    <IconButton
      variant="outline"
      colorScheme="teal"
      aria-label="Call Sage"
      fontSize="20px"
      icon={<BsHouseAddFill />}
      onClick={AddAccomodationToTrip}
    />
  );
};

export default AddAccomodationButton;

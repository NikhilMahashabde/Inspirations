import { Button } from "@chakra-ui/react";
import axios from "axios";
import { MdOutlineSportsTennis } from "react-icons/md";
import { useMutation } from "react-query";
import { DataContext } from "../src/client/context/AppContext";
import { useContext } from "react";

const AddActivityButton = ({ id }: { id: string | undefined }) => {
  const { setTripData } = useContext(DataContext);
  const data = {
    _id: id,
    addNodeType: "activity",
  };

  const AddActivityMutation = useMutation(
    () => axios.post(`/api/trip/${id}`, data),

    {
      onSuccess: (response) => {
        console.log(response.data);
        setTripData(response.data.trip);
      },

      onError: () => console.log("failed to add activity"),
    }
  );

  const AddActivityToTrip = async () => {
    if (id) AddActivityMutation.mutateAsync();
  };

  return (
    <Button
      variant="outline"
      colorScheme="teal"
      leftIcon={<MdOutlineSportsTennis />}
      onClick={AddActivityToTrip}
    >
      Add Activity
    </Button>
    // <IconButton
    //   variant="outline"
    //   colorScheme="teal"
    //   aria-label="Call Sage"
    //   fontSize="20px"
    //   icon={<MdOutlineSportsTennis />}
    //   onClick={AddActivityToTrip}
    // >
    //   Add Activity
    // </IconButton>
  );
};

export default AddActivityButton;

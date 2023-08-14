import { Button } from "@chakra-ui/react";
import axios from "axios";

import { GiCommercialAirplane } from "react-icons/gi";
import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { useContext } from "react";

const AddLegButton = ({ id }: { id: string | undefined }) => {
  const { setTripData } = useContext(DataContext);
  const data = {
    _id: id,
    addNodeType: "leg",
  };

  const AddTravelMutation = useMutation(
    () => axios.post(`/api/trip/${id}`, data),

    {
      onSuccess: (response) => {
        setTripData(response.data.trip);
      },

      onError: () => console.log("failed to add leg"),
    }
  );

  const AddTravelToTrip = async () => {
    if (id) AddTravelMutation.mutateAsync();
  };

  return (
    <Button
      variant="outline"
      colorScheme="teal"
      leftIcon={<GiCommercialAirplane />}
      onClick={AddTravelToTrip}
    >
      Add Travel
    </Button>
    // <IconButton
    //   variant="outline"
    //   colorScheme="teal"
    //   aria-label="Call Sage"
    //   fontSize="20px"
    //   icon={<GiCommercialAirplane />}
    //   onClick={AddAccomodationToTrip}
    // />
  );
};

export default AddLegButton;

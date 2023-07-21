import { Grid, GridItem } from "@chakra-ui/react";
import { ItinerarySegmentStop } from "@kiwicom/orbit-components/lib/Itinerary";
import { useContext } from "react";
import { TripNode } from "../../../server/model/trips";
import { useMutation } from "react-query";
import axios from "axios";
import {
  MyTripsInterface,
  TripData,
  UpdateTripResponse,
} from "../../interfaces/interfaces.types";
import { DataContext } from "../../context/AppContext";
import { Button } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { BsFileArrowDown, BsFileArrowUp } from "react-icons/bs";
import _ from "lodash"; // Import Lodash

interface DeleteResponse {
  updatedTrip: TripData;
}
const AccomadationRow = ({
  node,
  index,
}: {
  node: TripNode;
  index: number;
}) => {
  const { setTripData, tripData } = useContext(DataContext);

  const data = {
    id: tripData?._id || "",
    index: index,
  };

  const deleteRowMutation = useMutation(
    (data: { id: string | null; index: number }) =>
      axios.delete<DeleteResponse>(`/api/trip/${data.id}`, {
        data,
      }),
    {
      onSuccess: (res) => {
        setTripData(res.data.updatedTrip);
      },
      onError: (res: { error: string }) => {
        console.log(res);
      },
    }
  );

  const UpdateTripMutation = useMutation(
    (data: MyTripsInterface) =>
      axios.put<UpdateTripResponse>(`/api/trip/${data._id}`, {
        data,
      }),
    {
      onSuccess: (res) => {
        setTripData(res.data.updatedTrip);
      },
      onError: (res: { error: string }) => {
        console.log(res);
      },
    }
  );

  const deleteRow = async () => {
    deleteRowMutation.mutateAsync(data);
  };

  const MoveRowUp = async () => {
    if (index == 0 || !tripData) return null;
    const updateTripData = _.cloneDeep(tripData);
    [updateTripData.nodes[index - 1], updateTripData.nodes[index]] = [
      updateTripData.nodes[index],
      updateTripData.nodes[index - 1],
    ];

    UpdateTripMutation.mutateAsync(updateTripData);
  };

  const MoveRowDown = async () => {
    if (!tripData || index == tripData.nodes.length - 1) return null;
    const updateTripData = _.cloneDeep(tripData);
    [updateTripData.nodes[index + 1], updateTripData.nodes[index]] = [
      updateTripData.nodes[index],
      updateTripData.nodes[index + 1],
    ];
    UpdateTripMutation.mutateAsync(updateTripData);
  };

  return (
    <div style={{ width: "100%" }}>
      <Grid
        templateColumns={{
          base: "repeat(100, 1fr)",
        }}
      >
        <GridItem colSpan={80} style={{ gridColumn: "span 90" }}>
          <ItinerarySegmentStop
            city={node.origin || "N/A"}
            station="Sheremetyevo International Airport (SVO)sdaaddddssssssssssssssssssssssdddss"
            date="Fri, 19.10"
            time="14:05"
          />
        </GridItem>

        <GridItem>
          <Button
            variant="outline"
            colorScheme="red"
            leftIcon={<AiFillDelete />}
            onClick={deleteRow}
          ></Button>
          {/* <button onClick={deleteRow}>Del Row</button> */}
        </GridItem>
        <GridItem>
          <Button
            variant="outline"
            colorScheme="red"
            leftIcon={<BsFileArrowUp />}
            onClick={MoveRowUp}
          ></Button>
        </GridItem>
        <GridItem>
          <Button
            variant="outline"
            colorScheme="red"
            leftIcon={<BsFileArrowDown />}
            onClick={MoveRowDown}
          ></Button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default AccomadationRow;

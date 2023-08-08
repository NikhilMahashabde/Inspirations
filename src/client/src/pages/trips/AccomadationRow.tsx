import {
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ItinerarySegmentDetail,
  ItinerarySegmentStop,
} from "@kiwicom/orbit-components/lib/Itinerary";
import { useContext, useState } from "react";
import { TripNode } from "../../../../server/src/model/trips";
import { useMutation } from "react-query";
import axios from "axios";
import {
  MyTripsInterface,
  UpdateTripResponse,
} from "../../interfaces/interfaces.types";
import { DataContext } from "../../context/AppContext";

import { AiFillDelete } from "react-icons/ai";
import { BsFileArrowDown, BsFileArrowUp } from "react-icons/bs";
import _ from "lodash"; // Import Lodash
import { TripEditModal } from "./TripEditModal/TripEditModal";
import { Icons } from "@kiwicom/orbit-components";

interface DeleteResponse {
  updatedTrip: MyTripsInterface;
}
const AccomadationRow = ({
  node,
  index,
}: {
  node: TripNode;
  index: number;
}) => {
  const { setTripData, tripData } = useContext(DataContext);
  const [isExpanded, setIsExpanded] = useState(false);

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

  //date and time formatting for output
  const startTimeDate = new Date(node.startTime);

  const timeString = startTimeDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const dateString = startTimeDate.toLocaleDateString(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  // time durration formatting.

  return (
    <div style={{ width: "100%" }}>
      <Grid
        templateColumns={{
          base: "repeat(100, 1fr)",
        }}
      >
        <GridItem
          colSpan={80}
          style={{ gridColumn: "span 90" }}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {!isExpanded && (
            <ItinerarySegmentStop
              city={node.destination || "No Destination Entered"}
              station={node.description || "No Description Entered"}
              date={dateString}
              time={timeString}
            />
          )}
          {isExpanded && (
            <ItinerarySegmentDetail
              icon={<Icons.Accommodation size="small" />}
              duration="2h 30m"
              summary={<h1>gasdgasgasg</h1>}
            />
          )}
        </GridItem>

        {/* Pop up box for edditing the data etc.  */}
        <GridItem>
          <TripEditModal index={index} />
        </GridItem>

        {/* Edit move and delte buttons   */}
        <GridItem>
          <IconButton
            bg={useColorModeValue("gray.400", "gray.800")}
            color={useColorModeValue("white", "gray.800")}
            _hover={{
              bg: "blue.600",
            }}
            aria-label="Move Row Down"
            icon={<BsFileArrowUp />}
            onClick={MoveRowUp}
          />
        </GridItem>
        <GridItem>
          <IconButton
            bg={useColorModeValue("gray.400", "gray.800")}
            color={useColorModeValue("white", "gray.800")}
            _hover={{
              bg: "blue.600",
            }}
            aria-label="Move Row Down"
            icon={<BsFileArrowDown />}
            onClick={MoveRowDown}
          />
        </GridItem>
        <GridItem>
          <IconButton
            bg={useColorModeValue("red.400", "red.800")}
            color={useColorModeValue("white", "gray.800")}
            _hover={{
              bg: "red.600",
            }}
            aria-label="Subscribe"
            icon={<AiFillDelete />}
            onClick={deleteRow}
          />
        </GridItem>
      </Grid>
    </div>
  );
};

export default AccomadationRow;

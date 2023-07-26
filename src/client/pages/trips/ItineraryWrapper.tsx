import Itinerary, {
  ItinerarySegment,
  ItineraryStatus,
  ItineraryBadgeList,
  ItinerarySegmentStop,
  ItinerarySegmentDetail,
} from "@kiwicom/orbit-components/lib/Itinerary";
import { useContext } from "react";
import { DataContext } from "../../context/AppContext";
import { TripNode } from "../../../server/model/trips";
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import AccomadationRow from "./AccomadationRow";
import LegRow from "./LegRow";
import { Badge, Icons } from "@kiwicom/orbit-components";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

const ItineraryWrapper = () => {
  const { tripData } = useContext(DataContext);

  const getTimeString = (timeObj: Date) =>
    timeObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const getDateString = (timeObj: Date) =>
    timeObj.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    tripData && (
      <Itinerary>
        <ItinerarySegment spaceAfter="medium">
          <ItinerarySegmentStop
            city={tripData.startLocation}
            station={""}
            date={getTimeString(new Date(tripData.startDate))}
            time={getDateString(new Date(tripData.startDate))}
          />

          {tripData.nodes.map((node: TripNode, index) => (
            <LegRow node={node} index={index} />
          ))}

          <ItinerarySegmentStop
            city={tripData.endLocation}
            station={""}
            date={getTimeString(new Date(tripData.endDate))}
            time={getDateString(new Date(tripData.endDate))}
          />
        </ItinerarySegment>
      </Itinerary>
    )
  );
};

export default ItineraryWrapper;

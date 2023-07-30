import Itinerary, {
  ItinerarySegment,
  ItineraryStatus,
  ItineraryBadgeList,
  ItinerarySegmentStop,
  ItinerarySegmentDetail,
} from "@kiwicom/orbit-components/lib/Itinerary";
import { useContext, useEffect } from "react";
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
import { Trip } from "@kiwicom/orbit-components/icons";

const ItineraryWrapper = () => {
  const { tripData, isRowExpanded, setIsRowExpanded } = useContext(DataContext);

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

  useEffect(() => {
    tripData.nodes.map((node, index) =>
      setIsRowExpanded((prev) => {
        const newArr = [...prev];
        newArr[index] = false;
        return newArr;
      })
    );
  }, []);

  return (
    tripData && (
      <Itinerary>
        <ItinerarySegment spaceAfter="medium">
          <ItinerarySegmentStop
            icon={<Trip size="small" />}
            city={tripData.startLocation}
            station={""}
            date={getTimeString(new Date(tripData.startDate))}
            time={getDateString(new Date(tripData.startDate))}
          />

          {tripData.nodes.map((node: TripNode, index) => (
            <LegRow key={index} node={node} index={index} />
          ))}

          <ItinerarySegmentStop
            icon={<Trip size="small" />}
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

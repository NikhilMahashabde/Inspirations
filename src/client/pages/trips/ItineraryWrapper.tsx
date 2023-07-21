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
import { Box, Grid, GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import AccomadationRow from "./AccomadationRow";
import LegRow from "./LegRow";
import { Badge, Icons } from "@kiwicom/orbit-components";
import React from "react";

const ItineraryWrapper = () => {
  const { tripData } = useContext(DataContext);

  return (
    tripData && (
      <Itinerary>
        <ItinerarySegment spaceAfter="medium">
          {tripData.nodes.map((node: TripNode, index) => (
            <React.Fragment key={index}>
              {(node.nodeType === "accomodation" ||
                node.nodeType === "activity") && (
                <AccomadationRow node={node} index={index} />
              )}
              {node.nodeType === "leg" && <LegRow node={node} index={index} />}
            </React.Fragment>
          ))}
        </ItinerarySegment>
      </Itinerary>
    )
  );
};

export default ItineraryWrapper;

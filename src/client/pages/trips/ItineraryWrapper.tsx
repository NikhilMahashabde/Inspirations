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

  return (
    tripData && (
      <Itinerary>
        <ItinerarySegment spaceAfter="medium">
          {tripData.nodes.map((node: TripNode, index) => (
            <React.Fragment key={index}>
              {/* {(node.nodeType === "accomodation" ||
                    node.nodeType === "activity") && (
                    <AccomadationRow node={node} index={index} />
                  )} */}

              {node.nodeType === "leg" && (
                <>
                  <LegRow node={node} index={index} />
                </>
              )}
            </React.Fragment>
          ))}
        </ItinerarySegment>

        {/* <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(9, 1fr)",
              }}
            > */}
        {/* <ItinerarySegmentDetail
                icon={<Icons.Airplane size="small" />}
                duration="2h 30m"
                summary={
                  <div>
                    test summaryddddddddummaryddddummarydffffffffffffffffffffddd
                  </div>
                } */}
        {/* /> */}
        {/* </div> */}
      </Itinerary>

      // <Itinerary>
      //   {tripData.nodes.map((node: TripNode, index) => (
      //     <React.Fragment key={index}>
      //       {node.nodeType === "leg" && (
      //         <>
      //           <IconButton
      //             bg={useColorModeValue("yellow.400", "yellow.800")}
      //             color={useColorModeValue("white", "gray.800")}
      //             _hover={{
      //               bg: "red.600",
      //             }}
      //             aria-label="Subscribe"
      //             icon={<AiFillEdit />}
      //             onClick={() => console.log("hi;")}
      //           />
      //         </>
      //       )}
      //     </React.Fragment>
      //   ))}
      // </Itinerary>

      /* 
        <GridItem colSpan={1}>
          <ItinerarySegment spaceAfter="medium">
            {tripData.nodes.map((node: TripNode, index) => (
              <React.Fragment key={index}>
                {(node.nodeType === "accomodation" ||
                  node.nodeType === "activity") && (
                  <AccomadationRow node={node} index={index} />
                )}
                {node.nodeType === "leg" && (
                  <>
                    <LegRow node={node} index={index} />
                  </>
                )}
              </React.Fragment>
            ))}
          </ItinerarySegment>
        </GridItem> */
    )
  );
};

export default ItineraryWrapper;

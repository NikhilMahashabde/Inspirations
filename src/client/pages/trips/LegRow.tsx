import { Grid, GridItem } from "@chakra-ui/react";
import {
  ItinerarySegmentBanner,
  ItinerarySegmentDetail,
  ItinerarySeparator,
} from "@kiwicom/orbit-components/lib/Itinerary";
import { TripNode } from "../../../server/model/trips";
import { Badge } from "@kiwicom/orbit-components/lib";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Icons } from "@kiwicom/orbit-components";

const LegRow = ({ node, index }: { node: TripNode; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };
  return (
    <div style={{ width: "100%" }}>
      <Grid
        templateColumns={{
          base: "repeat(100, 1fr)",
        }}
      >
        <GridItem colSpan={80} style={{ gridColumn: "span 90" }}>
          <>
            <div onClick={handleToggle}>
              <Grid
                templateColumns={{
                  base: "repeat(100, 1fr)",
                }}
              >
                <GridItem colSpan={80} style={{ gridColumn: "span 90" }}>
                  <ItinerarySegmentDetail
                    icon={<Icons.Airplane size="small" />}
                    duration="2h 30m"
                    summary={
                      <Badge
                        carriers={[
                          {
                            code: "FR",
                            name: "Ryanair",
                          },
                        ]}
                      >
                        {!isExpanded && (
                          <p>Travel to {node.destination || "TBA"} </p>
                        )}
                        {isExpanded && (
                          <>
                            <p>Travel to {node.destination || "TBA"} </p>
                            <p>From:{node.origin || "TBA"} </p>
                            <p>From:{node.destination || "TBA"} </p>
                            <p>From:{node.destination || "TBA"} </p>
                          </>
                        )}
                      </Badge>
                    }
                  />
                </GridItem>
                {isExpanded && <MdExpandLess />}
                {!isExpanded && <MdExpandMore />}
              </Grid>
            </div>
          </>
        </GridItem>

        <GridItem>
          <button>hello</button>
        </GridItem>
        <GridItem>
          <button>hello</button>
        </GridItem>
        <GridItem>
          <button>hello</button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default LegRow;

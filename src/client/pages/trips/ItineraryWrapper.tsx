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

const ItineraryWrapper = () => {
  const { tripData } = useContext(DataContext);

  return (
    tripData && (
      <Itinerary>
        {tripData.nodes.map((node: TripNode) => (
          <ItinerarySegmentStop
            city={tripData.nodes.length}
            station="Sheremetyevo International Airport (SVO)"
            date="Fri, 19.10"
            time="14:05"
          />
        ))}
      </Itinerary>
    )
  );
};

export default ItineraryWrapper;

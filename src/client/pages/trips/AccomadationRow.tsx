import { Grid, GridItem } from "@chakra-ui/react";
import { ItinerarySegmentStop } from "@kiwicom/orbit-components/lib/Itinerary";
import { useContext } from "react";
import { TripNode } from "../../../server/model/trips";
import { useMutation } from "react-query";
import axios from "axios";
import { TripData } from "../../interfaces/interfaces.types";
import { DataContext } from "../../context/AppContext";

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

  const deleteRow = async () => {
    deleteRowMutation.mutateAsync(data);
  };

  return (
    <div style={{ width: "100%" }}>
      <Grid
        templateColumns={{
          base: "repeat(100, 1fr)",
          lg: "repeat(100, 1fr)",
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
          <button onClick={deleteRow}>Del Row</button>
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

export default AccomadationRow;

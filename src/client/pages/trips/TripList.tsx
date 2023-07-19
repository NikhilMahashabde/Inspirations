import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import TripCard from "./TripCard";

export const TripList = () => {
  const { myTrips, setMyTrips } = useContext(DataContext);

  const myTripsMutation = useMutation(
    async () => await axios.get("/api/trips"),
    {
      onSuccess: (res) => {
        setMyTrips(res.data.tripList);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    myTripsMutation.mutateAsync();
  }, []);

  // if (!isAuthenticated) navigate("/");

  return (
    <>
      {myTripsMutation.isLoading && <>Loading trips....please wait</>}
      {myTripsMutation.isSuccess &&
        myTrips !== undefined &&
        myTrips.length === 0 && <div> No trips found</div>}
      {myTripsMutation.isSuccess &&
        myTrips !== undefined &&
        myTrips.length !== 0 && (
          <>
            {" "}
            {myTrips.map((trip) => (
              <TripCard trip={trip} />
            ))}
          </>
        )}
    </>
  );
};

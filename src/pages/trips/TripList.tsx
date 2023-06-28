import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import MyTripCard from "./MyTripCard";
import { useContext, useEffect } from "react";
import axios from "axios";

export const TripList = () => {
  const { myTrips, setMyTrips } = useContext(DataContext);

  const myTripsMutation = useMutation(
    async () => await axios.get("/api/trips"),
    {
      onSuccess: (res) => {
        console.log(res.data.tripList);
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

  if (myTrips !== undefined)
    return (
      <>
        {myTrips.map((trip) => (
          <MyTripCard trip={trip} />
        ))}
      </>
    );

  if (myTripsMutation.isLoading) return <>Loading trips....please wait</>;
  if (myTripsMutation.isSuccess) return <>Loading trips....Finsihed Loading</>;
};

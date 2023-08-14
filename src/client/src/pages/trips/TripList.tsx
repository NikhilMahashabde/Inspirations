import { useMutation } from "react-query";
import { DataContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import TripCard from "./TripCard";
import { Center, Heading, Spinner, VStack, Wrap } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

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

  return (
    <>
      {myTripsMutation.isLoading && (
        <>
          <Center>
            <VStack>
              <Spinner />
              <Text>Loading trips....please wait</Text>
            </VStack>
          </Center>
        </>
      )}
      {myTripsMutation.isSuccess &&
        myTrips !== undefined &&
        myTrips.length === 0 && (
          <div>
            <Center>
              <Heading size="m">No Trips found!</Heading>
              <ReactRouterLink to={"/trips/create"}>
                <Text>Click here to start New Trip!</Text>
              </ReactRouterLink>
            </Center>
          </div>
        )}
      {myTripsMutation.isSuccess &&
        myTrips !== undefined &&
        myTrips.length !== 0 && (
          <Wrap spacing="4" justify="center">
            {myTrips.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </Wrap>
        )}
    </>
  );
};

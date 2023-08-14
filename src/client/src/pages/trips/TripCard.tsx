/* eslint-disable react-hooks/rules-of-hooks */
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { MyTripsInterface } from "../../interfaces/interfaces.types";
import { Link as ReactRouterLink } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../context/AppContext";

interface TripCardProps {
  trip: MyTripsInterface;
}

export default function TripCard({ trip }: TripCardProps) {
  const { setMyTrips } = useContext(DataContext);

  if (!trip?.images || trip.images.length == 0) {
    trip.images = [
      "https://images.unsplash.com/photo-1457269449834-928af64c684d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjkxNjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTA0MjE3MDd8&ixlib=rb-4.0.3&q=80&w=1080",
    ];
  }

  const toast = useToast();

  const TripMutation = useMutation(
    () => axios.delete(`/api/trips/${trip._id}`),
    {
      onSuccess: () => {
        toast({
          title: "Trip Deleted.",
          description: "We've Deleted the trip for you",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setMyTrips((currTrips) => {
          const filteredTrips = currTrips?.filter((updatedTrip) => {
            return updatedTrip._id !== trip._id;
          });
          console.log(currTrips, filteredTrips);
          return filteredTrips;
        });
      },

      onError: () => {
        toast({
          title: "Trip Did not delete Deleted.",
          description: "We could not delete this trip",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const deleteTrip = async () => {
    TripMutation.mutateAsync();
  };

  const getDateString = (timeObj: Date) =>
    timeObj.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image objectFit="cover" boxSize="100%" src={trip.images[0]} />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {trip.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {getDateString(new Date(trip.startDate))} to{" "}
            {getDateString(new Date(trip.startDate))}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            Starting from {trip.startLocation}, ending at {trip.endLocation}
          </Text>
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {trip.destinations.slice(0, 3).map((tag, index) => {
              return (
                <Badge
                  key={index}
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  {tag}
                </Badge>
              );
            })}
          </Stack>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              as={ReactRouterLink}
              to={`/trip/${trip._id}`}
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              Open Trip
            </Button>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"red.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              onClick={deleteTrip}
            >
              Delete Trip
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}

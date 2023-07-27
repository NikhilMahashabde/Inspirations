/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

import AddAccomodationButton from "../../components/buttons/AddAccomodationButton";
import { DataContext } from "../../context/AppContext";
import ItineraryWrapper from "./ItineraryWrapper";
import AddLegButton from "../../components/buttons/AddLegButton";
import AddActivityButton from "../../components/buttons/AddActivityButton";

const TripConfigurator = ({ id }: { id: string | undefined }): JSX.Element => {
  const { tripData, setTripData } = useContext(DataContext);

  const tripDataMutation = useMutation(() => axios.get(`/api/trips/${id}`), {
    onSuccess: (res) => {
      setTripData(res.data.trip);
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    tripDataMutation.mutateAsync();
  }, []);

  if (tripDataMutation.isLoading) {
    return (
      <>
        <h1> trip is loading.... please wait.</h1>
      </>
    );
  }

  const getDateString = (timeObj: Date) =>
    timeObj.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  if (tripDataMutation.isSuccess && tripData) {
    return (
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={tripData.images[0]}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {tripData.name}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                {getDateString(new Date(tripData.startDate))} to{" "}
                {getDateString(new Date(tripData.endDate))}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {tripData.purpose}
                </Text>
                <Text fontSize={"lg"}></Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Key Words & Tags
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  {tripData.destinations.slice(0, 10).map((tag, index) => {
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
                </SimpleGrid>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Trip Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Budget:
                    </Text>{" "}
                    {tripData.budget}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Estimated cost:
                    </Text>{" "}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Participants:
                    </Text>{" "}
                    {tripData.participants}
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 2, md: 2 }}
        >
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
          >
            My Itinerary
          </Heading>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 8, md: 10 }}>
          <AddActivityButton id={tripData?._id} />
          <AddAccomodationButton id={tripData?._id} />
          <AddLegButton id={tripData?._id} />
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, lg: 1 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 2, md: 2 }}
        >
          <ItineraryWrapper />
        </SimpleGrid>
      </Container>
    );
  }

  return <>Trip find error</>;
};

export default TripConfigurator;

/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Badge,
  HStack,
} from "@chakra-ui/react";

import axios from "axios";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";

import { DataContext } from "../../context/AppContext";
import ItineraryWrapper from "./ItineraryWrapper";

import { AddNodeModal } from "./AddTripModal/AddNodeModal";
import { AddNodeAIButton } from "../../components/AddNodeAIButton";

import { Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import PrintButton from "../../components/buttons/PrintButton";

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
        <Center>
          <Spinner />
        </Center>
      </>
    );
  }

  const colourModeGray = useColorModeValue("gray.500", "gray.400");
  const colourModeGrayBG = useColorModeValue("gray.50", "gray.800");
  const colourModeYellowText = useColorModeValue("yellow.500", "yellow.300");
  const colourThemeGrey = useColorModeValue("gray.900", "gray.400");

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
                {tripData.name.toUpperCase()}
              </Heading>
              <Text color={colourThemeGrey} fontWeight={300} fontSize={"2xl"}>
                {getDateString(new Date(tripData.startDate))} to{" "}
                {getDateString(new Date(tripData.endDate))}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider borderColor={colourThemeGrey} />}
            >
              <Text color={colourModeGray} fontSize={"2xl"} fontWeight={"300"}>
                {tripData.purpose}
              </Text>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={colourModeYellowText}
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
                        bg={colourModeGrayBG}
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
                  color={colourModeYellowText}
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
                      Estimated cost: {tripData.budget.toString()}
                    </Text>{" "}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      {tripData.participants && (
                        <>Participants:{tripData.participants.toString()}</>
                      )}
                    </Text>{" "}
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

        <Box>
          <HStack>
            <AddNodeModal />
            <AddNodeAIButton />
            <PrintButton />
          </HStack>
        </Box>

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

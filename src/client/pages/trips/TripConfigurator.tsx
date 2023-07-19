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
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

import AddAccomodationButton from "../../components/buttons/AddAccomodationButton";
import { DataContext } from "../../context/AppContext";
import ItineraryWrapper from "./ItineraryWrapper";

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
              src={
                "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
              }
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
                {tripData.startDate}:{tripData.endDate}
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
                <Text fontSize={"lg"}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                  maxime modi nam officiis porro, quae, quisquam quos
                  reprehenderit velit? Natus, totam.
                </Text>
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
                  {tripData.budget}
                  {/* 


                  <List spacing={2}>
                    <ListItem>Chronograph</ListItem>
                    <ListItem>Master Chronometer Certified</ListItem>{" "}
                    <ListItem>Tachymeter</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List> */}
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
                </List>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <AddAccomodationButton id={tripData?._id} />
          <AddAccomodationButton id={tripData?._id} />
          <AddAccomodationButton id={tripData?._id} />
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, lg: 1 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <ItineraryWrapper />
        </SimpleGrid>
      </Container>
    );
  }

  return <>Trip find error</>;
};
// {tripData?.nodes.map((trip) => {
//   console.log(trip);
//   return <span key={trip._id}>{trip.nodeType}</span>;
// })}
// </h1>

{
  /* add button to add a node - node type of led... node type of destination */
}
{
  /* add button to add a node - node type of destination */
}

{
  /* Render nodes conditionally based on type - css'd */
}
{
  /* add button to delete the entire trip */
}
//     </>
//   );
// };

export default TripConfigurator;

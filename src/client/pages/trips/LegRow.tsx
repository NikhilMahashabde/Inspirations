/* eslint-disable react-hooks/rules-of-hooks */
import {
  IconButton,
  useColorModeValue,
  Collapse,
  Box,
  HStack,
  VStack,
  border,
  Image,
  Flex,
  Heading,
  Stack,
  Text,
  StackDivider,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  Avatar,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

import { ItinerarySegmentDetail } from "@kiwicom/orbit-components/lib/Itinerary";
import { Accommodation } from "@kiwicom/orbit-components/icons";
import { TripNode } from "../../../server/model/trips";
import { useContext, useEffect, useState } from "react";
import { Icons } from "@kiwicom/orbit-components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Sightseeing } from "@kiwicom/orbit-components/icons";
import {
  BsFileArrowDown,
  BsFileArrowUp,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { DataContext } from "../../context/AppContext";
import { useMutation } from "react-query";
import axios from "axios";

import {
  DeleteResponse,
  MyTripsInterface,
  UpdateTripResponse,
} from "../../interfaces/interfaces.types";

import _ from "lodash";
import { TripEditModal } from "./TripEditModal/TripEditModal";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { BiChat, BiLike, BiShare } from "react-icons/bi";

const LegRow = ({ node, index }: { node: TripNode; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [maxWidth, setMaxWidth] = useState("60vw");
  const { setTripData, tripData, isRowExpanded, setIsRowExpanded } =
    useContext(DataContext);

  const UpdateTripMutation = useMutation(
    (data: MyTripsInterface) =>
      axios.put<UpdateTripResponse>(`/api/trip/${data._id}`, {
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

  //row movement buttons

  const MoveRowUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (index == 0 || !tripData) return null;
    const updateTripData = _.cloneDeep(tripData);

    // 0 1
    setIsRowExpanded((prev) => {
      const newArr = [...prev];
      const tmp = newArr[index - 1];
      newArr[index - 1] = true;
      newArr[index] = tmp;

      return newArr;
    });

    [updateTripData.nodes[index - 1], updateTripData.nodes[index]] = [
      updateTripData.nodes[index],
      updateTripData.nodes[index - 1],
    ];

    UpdateTripMutation.mutateAsync(updateTripData);
  };

  const MoveRowDown = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!tripData || index == tripData.nodes.length - 1) return null;
    const updateTripData = _.cloneDeep(tripData);
    [updateTripData.nodes[index + 1], updateTripData.nodes[index]] = [
      updateTripData.nodes[index],
      updateTripData.nodes[index + 1],
    ];

    setIsRowExpanded((prev) => {
      const newArr = [...prev];
      const tmp = newArr[index + 1];
      newArr[index + 1] = true;
      newArr[index] = tmp;

      return newArr;
    });
    UpdateTripMutation.mutateAsync(updateTripData);
  };

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsRowExpanded((prev) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];

      return newArr;
    });
  };

  const data = {
    id: tripData?._id || "",
    index: index,
  };

  ////////// view window logic
  const updateMaxWidth = () => {
    const viewportWidth = window.innerWidth;
    const minWidth = 1110;
    const calculatedWidth = `min(${minWidth}px, calc(${viewportWidth}px - 180px))`;

    setMaxWidth(calculatedWidth);
  };

  useEffect(() => {
    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, []);

  ////////// view window logic

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

  const baseIcon = () => {
    switch (node.nodeType) {
      case "accomodation":
        return <Accommodation size="small" />;
      case "leg":
        return <Icons.Airplane size="small" />;
      case "activity":
        return <Sightseeing size="small" />;
      // Add more cases for other node types and their corresponding icons
      default:
        return <Icons.Airplane size="small" />;
    }
  };

  //hover effect for the row
  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handleHoverLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const BoxStyle = {
    border: isHovered
      ? "1px solid rgba(211, 211, 211, .9)"
      : "1px solid rgba(211, 211, 211, .5)",

    transition: "opacity 0.3s ease",
    borderRadius: "12px",
  };

  const dateString = (timeStamp: string | number | Date) =>
    new Date(timeStamp).toLocaleString(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <>
      <ItinerarySegmentDetail
        icon={baseIcon()}
        duration="2h 30m"
        summary={
          <HStack
            flex={1}
            style={BoxStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverLeave}
            onClick={handleToggle}
          >
            <Box flex={1} maxW={maxWidth}>
              <Collapse startingHeight={80} in={isRowExpanded[index]}>
                <Card maxW="" style={{ padding: "-5px" }}>
                  <CardHeader>
                    <Flex>
                      <Flex
                        flex="1"
                        gap="5px"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Box>
                          <Heading size={{ base: "xs", md: "16px" }}>
                            {node.destination || "Add a new Leg name!"}
                          </Heading>
                          <Text
                            fontSize={{ base: "xs", md: "16px" }}
                            noOfLines={1}
                          >
                            {node.description}
                          </Text>
                        </Box>
                      </Flex>
                      {isRowExpanded[index] ? (
                        <MdOutlineExpandLess />
                      ) : (
                        <MdOutlineExpandMore />
                      )}
                    </Flex>
                  </CardHeader>
                  <CardBody alignItems="left">
                    <VStack align="flex-start">
                      <HStack
                        align="flex-start"
                        justify="left"
                        maxW={maxWidth}
                        flexWrap="wrap"
                      >
                        <Box minW="100px">
                          <Heading size={{ base: "xs", md: "16px" }}>
                            Activities
                          </Heading>
                        </Box>
                        <Box>
                          <Text fontSize={{ base: "xs", md: "16px" }}>
                            {node.activities || "Add activities"}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack
                        align="flex-start"
                        justify="left"
                        maxW={maxWidth}
                        flexWrap="wrap"
                      >
                        <Box minW="100px">
                          <Heading size={{ base: "xs", md: "16px" }}>
                            Time:
                          </Heading>
                        </Box>
                        <Box>
                          <Text fontSize={{ base: "xs", md: "16px" }}>
                            {new Date(node.startTime).toLocaleString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(node.endTime).toLocaleString(undefined, {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {" , "}
                            {dateString(node.startTime)}
                            {""}
                            {dateString(node.startTime) !==
                              dateString(node.endTime) &&
                              -dateString(node.endTime)}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack
                        align="flex-start"
                        justify="left"
                        maxW={maxWidth}
                        flexWrap="wrap"
                      >
                        <Box minW="100px">
                          <Heading size={{ base: "xs", md: "16px" }}>
                            Budget:
                          </Heading>
                        </Box>
                        <Box>
                          <Text fontSize={{ base: "xs", md: "16px" }}>
                            {node.budget}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack
                        align="flex-start"
                        justify="left"
                        maxW={maxWidth}
                        flexWrap="wrap"
                      >
                        <Box minW="100px">
                          <Heading size={{ base: "xs", md: "16px" }}>
                            Notes:
                          </Heading>
                        </Box>
                        <Box>
                          <Text fontSize={{ base: "xs", md: "16px" }}>
                            {node.notes}
                          </Text>
                        </Box>
                      </HStack>
                    </VStack>
                    {/* <Tr>
                            <Td style={{ width: "20px" }}>Activities:</Td>
                            <Td>{node.activities}</Td>
                          </Tr>
                          <Tr>
                            <Td style={{ width: "20px" }}>Notes:</Td>
                            <Td>{node.notes}</Td>
                          </Tr>
                          <Tr>
                            <Td style={{ width: "20px" }}>Time:</Td>
                            <Td>
                              {new Date(node.startTime).toLocaleString(
                                undefined,
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}{" "}
                              -{" "}
                              {new Date(node.endTime).toLocaleString(
                                undefined,
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                              {" , "}
                              {dateString(node.startTime)}
                              {""}
                              {dateString(node.startTime) !==
                                dateString(node.endTime) &&
                                -dateString(node.endTime)}
                            </Td>
                          </Tr>
                        </Tbody>
                        <Tfoot>
                          <Tr>
                            <Td>buttons here</Td>
                          </Tr>
                        </Tfoot>
                      </Table>
                    </TableContainer> */}
                  </CardBody>

                  <CardFooter flexWrap="wrap">
                    <HStack flexWrap="wrap">
                      <TripEditModal index={index} />
                      {isRowExpanded[index] && (
                        <IconButton
                          bg={useColorModeValue("blue.400", "blue.800")}
                          color={useColorModeValue("white", "gray.800")}
                          _hover={{
                            bg: "blue.600",
                          }}
                          aria-label="Move Row Down"
                          icon={<BsFileArrowUp />}
                          onClick={MoveRowUp}
                        />
                      )}

                      {isRowExpanded[index] && (
                        <IconButton
                          bg={useColorModeValue("blue.400", "blue.800")}
                          color={useColorModeValue("white", "gray.800")}
                          _hover={{
                            bg: "blue.600",
                          }}
                          aria-label="Move Row Down"
                          icon={<BsFileArrowDown />}
                          onClick={MoveRowDown}
                        />
                      )}

                      {isRowExpanded[index] && (
                        <IconButton
                          bg={useColorModeValue("red.400", "red.800")}
                          color={useColorModeValue("white", "gray.800")}
                          _hover={{
                            bg: "red.600",
                          }}
                          aria-label="Subscribe"
                          icon={<AiFillDelete />}
                          onClick={deleteRow}
                        />
                      )}
                    </HStack>
                  </CardFooter>
                </Card>
              </Collapse>
            </Box>
          </HStack>
        }
      />
    </>
  );
};

export default LegRow;

import React from "react";
import {
  Icons,
  Itinerary,
  ItinerarySegment,
  ItinerarySegmentDetail,
  ItinerarySegmentStop,
} from "@kiwicom/orbit-components";
import {
  Accommodation,
  Meal,
  Sightseeing,
  SportEquipment,
  Trip,
} from "@kiwicom/orbit-components/lib/icons";
import { DataContext } from "../context/AppContext";
import { TripNode } from "../../../server/src/model/trips";
import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
// import PrintRow from "./PrintRow";

export class MyPdf extends React.Component {
  static contextType = DataContext;

  getTimeString = (timeObj: Date) =>
    timeObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  getDateString = (timeObj: Date) =>
    timeObj.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  render() {
    // Access the context value using this.context
    // @ts-ignore
    const { tripData } = this.context;

    const timeString = (timeStamp: string | number | Date) =>
      new Date(timeStamp).toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });

    const durationCalc = (node: TripNode) => {
      return `${timeString(node.startTime)}`;
    };

    const dateString = (timeStamp: string | number | Date) =>
      new Date(timeStamp).toLocaleString(undefined, {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });

    const ShowEndTime = (node: TripNode) => {
      return dateString(node.startTime) !== dateString(node.endTime);
    };

    const baseIcon = (node: TripNode) => {
      switch (node.nodeType.toLowerCase()) {
        case "accommodation":
          return <Accommodation size="small" />;
        case "leg":
          return <Icons.Airplane size="small" />;

        case "activity":
          return <SportEquipment size="small" />;

        case "meal":
          return <Meal size="small" />;

        case "Sightseeing":
          return <Sightseeing size="small" />;

        default:
          return <Icons.Airplane size="small" />;
      }
    };

    return (
      <Itinerary>
        <ItinerarySegment>
          <ItinerarySegmentStop
            icon={<Trip size="small" />}
            city={tripData.startLocation}
            station={""}
            date={this.getTimeString(new Date(tripData.startDate))}
            time={this.getDateString(new Date(tripData.startDate))}
          />

          {tripData.nodes.map((node: TripNode, index: number) => (
            <ItinerarySegmentDetail
              icon={baseIcon(node)}
              duration={durationCalc(node)}
              summary={
                <>
                  <VStack
                    align="flex-start"
                    style={{
                      border: "1px solid rgba(211, 211, 211, .5)",
                      borderRadius: "12px",
                    }}
                  >
                    <Heading size="s">
                      {node.destination || "Add a new Leg name!"}
                    </Heading>
                    <Text fontSize={{ base: "xs", md: "16px" }}>
                      {node.description || "No Description"}
                    </Text>

                    <HStack align="flex-start" justify="left" flexWrap="wrap">
                      <Box minW="100px">
                        <Heading size="xs">Time:</Heading>
                      </Box>
                      <Box>
                        <Text fontSize={{ base: "xs", md: "16px" }}>
                          {new Date(node.startTime).toLocaleString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(node.endTime).toLocaleString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {" , "}
                          {dateString(node.startTime)}
                          {""}
                          {ShowEndTime(node) && (
                            <> to {dateString(node.endTime)}</>
                          )}
                        </Text>
                      </Box>
                    </HStack>
                    <HStack align="flex-start" justify="left" flexWrap="wrap">
                      <Box minW="100px">
                        <Heading size="xs">Budget:</Heading>
                      </Box>
                      <Box>
                        <Text fontSize={{ base: "xs", md: "16px" }}>
                          ${node.budget}
                        </Text>
                      </Box>
                    </HStack>
                    <HStack align="flex-start" justify="left" flexWrap="wrap">
                      <Box minW="100px">
                        <Heading size="xs">Notes:</Heading>
                      </Box>
                      <Box>
                        <Text fontSize={{ base: "xs", md: "16px" }}>
                          {node.notes}
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </>
              }
              key={index}
            />
          ))}
          {/* <PrintRow key={index} node={node} /> */}

          <ItinerarySegmentStop
            icon={<Trip size="small" />}
            city={tripData.endLocation}
            station={""}
            date={this.getTimeString(new Date(tripData.endDate))}
            time={this.getDateString(new Date(tripData.endDate))}
          />
        </ItinerarySegment>
      </Itinerary>
    );
  }
}

/* eslint-disable react-hooks/rules-of-hooks */
// import { Box, HStack, VStack, Flex, Heading, Text } from "@chakra-ui/react";

import { ItinerarySegmentDetail } from "@kiwicom/orbit-components/lib/Itinerary";
import { Accommodation } from "@kiwicom/orbit-components/icons";
import { TripNode } from "../../../server/src/model/trips";

import { Icons } from "@kiwicom/orbit-components";

import { Sightseeing } from "@kiwicom/orbit-components/icons";

import { Meal } from "@kiwicom/orbit-components/icons";
import { SportEquipment } from "@kiwicom/orbit-components/icons";
// import { useEffect } from "react";

const PrintRow = ({ node }: { node: TripNode }) => {
  // const [maxWidth, setMaxWidth] = useState("60vw");

  const baseIcon = () => {
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

  // const dateString = (timeStamp: string | number | Date) =>
  //   new Date(timeStamp).toLocaleString(undefined, {
  //     year: "2-digit",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });

  // const timeString = (timeStamp: string | number | Date) =>
  //   new Date(timeStamp).toLocaleString(undefined, {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });

  // const ShowEndTime = () => {
  //   return dateString(node.startTime) !== dateString(node.endTime);
  // };

  // const durationCalc = () => {
  //   return `${timeString(node.startTime)}`;
  // };

  // const updateMaxWidth = () => {
  //   const viewportWidth = window.innerWidth;
  //   const minWidth = 1110;
  //   const calculatedWidth = `min(${minWidth}px, calc(${viewportWidth}px - 180px))`;

  //   setMaxWidth(calculatedWidth);
  // };

  // useEffect(() => {
  //   updateMaxWidth();
  //   window.addEventListener("resize", updateMaxWidth);
  //   return () => {
  //     window.removeEventListener("resize", updateMaxWidth);
  //   };
  // }, []);

  return (
    <ItinerarySegmentDetail
      icon={baseIcon()}
      duration={"ta"}
      summary={
        <></>
        // <Box flex={1} maxW={maxWidth}>
        //   <VStack align="flex-start">
        //     <Flex>
        //       <Flex flex="1" gap="5px" alignItems="center" flexWrap="wrap">
        //         <Box>
        //           <Heading size={{ base: "s", md: "16px" }}>
        //             {node.destination || "Add a new Leg name!"}
        //           </Heading>
        //           <Text fontSize={{ base: "s", md: "16px" }}>
        //             {node.description}
        //           </Text>
        //         </Box>
        //       </Flex>
        //     </Flex>
        //     <HStack
        //       align="flex-start"
        //       justify="left"
        //       maxW={maxWidth}
        //       flexWrap="wrap"
        //     >
        //       <Box minW="100px">
        //         <Heading size={{ base: "xs", md: "16px" }}>
        //           Activities
        //         </Heading>
        //       </Box>
        //       <Box>
        //         <Text fontSize={{ base: "xs", md: "16px" }}>
        //           {node.activities || "Add activities"}
        //         </Text>
        //       </Box>
        //     </HStack>
        //     <HStack
        //       align="flex-start"
        //       justify="left"
        //       maxW={maxWidth}
        //       flexWrap="wrap"
        //     >
        //       <Box minW="100px">
        //         <Heading size={{ base: "xs", md: "16px" }}>Time:</Heading>
        //       </Box>
        //       <Box>
        //         <Text fontSize={{ base: "xs", md: "16px" }}>
        //           {new Date(node.startTime).toLocaleString(undefined, {
        //             hour: "2-digit",
        //             minute: "2-digit",
        //           })}{" "}
        //           -{" "}
        //           {new Date(node.endTime).toLocaleString(undefined, {
        //             hour: "2-digit",
        //             minute: "2-digit",
        //           })}
        //           {" , "}
        //           {dateString(node.startTime)}
        //           {""}
        //           {ShowEndTime() && <> to {dateString(node.endTime)}</>}
        //         </Text>
        //       </Box>
        //     </HStack>
        //     <HStack
        //       align="flex-start"
        //       justify="left"
        //       maxW={maxWidth}
        //       flexWrap="wrap"
        //     >
        //       <Box minW="100px">
        //         <Heading size={{ base: "xs", md: "16px" }}>Budget:</Heading>
        //       </Box>
        //       <Box>
        //         <Text fontSize={{ base: "xs", md: "16px" }}>
        //           ${node.budget}
        //         </Text>
        //       </Box>
        //     </HStack>
        //     <HStack
        //       align="flex-start"
        //       justify="left"
        //       maxW={maxWidth}
        //       flexWrap="wrap"
        //     >
        //       <Box minW="100px">
        //         <Heading size={{ base: "xs", md: "16px" }}>Notes:</Heading>
        //       </Box>
        //       <Box>
        //         <Text fontSize={{ base: "xs", md: "16px" }}>
        //           {node.notes}
        //         </Text>
        //       </Box>
        //     </HStack>
        //   </VStack>
        // </Box>
      }
    />
  );
};

export default PrintRow;

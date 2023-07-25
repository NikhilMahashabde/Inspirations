import {
  Button,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
  Collapse,
  Box,
  Stack,
  HStack,
} from "@chakra-ui/react";
import {
  ItinerarySegmentBanner,
  ItinerarySegmentDetail,
} from "@kiwicom/orbit-components/lib/Itinerary";
import { TripNode } from "../../../server/model/trips";
import {
  Badge,
  Text as MyText,
  Slider,
  TextLink,
} from "@kiwicom/orbit-components/lib";
import { useContext, useEffect, useState } from "react";

import Itinerary, {
  ItinerarySegment,
  ItineraryStatus,
  ItineraryBadgeList,
  ItinerarySegmentStop,
} from "@kiwicom/orbit-components/lib/Itinerary";

import { Icons } from "@kiwicom/orbit-components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DataContext } from "../../context/AppContext";
import { useMutation } from "react-query";
import axios from "axios";
import {
  DeleteResponse,
  MyTripsInterface,
  UpdateTripResponse,
} from "../../interfaces/interfaces.types";
import { BsFileArrowDown, BsFileArrowUp } from "react-icons/bs";
import _ from "lodash";

const LegRow = ({ node, index }: { node: TripNode; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxWidth, setMaxWidth] = useState("60vw");

  const [gridTemplateColumns, setGridTemplateColumns] = useState(
    `repeat(10, ${Number(maxWidth.replace("px", "50")) / 9}px)`
  );

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

  const MoveRowUp = async () => {
    if (index == 0 || !tripData) return null;
    const updateTripData = _.cloneDeep(tripData);
    [updateTripData.nodes[index - 1], updateTripData.nodes[index]] = [
      updateTripData.nodes[index],
      updateTripData.nodes[index - 1],
    ];

    UpdateTripMutation.mutateAsync(updateTripData);
  };

  const MoveRowDown = async () => {
    if (!tripData || index == tripData.nodes.length - 1) return null;
    const updateTripData = _.cloneDeep(tripData);
    [updateTripData.nodes[index + 1], updateTripData.nodes[index]] = [
      updateTripData.nodes[index],
      updateTripData.nodes[index + 1],
    ];
    UpdateTripMutation.mutateAsync(updateTripData);
  };

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const { setTripData, tripData } = useContext(DataContext);

  const data = {
    id: tripData?._id || "",
    index: index,
  };

  ////////// view window logic
  const updateMaxWidth = () => {
    const viewportWidth = window.innerWidth;
    const minWidth = 950;
    const calculatedWidth = `min(${minWidth}px, calc(${viewportWidth}px - 230px))`;
    console.log(calculatedWidth);
    setMaxWidth(calculatedWidth);
  };

  useEffect(() => {
    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, []);

  useEffect(() => {
    const columnWidth = Math.min(
      Number((window.innerWidth - 20) / 9),
      110
    ).toFixed(0);

    const gridTemplateColumns = `repeat(10, ${columnWidth}px)`;
    setGridTemplateColumns(gridTemplateColumns);
  }, [maxWidth]);

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

  return (
    <>
      <ItinerarySegmentDetail
        icon={<Icons.Airplane size="small" />}
        duration="2h 30m"
        summary={
          <HStack flex={1}>
            <Box
              flex={1}
              onClick={() => setIsExpanded((prev) => !prev)}
              maxW={maxWidth}
            >
              <Collapse startingHeight={20} in={isExpanded}>
                Anim pariatur 1cliche reprehenderit, enim eiusmod high 2life
                accusamus terry r3ichardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt
                sapie4nte ea proident.6
              </Collapse>
            </Box>
            <IconButton
              bg={useColorModeValue("yellow.400", "yellow.800")}
              color={useColorModeValue("white", "gray.800")}
              _hover={{
                bg: "red.600",
              }}
              aria-label="Subscribe"
              icon={<AiFillEdit />}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </HStack>

          // <Grid templateColumns={{ base: gridTemplateColumns }}>
          //   <GridItem colSpan={9}>

          // </GridItem>
          // <GridItem colSpan={1}>

          //   </GridItem>
          // </Grid>
        }
      />

      {/* <ItinerarySegmentDetail
        icon={<Icons.Airplane size="small" />}
        duration="2h 30m"
        {...({ opened: true } as Props)}
        summary={
          <div>testing summary</div>
          // <Badge
          //   carriers={[
          //     {
          //       code: "FR",
          //       name: "Ryanair",
          //     },
          //   ]}
          // >
          //   Ryanair
          // </Badge>
        }
        content={[
          {
            title: <div>hellonothell</div>,
            items: [
              // {
              //   icon: <Icons.Airplane size="small" />,
              //   name: "Carrier",
              //   value: "Ryanair",
              // },
              // {
              //   icon: <Icons.InformationCircle size="small" />,
              //   name: "Connection number",
              //   value: "RA 8345",
              // },
            ],
          },
        ]}
      />
    </> 

    // <GridItem colSpan={9}>
    //   <div
    //     style={{
    //       display: "grid",
    //       gridTemplateColumns: "repeat(9, 1fr)",
    //     }}
    //   >
    // <ItinerarySegmentDetail
    //   icon={<Icons.Airplane size="small" />}
    //   duration="2h 30m"
    //   summary={
    //     <div style={{ whiteSpace: "normal", overflowX: "hidden" }}>
    //       test
    //       summaryddddddddummaryddddummarydffffffffffffffffffffdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    //     </div>
    //   }
    // />

    // <GridItem colSpan={1}>
    //   <>
    //     <IconButton
    //       bg={useColorModeValue("yellow.400", "yellow.800")}
    //       color={useColorModeValue("white", "gray.800")}
    //       _hover={{
    //         bg: "red.600",
    //       }}
    //       aria-label="Subscribe"
    //       icon={<AiFillEdit />}
    //       onClick={() => console.log("hi;")}
    //     />
    //     {/*
    //     <IconButton
    //       bg={useColorModeValue("blue.400", "blue.800")}
    //       color={useColorModeValue("white", "gray.800")}
    //       _hover={{
    //         bg: "blue.600",
    //       }}
    //       aria-label="Move Row Down"
    //       icon={<BsFileArrowDown />}
    //       onClick={MoveRowDown}
    //     />
    //     <IconButton
    //       bg={useColorModeValue("red.400", "red.800")}
    //       color={useColorModeValue("white", "gray.800")}
    //       _hover={{
    //         bg: "red.600",
    //       }}
    //       aria-label="Subscribe"
    //       icon={<AiFillDelete />}
    //       onClick={deleteRow}
    //     /> */}
    </>
    // </GridItem>

    // // {/* <IconButton
    // //     bg={useColorModeValue("blue.400", "blue.800")}
    //     color={useColorModeValue("white", "gray.800")}
    //     _hover={{
    //       bg: "blue.600",
    //     }}
    //     aria-label="Move Row Down"
    //     icon={<BsFileArrowUp />}
    //     onClick={MoveRowUp}
    //   />

    //   <IconButton
    //     bg={useColorModeValue("blue.400", "blue.800")}
    //     color={useColorModeValue("white", "gray.800")}
    //     _hover={{
    //       bg: "blue.600",
    //     }}
    //     aria-label="Move Row Down"
    //     icon={<BsFileArrowDown />}
    //     onClick={MoveRowDown}
    //   />

    //   <IconButton
    //     bg={useColorModeValue("red.400", "red.800")}
    //     color={useColorModeValue("white", "gray.800")}
    //     _hover={{
    //       bg: "red.600",
    //     }}
    //     aria-label="Subscribe"
    //     icon={<AiFillDelete />}
    //     onClick={deleteRow}
    //   /> */}
  );
};

export default LegRow;

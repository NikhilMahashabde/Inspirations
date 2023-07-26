/* eslint-disable react-hooks/rules-of-hooks */
import {
  IconButton,
  useColorModeValue,
  Collapse,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { ItinerarySegmentDetail } from "@kiwicom/orbit-components/lib/Itinerary";
import { TripNode } from "../../../server/model/trips";

import { useContext, useEffect, useState } from "react";

import { Icons } from "@kiwicom/orbit-components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import { BsFileArrowDown, BsFileArrowUp } from "react-icons/bs";
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

const LegRow = ({ node, index }: { node: TripNode; index: number }) => {
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

  const MoveRowUp = async () => {
    if (index == 0 || !tripData) return null;
    const updateTripData = _.cloneDeep(tripData);
    [updateTripData.nodes[index - 1], updateTripData.nodes[index]] = [
      updateTripData.nodes[index],
      updateTripData.nodes[index - 1],
    ];
    setIsRowExpanded((prev) => {
      const newArr = [...prev];
      const tmp = newArr[index - 1];
      newArr[index - 1] = true;
      newArr[index] = tmp;
      return newArr;
    });

    UpdateTripMutation.mutateAsync(updateTripData);
  };

  const MoveRowDown = async () => {
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

  const handleToggle = () => {
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
            <Box flex={1} onClick={handleToggle} maxW={maxWidth}>
              <Collapse startingHeight={20} in={isRowExpanded[index]}>
                <div>{tripData.nodes[index].destination}</div>
                <div>{tripData.nodes[index].description}</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
                <div>test</div>
              </Collapse>
            </Box>
            <VStack spacing={2} align="stretch">
              <>
                {/* //edit button */}
                <TripEditModal index={index} />

                {/* conditionnaly rendered delete add move buttons */}
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
              </>
            </VStack>
          </HStack>
        }
      />
    </>
  );
};

export default LegRow;

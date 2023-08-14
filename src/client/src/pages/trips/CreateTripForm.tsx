/* eslint-disable react-hooks/rules-of-hooks */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Badge, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";

import React, { useRef, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  FormHelperText,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TripFormInterface {
  name: string;
  description: string;
  purpose: string;
  budget: number;
  startDate: Date | null;
  endDate: Date | null;
  participants: number;
  startLocation: string;
  endLocation: string;
  destinations: string[];
}

const Form1 = ({
  tripData,
  setTripData,
}: {
  tripData: TripFormInterface;
  setTripData: React.Dispatch<React.SetStateAction<TripFormInterface>>;
}) => {
  //   const Form1 = ({
  //   tripData,
  //   setTripData
  // }: {
  //   tripData: TripFormInterface;
  //   setTripData: React.Dispatch<React.SetStateAction<TripFormInterface>>;
  // }) => {
  // const [show, setShow] = React.useState(false);
  // const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Create a new Trip
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="trip-name" fontWeight={"normal"}>
            Trip name
          </FormLabel>
          <Input
            id="trip-name"
            placeholder="trip name"
            value={tripData.name}
            onChange={(e) => setTripData({ ...tripData, name: e.target.value })}
          />
        </FormControl>

        <FormControl mr="5%">
          <FormLabel htmlFor="trip-description" fontWeight={"normal"}>
            Description
          </FormLabel>
          <Input
            id="trip-description"
            placeholder="trip-description"
            value={tripData.description}
            onChange={(e) =>
              setTripData({ ...tripData, description: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="trip-purpose" fontWeight={"normal"}>
            Purpose
          </FormLabel>
          <Input
            id="trip-purpose"
            placeholder="trip-purpose"
            value={tripData.purpose}
            onChange={(e) =>
              setTripData({ ...tripData, purpose: e.target.value })
            }
          />
        </FormControl>
      </Flex>
      {/* <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl> */}
      {/* 
      <FormControl>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl> */}
    </>
  );
};

const Form2 = ({
  tripData,
  setTripData,
}: {
  tripData: TripFormInterface;
  setTripData: React.Dispatch<React.SetStateAction<TripFormInterface>>;
}) => {
  const destinationRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Trip Details
      </Heading>

      <Flex>
        <FormControl mr="5%">
          <FormLabel
            htmlFor="trip-budget"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Trip Budget
          </FormLabel>
          <Input
            type="number"
            name="trip-budget"
            id="trip-budget"
            autoComplete="street-address"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={tripData.budget}
            onChange={(e) =>
              setTripData({ ...tripData, budget: parseInt(e.target.value) })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel
            htmlFor="trip-participants"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Trip Participants
          </FormLabel>
          <Input
            type="number"
            name="trip-participants"
            id="trip-participants"
            autoComplete="street-address"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={tripData.participants}
            onChange={(e) =>
              setTripData({
                ...tripData,
                participants: parseInt(e.target.value),
              })
            }
          />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%">
          <FormLabel
            htmlFor="trip-budget"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Destination Tags
          </FormLabel>
          <Input
            mr="5%"
            ref={destinationRef}
            type="text"
            name="destination-tag-input"
            id="destination-tag-input"
            autoComplete="street-address"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="half"
            rounded="md"
          />

          <Button
            size="sm"
            onClick={() => {
              setTripData((curr) => {
                const inputValue = destinationRef.current?.value ?? "";
                const updatedTrip = { ...curr };
                if (inputValue !== "" && destinationRef.current !== null) {
                  updatedTrip.destinations.push(inputValue);
                  destinationRef.current.value = "";
                }
                return updatedTrip;
              });
            }}
            colorScheme="teal"
            variant="solid"
            w="7rem"
            mr="5%"
          >
            Add
          </Button>
        </FormControl>
      </Flex>
      <Flex>
        {tripData.destinations.map((loc) => {
          return (
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              {loc}
            </Badge>
          );
        })}
      </Flex>

      {/* <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select> */}

      {/* <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Street address
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          State / Province
        </FormLabel>
        <Input
          type="text"
          name="state"
          id="state"
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl> */}
      {/* 
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          ZIP / Postal
        </FormLabel>
        <Input
          type="text"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl> */}
    </>
  );
};

const Form3 = ({
  tripData,
  setTripData,
}: {
  tripData: TripFormInterface;
  setTripData: React.Dispatch<React.SetStateAction<TripFormInterface>>;
}) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Trip Timelines
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        {/* <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Start Date
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl> */}

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Start Date
          </FormLabel>

          <DatePicker
            selected={tripData.startDate}
            onChange={(date) => setTripData({ ...tripData, startDate: date })}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            showPopperArrow={false}
            className="react-datepicker-wrapper"
          />

          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            End date
          </FormLabel>

          <DatePicker
            selected={tripData.endDate}
            onChange={(date) => setTripData({ ...tripData, endDate: date })}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            showPopperArrow={false}
            className="react-datepicker-wrapper"
          />

          {/* Trip statrt end params
           */}
          <FormControl>
            <FormLabel htmlFor="startLocation" fontWeight={"normal"}>
              Trip Start Location
            </FormLabel>
            <Input
              id="trip-startLocation"
              placeholder="e.g. Melbourne Southern Cross"
              value={tripData.startLocation}
              onChange={(e) =>
                setTripData({ ...tripData, startLocation: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="endLocation" fontWeight={"normal"}>
              Trip Start Location
            </FormLabel>
            <Input
              id="trip-endLocation"
              placeholder="e.g. Sydney Central Station"
              value={tripData.endLocation}
              onChange={(e) =>
                setTripData({ ...tripData, endLocation: e.target.value })
              }
            />
          </FormControl>

          <Textarea
            placeholder="you@example.com"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: "sm",
            }}
          />
          <FormHelperText>Any other information</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function CreateTripForm() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [tripData, setTripData] = useState<TripFormInterface>({
    name: "",
    description: "",
    purpose: "",
    budget: 0,
    startDate: new Date(),
    endDate: new Date(),
    participants: 0,
    startLocation: "",
    endLocation: "",
    destinations: [],
  });
  const navigate = useNavigate();

  const newTripMutation = useMutation(
    () => axios.post("/api/trips", tripData),
    {
      onSuccess: (response) => {
        toast({
          title: "Trip created.",
          description: "We've created the trip for you",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate(`/trip/${response.data._id}`);
      },
      onError: () => {
        toast({
          title: "Trip creation failed",
          description: "An error occured, try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Form1 tripData={tripData} setTripData={setTripData} />
        ) : step === 2 ? (
          <Form2 tripData={tripData} setTripData={setTripData} />
        ) : (
          <Form3 tripData={tripData} setTripData={setTripData} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={async () => {
                  {
                    await newTripMutation.mutateAsync();
                  }
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

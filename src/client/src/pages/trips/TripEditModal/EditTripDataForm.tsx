import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { DataContext } from "../../../context/AppContext";
import { useMutation } from "react-query";
import {
  MyTripsInterface,
  UpdateTripResponse,
} from "../../../interfaces/interfaces.types";
import axios from "axios";
import _ from "lodash";
// @ts-nocheck

export function EditTripDataForm({
  onClose,
  index,
}: {
  onClose: () => void;
  index: number;
}) {
  const { tripData, setTripData } = useContext(DataContext);
  const toast = useToast();

  function validateDestination(value: string) {
    let error;
    if (!value) {
      error = "Destination is required";
    }
    return error;
  }

  function validateNodeType(value: string) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  function validateDescription(value: string) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  function validateTime(value: string) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  const TripLegTypes = [
    "Meal",
    "Sightseeing",
    "Accommodation",
    "Travel",
    "Activity",
  ];

  function formatDateTime(dateTime: Date): string {
    if (typeof dateTime === "string") {
      // Convert formatted date string to Date object
      dateTime = new Date(dateTime);
    }
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const UpdateTripMutation = useMutation(
    (data: MyTripsInterface) =>
      axios.put<UpdateTripResponse>(`/api/trip/${data._id}`, {
        data,
      }),
    {
      onSuccess: (res) => {
        setTripData(res.data.updatedTrip);

        toast({
          title: "Trip Updated.",
          description: "You can close the menu or continue updating",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (res: { error: string }) => {
        console.log(res);
      },
    }
  );

  // const CreateTripMutation = useMutation(
  //   (newTripData: INewTripData) =>
  //     axios.post<UpdateTripResponse>(`/api/trip/${tripData._id}`, {
  //       newTripData,
  //     }),
  //   {
  //     onSuccess: (res) => {
  //       setTripData(res.data.updatedTrip);
  //       console.log("success");
  //       toast({
  //         title: "Trip Created.",
  //         description: "You can continue planning",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     },
  //     onError: (res: { error: string }) => {
  //       console.log(res);
  //     },
  //   }
  // );

  return (
    <Formik
      initialValues={{
        destination: tripData.nodes[index].destination,
        nodeType: tripData.nodes[index].nodeType,
        budget: tripData.nodes[index].budget,
        description: tripData.nodes[index].description,
        activities: tripData.nodes[index].activities,
        origin: tripData.nodes[index].origin,
        notes: tripData.nodes[index].notes,
        startTime: new Date(tripData.nodes[index].startTime),
        endTime: new Date(tripData.nodes[index].endTime),
      }}
      onSubmit={async (values) => {
        const updateTripData = _.cloneDeep(tripData);

        updateTripData.nodes[index] = {
          ...updateTripData.nodes[index],
          ...values,
          duration: 0,
          _id: tripData._id,
        };

        UpdateTripMutation.mutateAsync(updateTripData);

        // ...values,
        // _id: tripData._id,
        // duration: 0,
      }}
    >
      {(props) => (
        <Form>
          <Field name="destination" validate={validateDestination}>
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={
                    form.errors.destination && form.touched.destination
                  }
                >
                  <FormLabel>Destination</FormLabel>
                  <Input {...field} placeholder="Add a destination" />
                  <FormErrorMessage>{form.errors.destination}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>
          <Field name="description" validate={validateDescription}>
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={
                    form.errors.description && form.touched.description
                  }
                >
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Enter Description" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>
          <Field name="nodeType" validate={validateNodeType}>
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.nodeType && form.touched.nodeType}
                >
                  <FormLabel>Leg Type</FormLabel>
                  <Select {...field}>
                    {TripLegTypes.map((legType) => (
                      <option key={legType} value={legType}>
                        {legType}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.nodeType}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Field name="startTime" validate={validateTime}>
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.startTime && form.touched.startTime}
                >
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={formatDateTime(field.value)}
                    placeholder="Select Date and Time"
                  />
                  <FormErrorMessage>{form.errors.startTime}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Field name="endTime" validate={validateTime}>
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.endTime && form.touched.endTime}
                >
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={formatDateTime(field.value)}
                    placeholder="Select Date and Time"
                  />
                  <FormErrorMessage>{form.errors.endTime}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Field name="activities">
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.activities && form.touched.activities}
                >
                  <FormLabel>Activities</FormLabel>
                  <Input {...field} placeholder="Enter Description" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Field name="budget">
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.activities && form.touched.activities}
                >
                  <FormLabel>Budget</FormLabel>
                  <Input type="number" {...field} placeholder="Enter budget" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Field name="notes">
            {/* @ts-ignore */}
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.notes && form.touched.notes}
                >
                  <FormLabel>Notes</FormLabel>
                  <Input type="text" {...field} placeholder="Optional Notes" />
                  <FormErrorMessage>{form.errors.notes}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Button
            mt={4}
            mr={3}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Update
          </Button>

          <Button colorScheme="red" mt={4} mr={3} onClick={onClose}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
}

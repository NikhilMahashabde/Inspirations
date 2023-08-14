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
  INewTripData,
  UpdateTripResponse,
} from "../../../interfaces/interfaces.types";
import axios from "axios";

export function AddNodeDataForm({ onClose }: { onClose: () => void }) {
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

  const CreateTripMutation = useMutation(
    (newTripData: INewTripData) =>
      axios.post<UpdateTripResponse>(`/api/trip/${tripData._id}`, {
        newTripData,
      }),
    {
      onSuccess: (res) => {
        setTripData(res.data.updatedTrip);
        toast({
          title: "Trip Created.",
          description: "You can continue planning",
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

  return (
    <Formik
      initialValues={{
        destination: "",
        nodeType: "",
        budget: 0,
        description: "",
        activities: "",
        origin: "",
        notes: "",
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
      }}
      onSubmit={async (values) => {
        await CreateTripMutation.mutateAsync({
          ...values,
          _id: tripData._id,
          duration: 0,
        });
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
                    <option value="" disabled hidden>
                      {" "}
                      Select a leg type
                    </option>
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
            Submit
          </Button>

          <Button colorScheme="red" mt={4} mr={3} onClick={onClose}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
}

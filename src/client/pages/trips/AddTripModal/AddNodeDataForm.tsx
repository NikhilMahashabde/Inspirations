import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
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

  function validateD(value: string) {
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
        console.log("success");
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
        destination: "Enter Destination",
        nodeType: "",
        budget: 0,
        description: "No Description Entered",
        activities: "No Activities Entered",
        origin: "TBA",
        notes: "N/a",
      }}
      onSubmit={async (values, actions) => {
        await CreateTripMutation.mutateAsync({
          ...values,
          _id: tripData._id,
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          duration: 0,
          notes: "n.a",
        });
      }}
    >
      {(props) => (
        <Form>
          <Field name="destination" validate={validateDestination}>
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={
                    form.errors.destination && form.touched.destination
                  }
                >
                  <FormLabel>Destination</FormLabel>
                  <Input {...field} placeholder="test" />
                  <FormErrorMessage>{form.errors.destination}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>
          <Field name="description" validate={validateDescription}>
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

          <Field name="activities">
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.activities && form.touched.activities}
                >
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Enter Description" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field>

          <Field name="activities">
            {({ field, form }) => {
              return (
                <FormControl
                  isInvalid={form.errors.activities && form.touched.activities}
                >
                  <FormLabel>Description</FormLabel>
                  <Input type="number" {...field} placeholder="Enter budget" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
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

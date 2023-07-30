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
  INewNodeAITripData,
  INewTripData,
  UpdateTripResponse,
} from "../../../interfaces/interfaces.types";
import axios from "axios";

export function AddNodeAIDataForm({ onClose }: { onClose: () => void }) {
  const { tripData, setTripData } = useContext(DataContext);
  const toast = useToast();

  // function validateDestination(value: string) {
  //   let error;
  //   if (!value) {
  //     error = "Destination is required";
  //   }
  //   return error;
  // }

  function validateNodeType(value: string) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  function validateNodeTo(value: string) {
    let error;

    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  // function validateDescription(value: string) {
  //   let error;
  //   if (!value) {
  //     error = "Field is required";
  //   }
  //   return error;
  // }

  // function validateTime(value: string) {
  //   let error;
  //   if (!value) {
  //     error = "Field is required";
  //   }
  //   return error;
  // }

  const TripLegTypes = [
    "Meal",
    "Sightseeing",
    "Accommodation",
    "Travel",
    "Activity",
  ];

  const AddNodeAIMutation = useMutation(
    (newNodeAIPromptData: INewNodeAITripData) =>
      axios.post<UpdateTripResponse>(`/api/ai/${tripData._id}`, {
        newNodeAIPromptData,
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
        nodeType: "",
        destination: "",
        nodeFrom: null,
        nodeTo: tripData.nodes.length,
        budget: 0,
        options: "",
      }}
      onSubmit={async (values, actions) => {
        await AddNodeAIMutation.mutateAsync({
          ...values,
          destination: tripData.nodes[values.nodeTo].destination,
          _id: tripData._id,
        });
      }}
    >
      {(props) => (
        <Form>
          <Field name="nodeType" validate={validateNodeType}>
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

          {props.values.nodeType && props.values.nodeType !== "Travel" && (
            <Field name="destination" validate={validateNodeType}>
              {({ field, form }) => {
                return (
                  <FormControl
                    isInvalid={
                      form.errors.destination && form.touched.destination
                    }
                  >
                    <FormLabel>Destination</FormLabel>
                    <Input {...field} placeholder="Enter Destination" />
                    <FormErrorMessage>
                      {form.errors.destination}
                    </FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>
          )}

          {props.values.nodeType && props.values.nodeType === "Travel" && (
            <Field name="nodeFrom" validate={validateNodeType}>
              {({ field, form }) => {
                return (
                  <FormControl
                    isInvalid={form.errors.nodeFrom && form.touched.nodeFrom}
                  >
                    <FormLabel>Node From</FormLabel>

                    <Select {...field}>
                      <option value="" disabled selected hidden>
                        Select a origin location
                      </option>
                      <option value={-1}>{tripData.startLocation}</option>
                      {tripData.nodes.map((node, index) => (
                        <option key={index} value={index}>
                          {node.destination}
                        </option>
                      ))}
                    </Select>

                    <FormErrorMessage>
                      {form.errors.destination}
                    </FormErrorMessage>
                  </FormControl>
                );
              }}
            </Field>
          )}

          {props.values.nodeType &&
            props.values.nodeType === "Travel" &&
            props.values.nodeFrom !== null && (
              <Field name="nodeTo" validate={validateNodeTo}>
                {({ field, form }) => {
                  return (
                    <FormControl
                      isInvalid={form.errors.nodeFrom && form.touched.nodeFrom}
                    >
                      <FormLabel>To</FormLabel>

                      <Select {...field}>
                        <option value="" disabled selected hidden>
                          Select a origin location
                        </option>
                        {props.values.nodeFrom !== null &&
                          tripData.nodes.map((node, index) => (
                            <option key={index} value={index}>
                              {node.destination}
                            </option>
                          ))}
                        <option value={tripData.nodes.length}>
                          {tripData.endLocation}
                        </option>
                      </Select>

                      <FormErrorMessage>
                        {form.errors.destination}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
            )}

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

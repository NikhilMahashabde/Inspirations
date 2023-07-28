import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useContext } from "react";
import { DataContext } from "../../../context/AppContext";
import { useMutation } from "react-query";
import {
  INewTripData,
  MyTripsInterface,
  NodeFormValues,
  UpdateTripResponse,
} from "../../../interfaces/interfaces.types";
import axios from "axios";

export function AddNodeDataForm() {
  const { tripData, setTripData } = useContext(DataContext);
  const toast = useToast();

  function validateDestination(value: string) {
    let error;
    if (!value) {
      error = "Destination is required";
    }
    return error;
  }

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
        nodeType: "accomodation",
        budget: 0,
        description: "N/a",
        activities: "TBA",
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

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
}

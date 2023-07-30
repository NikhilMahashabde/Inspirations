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
import { DataContext } from "../../../../context/AppContext";
import { useMutation } from "react-query";
import {
  MyTripsInterface,
  NodeFormValues,
  UpdateTripResponse,
} from "../../../../interfaces/interfaces.types";
import axios from "axios";
import _ from "lodash";

export function EditTripDataForm({ index }: { index: number }) {
  const { tripData, setTripData } = useContext(DataContext);
  const toast = useToast();

  function validateDestination(value: string) {
    let error;
    if (!value) {
      error = "Destination is required";
    }
    return error;
  }

  const UpdateTripMutation = useMutation(
    (data: MyTripsInterface) =>
      axios.put<UpdateTripResponse>(`/api/trip/${data._id}`, {
        data,
      }),
    {
      onSuccess: (res) => {
        setTripData(res.data.updatedTrip);
        console.log("success");
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

  return (
    <Formik
      initialValues={{ destination: tripData?.nodes[index]?.destination }}
      onSubmit={async (values, actions) => {
        const updateTripData = _.cloneDeep(tripData);

        updateTripData.nodes[index] = {
          ...updateTripData.nodes[index],
          ...values,
        };

        await UpdateTripMutation.mutateAsync(updateTripData);

        // set cheer here
      }}
    >
      {(props: FormikProps<NodeFormValues>) => (
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

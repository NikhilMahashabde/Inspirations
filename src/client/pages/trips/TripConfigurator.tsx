import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

interface TripData {
  [key: string]: string;
}

const TripConfigurator = ({ id }: { id: string | undefined }): JSX.Element => {
  const [tripData, setTripData] = useState<TripData | undefined>();

  const tripDataMutation = useMutation(() => axios.get(`/api/trips/${id}`), {
    onSuccess: (res) => {
      setTripData(res.data.trip);
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    tripDataMutation.mutateAsync();
  }, []);

  if (tripDataMutation.isLoading)
    return (
      <>
        <h1> trip is loading.... please wait.</h1>
      </>
    );

  return (
    <>
      <h1>
        {" "}
        {tripData &&
          Object.entries(tripData).map(([key, val]) => (
            <p key={key}>
              {key}: {val}
            </p>
          ))}
      </h1>
    </>
  );
};

export default TripConfigurator;

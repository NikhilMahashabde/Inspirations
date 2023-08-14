import Footer from "../../components/Footer";
import WithSubnavigation from "../../components/navbarUI";
import CreateTripForm from "./CreateTripForm";
import { useParams } from "react-router-dom";
import TripConfigurator from "./TripConfigurator";
import { TripList } from "./TripList";
import { Heading } from "@chakra-ui/react";

const Trips = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <Heading size="4xl" color="gray.500">
            Inspirations
          </Heading>
          <WithSubnavigation />
          <TripList />
        </div>
        <Footer />
      </div>
    </>
  );
};

const CreateTrips = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <Heading size="4xl" color="gray.500">
            Inspirations
          </Heading>
          <WithSubnavigation />
          <CreateTripForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

const TripModify = () => {
  const { id } = useParams();

  return (
    <>
      <div className="container">
        <div className="content">
          <Heading size="4xl" color="gray.500">
            Inspirations
          </Heading>
          <WithSubnavigation />
          <TripConfigurator id={id} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export { Trips, CreateTrips, TripModify };

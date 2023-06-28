import Footer from "../../components/Footer";
import WithSubnavigation from "../../components/navbarUI";
import CreateTripForm from "./CreateTripForm";
import { useParams } from "react-router-dom";
import TripConfigurator from "./TripConfigurator";
import { TripList } from "./TripList";

const Trips = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <h1>Inspirations - Trips menu </h1>
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
          <h1>Inspirations - Create Trips </h1>
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
          <h1>Inspirations - Edit my trip </h1>
          <WithSubnavigation />
          <TripConfigurator id={id} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export { Trips, CreateTrips, TripModify };

import Footer from "../../components/Footer";
import WithSubnavigation from "../../components/navbarUI";
import CreateTripForm from "./CreateTripForm";
import { useParams } from "react-router-dom";
import TripConfigurator from "./TripConfigurator";

const Trips = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <h1>Inspirations - Trips menu </h1>
          <WithSubnavigation />
          {/* my trips component that shows all trips i have access to.  */}

          <h1> create trips </h1>
          <h1> render all trips here curernt ones </h1>
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

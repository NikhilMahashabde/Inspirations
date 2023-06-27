import Footer from "../../components/Footer";
import WithSubnavigation from "../../components/navbarUI";

import NoMatchingRoutes from "./nomatchingroutes";

const CouldNotFind = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>Inspirations - 404 </h1>
        <WithSubnavigation />
        <NoMatchingRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default CouldNotFind;

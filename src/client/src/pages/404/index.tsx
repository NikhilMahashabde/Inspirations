import Footer from "../../components/Footer";
import WithSubnavigation from "../../components/navbarUI";

import NoMatchingRoutes from "./nomatchingroutes";
import { Heading } from "@chakra-ui/react";

const CouldNotFind = () => {
  return (
    <div className="container">
      <div className="content">
        <Heading size="4xl" color="gray.500">
          Inspirations
        </Heading>
        <WithSubnavigation />
        <NoMatchingRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default CouldNotFind;

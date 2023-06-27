import WithSubnavigation from "../../components/navbarUI";

import NoMatchingRoutes from "./nomatchingroutes";

const CouldNotFind = () => {
  return (
    <>
      <h1>Inspirations - 404 </h1>
      <WithSubnavigation />
      <NoMatchingRoutes />
    </>
  );
};

export default CouldNotFind;

import { useContext } from "react";
import CallToActionWithIllustration from "./homepage";
import WithSubnavigation from "../../components/navbarUI";
import AuthHomepage from "./AuthHomepage";
import Footer from "../../components/Footer";
import { DataContext } from "../../context/AppContext";
import { Heading } from "@chakra-ui/react";

const Home = () => {
  const { isAuthenticated, navigate } = useContext(DataContext);

  if (isAuthenticated) navigate("/trips");

  return (
    <>
      {!isAuthenticated ? (
        <>
          <div className="container">
            <div className="content">
              <CallToActionWithIllustration />
            </div>
            <Footer />
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="content">
              <Heading size="4xl" color="gray.500">
                Inspirations
              </Heading>
              <WithSubnavigation />
              <AuthHomepage />
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Home;

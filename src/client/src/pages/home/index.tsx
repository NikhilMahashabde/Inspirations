import { useContext } from "react";
import CallToActionWithIllustration from "./homepage";
import WithSubnavigation from "../../components/navbarUI";
import AuthHomepage from "./AuthHomepage";
import Footer from "../../components/Footer";
import { DataContext } from "../../context/AppContext";

const Home = () => {
  const { isAuthenticated, navigate } = useContext(DataContext);

  if (isAuthenticated) navigate("/");

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
              <h1>Home page</h1>
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

import { useContext } from "react";
import CallToActionWithIllustration from "./homepage";
import AuthDataContext from "../../context/AuthDataContext";
import WithSubnavigation from "../../components/navbarUI";
import AuthHomepage from "./AuthHomepage";

const Home = () => {
  const { isAuthenticated } = useContext(AuthDataContext);

  return (
    <>
      {!isAuthenticated ? (
        <CallToActionWithIllustration />
      ) : (
        <>
          <h1>Home page</h1>
          <WithSubnavigation />
          <AuthHomepage />
        </>
      )}
    </>
  );
};

export default Home;

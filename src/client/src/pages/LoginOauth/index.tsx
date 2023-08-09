import WithSubnavigation from "../../components/navbarUI";
import { useContext } from "react";
import Footer from "../../components/Footer";
import { DataContext } from "../../context/AppContext";
import OauthLogin from "./OauthLogin";

const OauthLoginPage = () => {
  const { isAuthenticated, navigate } = useContext(DataContext);

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <h1>Inspirations - Oauth Login </h1>
          <WithSubnavigation />
          <OauthLogin />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default OauthLoginPage;

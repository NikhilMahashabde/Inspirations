import WithSubnavigation from "../../components/navbarUI";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import Footer from "../../components/Footer";
import { DataContext } from "../../context/AppContext";
import { Heading } from "@chakra-ui/react";

const Login = () => {
  const { isAuthenticated, navigate } = useContext(DataContext);
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <Heading size="4xl" color="gray.500">
            Inspirations
          </Heading>
          <WithSubnavigation />
          <LoginForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;

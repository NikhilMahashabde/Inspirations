import { useContext, useEffect } from "react";
import WithSubnavigation from "../../components/navbarUI";
import RegisterForm from "./RegisterForm";
import Footer from "../../components/Footer";
import { DataContext } from "../../context/AppContext";
import { Heading } from "@chakra-ui/react";

const Register = () => {
  const { isAuthenticated, navigate } = useContext(DataContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="container">
      <div className="content">
        <Heading size="4xl" color="gray.500">
          Inspirations
        </Heading>
        <WithSubnavigation />
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default Register;

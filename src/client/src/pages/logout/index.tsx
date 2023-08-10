import { Heading } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import WithSubnavigation from "../../components/navbarUI";
import LogoutForm from "./Logout";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <Heading size="4xl" color="gray.500">
            Inspirations
          </Heading>
          <WithSubnavigation />
          <LogoutForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;

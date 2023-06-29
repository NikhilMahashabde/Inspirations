import { useContext, useEffect } from "react";
import WithSubnavigation from "../../components/navbarUI";
import RegisterForm from "./RegisterForm";
import Footer from "../../components/Footer";
import { DataContext } from "../../context/AppContext";

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
        <h1>Inspirations - Login </h1>
        <WithSubnavigation />
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default Register;

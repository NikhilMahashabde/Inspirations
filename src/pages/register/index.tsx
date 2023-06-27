import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WithSubnavigation from "../../components/navbarUI";
import AuthDataContext from "../../context/AuthDataContext";
import RegisterForm from "./RegisterForm";
import Footer from "../../components/Footer";

const Register = () => {
  const { isAuthenticated } = useContext(AuthDataContext);
  const navigate = useNavigate();

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

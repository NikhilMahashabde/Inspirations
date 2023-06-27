import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WithSubnavigation from "../../components/navbarUI";
import AuthDataContext from "../../context/AuthDataContext";
import RegisterForm from "./RegisterForm";

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
    <>
      <h1>Inspirations - Login </h1>
      <WithSubnavigation />
      <RegisterForm />
    </>
  );
};

export default Register;

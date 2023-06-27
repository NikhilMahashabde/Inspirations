import { useNavigate } from "react-router-dom";
import WithSubnavigation from "../../components/navbarUI";
import AuthDataContext from "../../context/AuthDataContext";
import LoginForm from "./LoginForm";
import { useContext, useEffect } from "react";

const Login = () => {
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
      <LoginForm />
    </>
  );
};

export default Login;

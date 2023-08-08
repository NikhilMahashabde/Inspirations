import WithSubnavigation from "../../components/navbarUI";
import LoginForm from "./LoginForm";
import { useContext, useEffect } from "react";
import Footer from "../../components/Footer";
import { DataContext } from "../../context/AppContext";

const Login = () => {
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
    <>
      <div className="container">
        <div className="content">
          <h1>Inspirations - Login </h1>
          <WithSubnavigation />
          <LoginForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;

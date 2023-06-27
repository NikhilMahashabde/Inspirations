import Footer from "../../components/Footer";
import WithSubnavigation from "../../components/navbarUI";
import LogoutForm from "./Logout";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="content">
          <h1>Inspirations - Login </h1>
          <WithSubnavigation />
          <LogoutForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;

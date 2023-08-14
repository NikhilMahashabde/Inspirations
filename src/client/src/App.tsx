import { useContext, useEffect } from "react";
// import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import axios from "axios";
import { useMutation } from "react-query";
import Router from "./pages/Router";
import "./assets/css/styles.css";
import { DataContext } from "./context/AppContext";
import { LoginStateResponse } from "./interfaces/interfaces.types";

function App() {
  const { setIsAuthenticated, setUserName } = useContext(DataContext);

  const loginStateMutation = useMutation<LoginStateResponse>(
    () => axios.get("/api/sessions"),
    {
      onSuccess: (response) => {
        setIsAuthenticated(response.data.isLoggedIn);
        setUserName(response.data.name);
      },
    }
  );

  useEffect(() => {
    loginStateMutation.mutateAsync();
  }, []);

  if (loginStateMutation.isLoading) {
    return <div>Loading...</div>;
  }

  return <Router />;
}

export default App;

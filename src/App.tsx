import { useEffect, useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import AuthContext from "./context/AuthContext";
import AuthDataContext from "./context/AuthDataContext";
import axios from "axios";
import { useMutation } from "react-query";
import Router from "./pages/Router";

interface LoginStateResponse {
  data: {
    isLoggedIn: boolean;
    name: string;
  };
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

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
    return <div></div>;
  }

  return (
    // <QueryClientProvider client={queryClient}>
    <AuthContext.Provider value={{ setIsAuthenticated, setUserName }}>
      <AuthDataContext.Provider value={{ isAuthenticated, userName }}>
        <Router />
      </AuthDataContext.Provider>
    </AuthContext.Provider>
    // </QueryClientProvider>
  );
}

export default App;

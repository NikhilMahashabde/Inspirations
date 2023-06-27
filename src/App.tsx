import { useEffect, useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import AuthContext from "./context/AuthContext";
import AuthDataContext from "./context/AuthDataContext";
import axios from "axios";
import { useMutation } from "react-query";
import Router from "./pages/router";

interface LoginStateResponse {
  data: {
    isLoggedIn: boolean;
    name: string;
  };
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const loginStateMutation = useMutation<LoginStateResponse>(
    () => axios.get("/api/sessions"),
    {
      onSuccess: (response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        setUserName(response.data.name);
      },
    }
  );

  useEffect(() => {
    loginStateMutation.mutateAsync();
  }, []);

  return (
    // <QueryClientProvider client={queryClient}>
    <AuthContext.Provider value={{ setIsLoggedIn, setUserName }}>
      <AuthDataContext.Provider value={{ isLoggedIn, userName }}>
        <Router />
      </AuthDataContext.Provider>
    </AuthContext.Provider>
    // </QueryClientProvider>
  );
}

export default App;

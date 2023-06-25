import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import WithSubnavigation from "./components/navbarUI";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <>
          <h5>Inspirations HEDING</h5>
          <WithSubnavigation />

          <AppRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUserName={setUserName}
          />
        </>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

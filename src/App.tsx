import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import WithSubnavigation from "./components/navbarUI";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((count) => count + 1);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <>
          <h5>Inspirations HEDING</h5>
          <h1>count: {count}</h1>
          {isLoggedIn && (
            <h1>
              welcome {userName} and count {count}{" "}
            </h1>
          )}

          <WithSubnavigation setCount={setCount} />
          <AppRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUserName={setUserName}
            setCount={setCount}
          />
        </>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

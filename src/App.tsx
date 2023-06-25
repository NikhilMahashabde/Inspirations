import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import WithSubnavigation from "./components/navbarUI";

const getGreeting = async function () {
  const res = await fetch("/api/test");
  return await res.json();
};

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <h1>Inspirations</h1>
        <WithSubnavigation />
        {/* <Navigationbar isLoggedIn={isLoggedIn} userName={userName} /> */}
      </>
    </QueryClientProvider>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { QueryClient, QueryClientProvider } from "react-query";
import { DataProvider } from "./context/AppContext.tsx";
import React from "react";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DataProvider>
          <Auth0ProviderWithNavigate>
            <App />
          </Auth0ProviderWithNavigate>
        </DataProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
  // </React.StrictMode>
);

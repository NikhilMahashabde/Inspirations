import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { QueryClient, QueryClientProvider } from "react-query";
import { DataProvider } from "./context/AppContext.tsx";

import { Auth0ProviderWithNavigate } from "./services/auth0-provider-with-navigate.tsx";
import OrbitProvider from "@kiwicom/orbit-components/lib/OrbitProvider";

import { defaultTheme } from "@kiwicom/orbit-components";

const queryClient = new QueryClient();

// const customTokens = getTokens({
//   palette: {
//     product: {
//       light: "#9ae5da",
//       lightHover: "#7fded0",
//       lightActive: "#64d7c6",
//       normal: "#00a991",
//       normalHover: "#009882",
//       normalActive: "#008f7b",
//       dark: "#005448",
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ChakraProvider>
    <OrbitProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DataProvider>
            <Auth0ProviderWithNavigate>
              <App />
            </Auth0ProviderWithNavigate>
          </DataProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </OrbitProvider>
  </ChakraProvider>
  // </React.StrictMode>
);

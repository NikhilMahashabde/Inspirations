import { createContext, Dispatch, SetStateAction, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { MyTripsInterface, TripData } from "../interfaces/interfaces.types";

interface DataContextProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserName: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  userName: string;
  navigate: NavigateFunction;
  errorResponse: string;
  setErrorResponse: Dispatch<SetStateAction<string>>;
  myTrips: MyTripsInterface[] | undefined;
  setMyTrips: Dispatch<SetStateAction<MyTripsInterface[] | undefined>>;
  tripData: MyTripsInterface | undefined;
  setTripData: Dispatch<SetStateAction<MyTripsInterface | undefined>>;
}

const DataContext = createContext<DataContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {
    return;
  },
  setUserName: () => {
    return;
  },
  userName: "",
  navigate: () => {
    return;
  },
  errorResponse: "",
  setErrorResponse: () => {
    return;
  },
  myTrips: undefined,
  setMyTrips: () => {
    return;
  },
  tripData: undefined,
  setTripData: () => {
    return;
  },
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState<string>("");
  const [myTrips, setMyTrips] = useState<MyTripsInterface[] | undefined>();
  const [tripData, setTripData] = useState<TripData | undefined>();

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userName,
        setUserName,
        navigate,
        errorResponse,
        setErrorResponse,
        myTrips,
        setMyTrips,
        tripData,
        setTripData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { MyTripsInterface } from "../interfaces/interfaces.types";

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
  tripData: MyTripsInterface;
  setTripData: Dispatch<SetStateAction<MyTripsInterface>>;
  isRowExpanded: boolean[] | [];
  setIsRowExpanded: Dispatch<SetStateAction<boolean[] | []>>;
}

const defaultTripData: MyTripsInterface = {
  _id: "",
  name: "",
  authorisation: [],
  images: [],
  purpose: "",
  budget: 0,
  startDate: "",
  endDate: "",
  nodes: [],
  startLocation: "",
  endLocation: "",
  destinations: [],
  participants: 0,
};

const defaultValues = {
  isAuthenticated: false,
  isRowExpanded: [],
  setIsRowExpanded: () => {
    return;
  },
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
  tripData: {
    _id: "",
    images: [],
    name: "",
    authorisation: [],
    purpose: "",
    budget: 0,
    startDate: "",
    endDate: "",
    nodes: [],
    startLocation: "",
    endLocation: "",
    destinations: [],
    participants: 0,
  },
  setTripData: () => {
    return;
  },
};

const DataContext = createContext<DataContextProps>(defaultValues);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState<string>("");
  const [myTrips, setMyTrips] = useState<MyTripsInterface[] | undefined>();
  const [tripData, setTripData] = useState<MyTripsInterface>(defaultTripData);
  const [isRowExpanded, setIsRowExpanded] = useState<boolean[] | []>([]);

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
        isRowExpanded,
        setIsRowExpanded,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };

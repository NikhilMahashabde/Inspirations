import { createContext, Dispatch, SetStateAction, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface AuthContextProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserName: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  userName: string;
  navigate: NavigateFunction;
  errorResponse: string;
  setErrorResponse: Dispatch<SetStateAction<string>>;
}

const DataContext = createContext<AuthContextProps>({
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
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState<string>("");

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };

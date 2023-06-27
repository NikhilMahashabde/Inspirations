import { createContext, Dispatch, SetStateAction } from "react";

interface AuthDataContextProps {
  isLoggedIn: boolean;
  userName: string;
}

const AuthDataContext = createContext<AuthDataContextProps>({
  isLoggedIn: false,
  userName: "",
});

export default AuthDataContext;

import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUserName: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps>({
  setIsLoggedIn: () => ({} || false),
  setUserName: () => ({} || ""),
});

export default AuthContext;

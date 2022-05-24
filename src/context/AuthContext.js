import { createContext, useReducer ,useEffect} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    CurrentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
useEffect(() => {
    localStorage.setItem("user",JSON.stringify(state.CurrentUser));
   
}, [state.CurrentUser]);
  return (
    <AuthContext.Provider value={{ CurrentUser: state.CurrentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
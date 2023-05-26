import { useContext, useState, createContext } from "react";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",

    username: "",
    logged: false,
    userId: "",
    password: "",

    password_validation: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

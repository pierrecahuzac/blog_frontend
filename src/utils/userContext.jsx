import { useContext, useState, createContext } from "react";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "user1@blog.com",

    username: "",
    logged: false,
    userId: "",
    password: "User1@32",

    password_validation: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

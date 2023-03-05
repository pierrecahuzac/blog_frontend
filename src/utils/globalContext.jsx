import { useContext, useState, createContext } from "react";
const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <GlobalContext.Provider
      value={{ isLoading, setIsloading, isDarkMode, setIsDarkMode }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

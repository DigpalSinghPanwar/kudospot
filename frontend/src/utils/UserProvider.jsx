import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const login = (id) => {
    sessionStorage.setItem("userId", id);
    setUserId(id);
  };

  const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("name");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

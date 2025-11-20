import { useState, createContext } from "react";
export const MainContext = createContext();
const AuthContext = (props) => {
  const [user, setUser] = useState({});
  const [baseUrl, setBaseUrl] = useState('https://mydlv.onrender.com/api/v1/');
  // const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setIsLoggedin(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsLoggedin(false);
  };
  const getToken = () => localStorage.getItem("token");
    
 
    const [token, setToken] = useState(getToken());
    const [isLoggedin, setIsLoggedin] = useState(!!getToken());
    const saveToken = (token, user) =>
    {
        sessionStorage.setItem('token', JSON.stringify(token));     
        setToken(token)
    }
    const contextValue = 
    {
      setToken:saveToken,
      token,
      baseUrl,
      user,
      setUser,
      login, 
      isAuthenticated,
      logout,
      isLoggedin,
      setIsLoggedin
    }
  return (
    <MainContext.Provider value={contextValue}>{props.children}</MainContext.Provider> 
  )
}

export default AuthContext
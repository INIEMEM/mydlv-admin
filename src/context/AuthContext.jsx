import { useState, createContext } from "react";
export const MainContext = createContext();
const AuthContext = (props) => {
  const [user, setUser] = useState({});
  const [baseUrl, setBaseUrl] = useState('https://mydlv.onrender.com/api/v1/');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    try {
      // Only parse if tokenString exists
      return tokenString ? JSON.parse(tokenString) : null;
    } catch (error) {
      console.error("Failed to parse token:", error);
      return null;
    }
  }; 
    
 
    const [token, setToken] = useState(getToken());
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
      logout
    }
  return (
    <MainContext.Provider value={contextValue}>{props.children}</MainContext.Provider> 
  )
}

export default AuthContext
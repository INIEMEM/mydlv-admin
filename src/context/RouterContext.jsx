import React, { useState, createContext, useContext } from 'react';
export const RouterContext = createContext(null);

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');

  const navigate = (path) => {
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useNavigate = () => {
  const context = useContext(RouterContext);
  return context.navigate;
};

export const useLocation = () => {
  const context = useContext(RouterContext);
  return { pathname: context.currentPath };
};
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <AppContext.Provider value={{ account, setAccount }}>
      {children}
    </AppContext.Provider>
  );
};

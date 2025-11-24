import React, { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export const useScrollTheme = () => useContext(ScrollContext);

export const ScrollThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  return (
    <ScrollContext.Provider value={{ theme, setTheme }}>
      {children}
    </ScrollContext.Provider>
  );
};
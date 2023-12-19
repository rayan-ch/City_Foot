import { createContext, useContext } from 'react';

const TextContext = createContext();

export const useLangContext = () => {
  return useContext(TextContext);
};

export const Lang = ({ children, value }) => {
  return <TextContext.Provider value={value}>{children}</TextContext.Provider>;
};
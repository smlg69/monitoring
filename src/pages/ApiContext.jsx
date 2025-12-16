// src/pages/ApiContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const DEFAULT_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTFlMWY1Mi0xMDc4LTQ3NTAtODNjNy0xM2I3ZTg3NjUwZmEiLCJzdWIiOiJhZG1pbiIsImF1ZCI6InJlZnJlc2giLCJpYXQiOjE3NjU4Nzk3MTcsImV4cCI6MTc2NTk2NjExN30.q49X51NYgHgJuM8VJt6gSvJ1OFOWDmGKrxRR6JgydDQ";

  const [apiToken, setApiToken] = useState(() => {
    return localStorage.getItem('api_token') || DEFAULT_TOKEN;
  });
  
  useEffect(() => {
    if (apiToken && apiToken !== DEFAULT_TOKEN) {
      localStorage.setItem('api_token', apiToken);
    }
  }, [apiToken, DEFAULT_TOKEN]);

  const value = {
    apiToken,
    setApiToken,
    isTokenValid: () => !!apiToken && apiToken.trim().length > 0
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};
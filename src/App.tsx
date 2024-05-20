import React, { useEffect, useState } from 'react';

import Login from './components/Login';
import LoggedIn from './components/LoggedIn';
import { Tokens } from './types/User';

export default function App()  {
  const [tokens, setTokens] = useState<Tokens | null>(null);

  useEffect(() => {
    
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');

    if (savedAccessToken && savedRefreshToken) {
      setTokens({ access: savedAccessToken, refresh: savedRefreshToken });
    }
  }, []);

  const handleLogin = (tokens: Tokens) => {
    setTokens(tokens)
  };

  const handleLogout = () => {
    setTokens(null);
  };
  
  return (
    <div className="App">
    { tokens ? ( // Verifica se token não é null
      <LoggedIn tokens={tokens} onLogout={handleLogout} />
    ) : (
      <Login onLogin={handleLogin}  />
    )}
  </div>
  );
};


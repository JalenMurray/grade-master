import { createContext, useState } from 'react';
import { getUser } from '../utils/api';

export const UserContext = createContext({
  user: {},
  setUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = async () => {
    setIsAuthenticating(true);
    const response = await getUser();
    if (response.success) {
      setUser(response.data);
      setIsAuthenticating(false);
    } else {
      setIsAuthenticating(false);
    }
  };

  const value = { user, isAuthenticating, setUser, login };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

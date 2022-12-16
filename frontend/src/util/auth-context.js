import { createContext, useEffect, useState } from 'react';
import { getRequest } from '../util/api-requests';

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  // whoami data
  const [authData, setAuthData] = useState({
    isLoggedIn: '',
    userId: '',
    username: '',
  });

  // fetch data
  useEffect(() => {
    (async () => {
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/auth/whoami`);
      if (json.success) {
        setAuthData({
          isLoggedIn: json.success,
          userId: json.data.userId,
          username: json.data.username,
        });
      }
    })();
  }, []);

  // return auth-data
  return <AuthContext.Provider value={{ authData }}>{props.children}</AuthContext.Provider>;
};

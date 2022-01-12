import React from 'react';
// import { useApolloClient } from '@apollo/react-hooks';

interface AuthContextData {
  token: string | null;
  setToken: (t: string | null) => void;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem('@phoenix-admin:token'),
  );
  // const client = useApolloClient();
  React.useEffect(() => {
    if (token) localStorage.setItem('@phoenix-admin:token', token);
    if (!token) localStorage.removeItem('@phoenix-admin:token');
    // client.clearStore();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error('useAuth must de used within an AuthProvider');

  return context;
}

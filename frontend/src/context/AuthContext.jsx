import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMe,
  logout,
} from "../services/auth.service";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const initialize =
      async () => {

        const token =
          localStorage.getItem(
            "accessToken"
          );

        if (!token) {

          setLoading(false);

          return;

        }

        try {

          const response =
            await getMe();

          setUser(
            response.data
          );

        } catch {

          catch {

  localStorage.removeItem("accessToken");

  setUser(null);



        } finally {

          setLoading(false);

        }

      };

    initialize();

  }, []);

  const login = (
    userData
  ) => {

    setUser(
      userData
    );

  };

  const signOut =
    async () => {

      try {

        await logout();

      } finally {

        localStorage.removeItem(
          "accessToken"
        );

        setUser(null);

      }

    };

  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        login,

        signOut,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth =
  () => useContext(
    AuthContext
  );
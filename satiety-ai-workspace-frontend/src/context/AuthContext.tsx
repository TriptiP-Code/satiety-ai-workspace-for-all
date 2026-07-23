import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { User } from "../types/user";

import {
  loginApi,
  registerApi,
} from "../services/authApi";

import {
  saveToken,
  removeToken,
  getToken,
} from "../utils/token";

interface AuthContextType {
  user: User | null;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

const CURRENT_USER_KEY = "satiety-current-user";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const token = getToken();

    const savedUser =
      localStorage.getItem(
        CURRENT_USER_KEY
      );

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  async function signup(
    name: string,
    email: string,
    password: string
  ) {
    try {
      const data = await registerApi(
        name,
        email,
        password
      );

      saveToken(data.token);

      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(data.user)
      );

      setUser(data.user);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function login(
    email: string,
    password: string
  ) {
    try {
      const data = await loginApi(
        email,
        password
      );

      saveToken(data.token);

      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(data.user)
      );

      setUser(data.user);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  function logout() {
    removeToken();

    localStorage.removeItem(
      CURRENT_USER_KEY
    );

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { useState, useCallback } from "react";

export interface AuthUser {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    // Stub implementation
    console.warn("useAuth.login() called but authentication is not implemented");
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    // Stub implementation
    console.warn("useAuth.signup() called but authentication is not implemented");
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
  };
}



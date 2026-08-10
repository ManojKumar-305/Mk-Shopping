import { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  updateProfile as updateProfileService,
} from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function login(email, password) {
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    const normalizedPassword = String(password ?? "");

    return await loginService(normalizedEmail, normalizedPassword);
  }

  async function register(fullName, email, password) {
    const normalizedFullName = String(fullName ?? "").trim();
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    const normalizedPassword = String(password ?? "");

    return await registerService(
      normalizedFullName,
      normalizedEmail,
      normalizedPassword
    );
  }

  async function logout() {
    return await logoutService();
  }

  async function updateProfile(fullName) {
    const normalizedFullName = String(fullName ?? "").trim();
    const result = await updateProfileService(normalizedFullName);

    if (result?.user) {
      setUser((currentUser) => {
        if (!currentUser) {
          return result.user;
        }

        return {
          ...currentUser,
          ...result.user,
          user_metadata: {
            ...(currentUser.user_metadata || {}),
            ...(result.user.user_metadata || {}),
          },
        };
      });
    }

    return result;
  }

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isAuthenticated: !!user,

      login,
      register,
      logout,
      updateProfile,
    }),
    [user, session, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
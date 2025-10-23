import { useState, useEffect } from "react";
import { SignIn2 } from "@/components/ui/clean-minimal-sign-in";
import { Dashboard } from "@/components/ui/dashboard-with-collapsible-sidebar";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers = storedToken
          ? { Authorization: `Bearer ${storedToken}` }
          : {};

        const res = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/auth/me",
          {
            credentials: "include",
            headers,
          }
        );

        if (res.ok) {
          setIsLoggedIn(true);
          return;
        }

        // If server check failed, try validating the token locally (best-effort fallback)
        if (storedToken) {
          try {
            const parts = storedToken.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(
                atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
              );
              const now = Math.floor(Date.now() / 1000);
              if (!payload.exp || payload.exp > now) {
                setIsLoggedIn(true);
                return;
              }
            }
          } catch (e) {
            // ignore parse errors
          }
        }
      } catch (err) {
        // not authenticated or network error; try local token fallback
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (storedToken) {
          try {
            const parts = storedToken.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(
                atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
              );
              const now = Math.floor(Date.now() / 1000);
              if (!payload.exp || payload.exp > now) {
                setIsLoggedIn(true);
              }
            }
          } catch (e) {
            // ignore
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <SignIn2 onSignIn={handleSignIn} />;
  }

  return <Dashboard />;
}

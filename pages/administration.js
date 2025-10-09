import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import AdministrationSection from "../components/ui/administration";

export default function AdministrationPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to send Authorization Bearer token if stored in localStorage (works when server returned token)
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers = storedToken
          ? { Authorization: `Bearer ${storedToken}` }
          : {};

        const response = await fetch("http://localhost:4000/api/auth/me", {
          credentials: "include",
          headers,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user.role === "admin") {
            setUser(data.user);
          } else {
            router.push("/login");
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>General Administration - Al-Rasheed Academy</title>
      </Head>

      <NavBarOnly />
      <Ticker />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            <span className="text-black">General</span>{" "}
            <span className="text-[#E99544]">Administration</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Administration Component */}
        <AdministrationSection />
      </main>

      <Footer />
    </>
  );
}

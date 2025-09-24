import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // store token and user in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setLoading(false);
      // redirect to home or dashboard
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <div className="max-w-md mx-auto px-6 py-16">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-semibold mb-4">
              Log in to your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                  placeholder="Your password"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-600">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

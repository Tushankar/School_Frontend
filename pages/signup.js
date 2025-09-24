import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Register
      const regRes = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const regData = await regRes.json();
      if (!regRes.ok) {
        setError(regData.error || "Registration failed");
        setLoading(false);
        return;
      }

      // After successful register, automatically login
      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setError(loginData.error || "Login after signup failed");
        setLoading(false);
        return;
      }

      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
      }

      setLoading(false);
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
            <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                  placeholder="Your full name"
                />
              </div>

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
                  placeholder="Choose a strong password"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600">
                Log in
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

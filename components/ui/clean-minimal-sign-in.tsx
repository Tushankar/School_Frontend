"use client" 

import * as React from "react"
 
import { useState } from "react";
import { useRouter } from "next/navigation";

import {LogIn, Lock, Mail} from "lucide-react";
 
interface SignIn2Props {
  onSignIn?: () => void;
}

const SignIn2: React.FC<SignIn2Props> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
 
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
 
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:4000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setResetMessage("Reset code sent to your email.");
        setIsForgotPassword(true);
      } else {
        setError(data.error || "Failed to send reset code");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword) {
      setError("Please enter code and new password.");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:4000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: resetCode, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setResetMessage("Password reset successfully. You can now sign in.");
        setIsForgotPassword(false);
        setResetCode("");
        setNewPassword("");
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // to include cookies
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Save token + user in localStorage for persistence across reloads
        if (data.token) {
          try {
            localStorage.setItem("token", data.token);
          } catch (e) {
            console.warn("Could not save token to localStorage", e);
          }
        }
        if (data.user) {
          try {
            localStorage.setItem("user", JSON.stringify(data.user));
          } catch (e) {
            console.warn("Could not save user to localStorage", e);
          }
        }

        if (onSignIn) {
          onSignIn();
        } else {
          // Redirect based on role if available
          if (data.user && data.user.role === "admin") {
            router.push("/administration");
          } else {
            router.push("/");
          }
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };
 
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white rounded-xl  z-1">
      <div className="w-full max-w-sm bg-gradient-to-b from-sky-50/50 to-white  rounded-3xl shadow-xl shadow-opacity-10 p-8 flex flex-col items-center border border-blue-100 text-black">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg shadow-opacity-5">
          <LogIn className="w-7 h-7 text-black" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          {isForgotPassword ? "Reset Password" : "Sign in with email"}
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Make a new doc to bring your words, data, and teams together. For free
        </p>
        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!isForgotPassword && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                placeholder="Password"
                type="password"
                value={password}
                className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xs select-none"></span>
            </div>
          )}
          {isForgotPassword && (
            <>
              <input
                placeholder="Reset Code"
                type="text"
                value={resetCode}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                onChange={(e) => setResetCode(e.target.value)}
              />
              <input
                placeholder="New Password"
                type="password"
                value={newPassword}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </>
          )}
          <div className="w-full flex justify-end">
          {error && (
            <div className="text-sm text-red-500 text-left">{error}</div>
          )}
          {resetMessage && (
            <div className="text-sm text-green-500 text-left">{resetMessage}</div>
          )}
            <button onClick={isForgotPassword ? () => setIsForgotPassword(false) : handleForgotPassword} className="text-xs hover:underline font-medium">
              {isForgotPassword ? "Back to Sign In" : "Forgot password?"}
            </button>
          </div>
        </div>
        <button
          onClick={isForgotPassword ? handleResetPassword : handleSignIn}
          className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2"
        >
          {isForgotPassword ? "Reset Password" : "Get Started"}
        </button>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400">Or sign in with</span>
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
 
export { SignIn2 };
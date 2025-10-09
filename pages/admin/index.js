import { useState } from "react";
import { SignIn2 } from "@/components/ui/clean-minimal-sign-in";
import { Dashboard } from "@/components/ui/dashboard-with-collapsible-sidebar";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <SignIn2 onSignIn={handleSignIn} />;
  }

  return <Dashboard />;
}

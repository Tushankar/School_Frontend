"use client";

import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import EnrollmentForm from "../forms/App";

export default function Enrollment() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Enrollment - Al-Rasheed Academy</title>
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </Head>

      <NavBarOnly />
      <Ticker />

      <main className="flex-grow">
        <EnrollmentForm />
      </main>

      <Footer />
    </div>
  );
}

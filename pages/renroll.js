"use client";

import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import RenrollApp from "../renroll/App";

export default function Renroll() {
  return (
    <>
      <Head>
        <title>Re-Enrollment - Al-Rasheed Academy</title>
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </Head>

      <NavBarOnly />
      <Ticker />

      <RenrollApp />

      <Footer />
    </>
  );
}

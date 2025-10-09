"use client";

import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import EnrollmentForm from "../forms/App";
import { motion } from "framer-motion";

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

      {/* Banner Section */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/hall.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl font-light tracking-wide"
          >
            Enrollment
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            Home › Enrollment
          </motion.p>
        </div>
      </div>

      <main className="flex-grow">
        <EnrollmentForm />
      </main>

      <Footer />
    </div>
  );
}

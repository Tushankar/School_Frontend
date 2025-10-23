import Head from "next/head";
import { motion } from "framer-motion";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import { CalendarDemo } from "../components/ui/calendar-demo";

export default function Calendar() {
  return (
    <>
      <Head>
        <title>Calendar - Al-Rasheed Academy</title>
      </Head>

      <NavBarOnly />
      <Ticker />

      {/* Banner Section */}
      <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-80 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/hall.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              fontWeight: 300,
              letterSpacing: "0.05em"
            }}
          >
            Academic Calendar
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{
              marginTop: "clamp(0.5rem, 2vw, 1rem)",
              fontSize: "clamp(0.75rem, 2vw, 1rem)"
            }}
          >
            Home › Calendar
          </motion.p>
        </div>
      </div>

      <main className="min-h-screen bg-gray-50">
        <CalendarDemo />
      </main>

      <Footer />
    </>
  );
}
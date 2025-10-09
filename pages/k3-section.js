import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import K3FacultySection from "../components/ui/k3-faculty";

export default function K3SectionPage() {
  return (
    <>
      <Head>
        <title>K-3 Section Faculty - Al-Rasheed Academy</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <NavBarOnly />
      <Ticker />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <K3FacultySection />
      </main>

      <Footer />
    </>
  );
}

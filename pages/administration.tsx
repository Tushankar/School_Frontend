import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import AdministrationSection from "../components/ui/administration";

export default function AdministrationPage() {
  return (
    <>
      <Head>
        <title>General Administration - Al-Rasheed Academy</title>
      </Head>

  <NavBarOnly />
  <Ticker />

  <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AdministrationSection />
      </main>

      <Footer />
    </>
  );
}
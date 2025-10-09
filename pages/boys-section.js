import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import BoysFacultySection from "../components/ui/boys-faculty";

export default function BoysSectionPage() {
  return (
    <>
      <Head>
        <title>Boys&apos; Section Faculty - Al-Rasheed Academy</title>
      </Head>

      <NavBarOnly />
      <Ticker />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <BoysFacultySection />
      </main>

      <Footer />
    </>
  );
}

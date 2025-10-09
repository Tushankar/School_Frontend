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
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            <span className="text-black">Boys&apos; Section</span>{" "}
            <span className="text-[#E99544]">Faculty</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Faculty Components */}
        <div className="space-y-16">
          <BoysFacultySection />
        </div>
      </main>

      <Footer />
    </>
  );
}

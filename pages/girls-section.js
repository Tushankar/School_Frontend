import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import GirlsFacultySection from "../components/ui/girls-faculty";

export default function GirlsSectionPage() {
  return (
    <>
      <Head>
        <title>Girls' Section Faculty - Al-Rasheed Academy</title>
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
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            <span className="text-black">Girls' Section</span>{" "}
            <span className="text-[#E99544]">Faculty</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Faculty Components */}
        <div className="space-y-16">
          <GirlsFacultySection />
        </div>
      </main>

      <Footer />
    </>
  );
}

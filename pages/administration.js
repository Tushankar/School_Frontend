import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import AdministrationSection from "../components/ui/administration";

export default function AdministrationPage() {
  return (
    <>
      <Head>
        <title>General Administration - Al-Rasheed Academy</title>
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

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            <span className="text-black">General</span>{" "}
            <span className="text-[#E99544]">Administration</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Administration Component */}
        <AdministrationSection />
      </main>

      <Footer />
    </>
  );
}

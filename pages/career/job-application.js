import Head from "next/head";
import NavBarOnly from "../../components/NavBarOnly";
import Footer from "../../components/Footer";

export default function JobApplication() {
  return (
    <>
      <Head>
        <title>Job Application - Al-Rasheed Academy</title>
      </Head>

      <NavBarOnly />

      <main className="min-h-screen p-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Job Application</h1>
          <p className="text-gray-700 mb-6">
            Please check current openings and submit your CV. For now, this is a
            placeholder page. You can add form handling or link to an external
            job portal.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

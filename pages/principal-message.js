import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";

export default function PrincipalMessage() {
  return (
    <>
      <Head>
        <title>Principal's Message - Al-Rasheed Academy</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <NavBarOnly />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              <span className="text-black">Principal's</span>{" "}
              <span className="text-[#E99544]">Message</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
          </div>

          {/* Logo Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-t-3xl p-8 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-1.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-2.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqdd.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/48999.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/1333.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-13.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-12.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-6.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqq.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-9.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/7788.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-11.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-10.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
              <img
                src="https://www.alrasheedacademy.org/images/qw.png"
                alt=""
                className="absolute w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-b-3xl shadow-2xl border border-white/20">
            <div className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-2xl font-serif text-blue-900 mb-8 font-medium">
                  Dear ARA Community,
                </p>

                <p className="text-gray-700 leading-8 mb-6 font-light text-lg">
                  I am delighted to extend my warmest greetings to each member
                  of our esteemed school community and it is with great pleasure
                  that I introduce myself as the School Principal and one of the
                  founders of our beloved institution.
                </p>

                <p className="text-gray-700 leading-8 mb-6 font-light text-lg">
                  With over 25 years of dedicated service in the field of
                  education and management, I bring a wealth of experience and a
                  steadfast commitment to fostering an environment that nurtures
                  academic excellence, character development, and lifelong
                  learning.
                </p>

                <p className="text-gray-700 leading-8 mb-6 font-light text-lg">
                  Having played a pivotal role as the founding president of our
                  school, I have been intricately involved in shaping its vision
                  and mission from the outset. Our journey, marked by milestones
                  and achievements, reflects the collective efforts of a
                  dedicated team, supportive parents, and, most importantly, our
                  talented students.
                </p>

                <p className="text-gray-700 leading-8 mb-6 font-light text-lg">
                  My passion for education stems from a belief in its
                  transformative power and the profound impact it has on
                  individuals and society at large. As we move forward, I am
                  committed to upholding the principles that have been the
                  cornerstone of our institution—integrity, inclusivity,
                  innovation, and a relentless pursuit of excellence.
                </p>

                <p className="text-gray-700 leading-8 mb-6 font-light text-lg">
                  I am eager to work collaboratively with our esteemed faculty,
                  dedicated staff, involved parents, and, of course, our bright
                  and enthusiastic students. Together, we will continue to build
                  on the strong foundation laid by the visionaries who founded
                  this school.
                </p>

                <p className="text-gray-700 leading-8 mb-6 font-light text-lg">
                  I invite each of you to join hands as we embark on another
                  exciting chapter in the history of our school. Your support,
                  engagement, and commitment are invaluable, and together, we
                  will create an environment where every student can thrive,
                  learn, and achieve their fullest potential.
                </p>

                <p className="text-gray-700 leading-8 mb-8 font-light text-lg">
                  Thank you for entrusting me with the responsibility of leading
                  our school. I am honored to serve in this capacity and look
                  forward to a year filled with growth, learning, and success.
                </p>

                <div className="mt-12 text-right border-t border-gray-200 pt-8">
                  <p className="text-blue-900 font-serif text-xl font-semibold mb-2">
                    Best regards,
                  </p>
                  <p className="text-gray-800 font-serif text-lg">
                    School Principal
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Al-Rasheed Academy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

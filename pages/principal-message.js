import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";

export default function PrincipalMessage() {
  const [principalMessageData, setPrincipalMessageData] = useState({
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "Principal's Message",
      breadcrumb: "Home › Principal's Message",
    },
    content: {
      greeting: "Dear ARA Community,",
      paragraphs: [
        "I am delighted to extend my warmest greetings to each member of our esteemed school community and it is with great pleasure that I introduce myself as the School Principal and one of the founders of our beloved institution.",
        "With over 25 years of dedicated service in the field of education and management, I bring a wealth of experience and a steadfast commitment to fostering an environment that nurtures academic excellence, character development, and lifelong learning.",
        "Having played a pivotal role as the founding president of our school, I have been intricately involved in shaping its vision and mission from the outset. Our journey, marked by milestones and achievements, reflects the collective efforts of a dedicated team, supportive parents, and, most importantly, our talented students.",
        "My passion for education stems from a belief in its transformative power and the profound impact it has on individuals and society at large. As we move forward, I am committed to upholding the principles that have been the cornerstone of our institution—integrity, inclusivity, innovation, and a relentless pursuit of excellence.",
        "I am eager to work collaboratively with our esteemed faculty, dedicated staff, involved parents, and, of course, our bright and enthusiastic students. Together, we will continue to build on the strong foundation laid by the visionaries who founded this school.",
        "I invite each of you to join hands as we embark on another exciting chapter in the history of our school. Your support, engagement, and commitment are invaluable, and together, we will create an environment where every student can thrive, learn, and achieve their fullest potential.",
        "Thank you for entrusting me with the responsibility of leading our school. I am honored to serve in this capacity and look forward to a year filled with growth, learning, and success.",
      ],
      signature: {
        closing: "Best regards,",
        title: "School Principal",
        school: "Al-Rasheed Academy",
      },
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrincipalMessageData();
  }, []);

  const fetchPrincipalMessageData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/principal-message",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Sanitize the data to ensure it's in the correct format
        const sanitizedData = sanitizePrincipalMessageData(data);
        setPrincipalMessageData(sanitizedData);
      } else {
        console.log("No CMS data found, using defaults");
      }
    } catch (err) {
      console.error("Failed to fetch principal message data", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to sanitize CMS data
  const sanitizePrincipalMessageData = (data) => {
    const sanitized = {};

    // Helper to ensure value is a string
    const ensureString = (value, defaultValue) => {
      if (typeof value === "string") return value;
      return defaultValue;
    };

    // Sanitize banner section
    if (data.banner) {
      sanitized.banner = {
        backgroundImage: ensureString(
          data.banner.backgroundImage,
          "/assets/hall.jpg"
        ),
        title: ensureString(data.banner.title, "Principal's Message"),
        breadcrumb: ensureString(
          data.banner.breadcrumb,
          "Home › Principal's Message"
        ),
      };
    } else {
      sanitized.banner = principalMessageData.banner;
    }

    // Sanitize content section
    if (data.content) {
      sanitized.content = {
        greeting: ensureString(data.content.greeting, "Dear ARA Community,"),
        paragraphs: Array.isArray(data.content.paragraphs)
          ? data.content.paragraphs.map((paragraph, index) =>
              ensureString(
                paragraph,
                principalMessageData.content.paragraphs[index] || ""
              )
            )
          : principalMessageData.content.paragraphs,
        signature: data.content.signature
          ? {
              closing: ensureString(
                data.content.signature.closing,
                "Best regards,"
              ),
              title: ensureString(
                data.content.signature.title,
                "School Principal"
              ),
              school: ensureString(
                data.content.signature.school,
                "Al-Rasheed Academy"
              ),
            }
          : principalMessageData.content.signature,
      };
    } else {
      sanitized.content = principalMessageData.content;
    }

    return sanitized;
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Principal&apos;s Message - Al-Rasheed Academy</title>
        </Head>
        <NavBarOnly />
        <Ticker />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading principal's message...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Principal&apos;s Message - Al-Rasheed Academy</title>
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

      {/* Banner Section */}
      <div className="relative w-full h-48 sm:h-64 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${principalMessageData.banner.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide"
          >
            {principalMessageData.banner.title}
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            {principalMessageData.banner.breadcrumb}
          </motion.p>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              <span className="text-black">Principal&apos;s</span>{" "}
              <span className="text-[#E99544]">Message</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Logo Header */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-t-3xl p-6 sm:p-8 flex items-center justify-center"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes slideInFromLeft {
                      0% { opacity: 0; transform: translateX(-100%); }
                      100% { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes slideInFromRight {
                      0% { opacity: 0; transform: translateX(100%); }
                      100% { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes slideInFromTop {
                      0% { opacity: 0; transform: translateY(-100%); }
                      100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slideInFromBottom {
                      0% { opacity: 0; transform: translateY(100%); }
                      100% { opacity: 1; transform: translateY(0); }
                    }
                    .slide-left {
                      animation: slideInFromLeft 1500ms ease-in-out;
                      animation-fill-mode: both;
                    }
                    .slide-right {
                      animation: slideInFromRight 1500ms ease-in-out;
                      animation-fill-mode: both;
                    }
                    .slide-top {
                      animation: slideInFromTop 1500ms ease-in-out;
                      animation-fill-mode: both;
                    }
                    .slide-bottom {
                      animation: slideInFromBottom 1500ms ease-in-out;
                      animation-fill-mode: both;
                    }
                  `,
                }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-1.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{ animationDelay: "200ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-2.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{ animationDelay: "400ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqdd.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{ animationDelay: "600ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/48999.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{ animationDelay: "800ms", animationDuration: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/1333.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "300ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-13.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "500ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-12.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "700ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-6.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "900ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqq.png"
                alt=""
                className="absolute w-full h-full object-contain slide-top"
                style={{ animationDelay: "400ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-9.png"
                alt=""
                className="absolute w-full h-full object-contain slide-top"
                style={{ animationDelay: "600ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/7788.png"
                alt=""
                className="absolute w-full h-full object-contain slide-top"
                style={{ animationDelay: "800ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-11.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "500ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-10.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "700ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "900ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qw.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "1100ms" }}
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/80 backdrop-blur-sm rounded-b-3xl shadow-2xl border border-white/20"
          >
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl sm:text-2xl font-serif text-blue-900 mb-6 sm:mb-8 font-medium">
                  {principalMessageData.content.greeting}
                </p>

                {principalMessageData.content.paragraphs.map(
                  (paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-7 sm:leading-8 mb-4 sm:mb-6 font-light text-base sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  )
                )}

                <div className="mt-8 sm:mt-12 text-right border-t border-gray-200 pt-6 sm:pt-8">
                  <p className="text-blue-900 font-serif text-lg sm:text-xl font-semibold mb-2">
                    {principalMessageData.content.signature.closing}
                  </p>
                  <p className="text-gray-800 font-serif text-base sm:text-lg">
                    {principalMessageData.content.signature.title}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    {principalMessageData.content.signature.school}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}

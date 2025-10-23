import React, { useState, useEffect } from "react";
import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

// College logos as public asset paths - fallback defaults
const defaultLogos = [
  "/assets/1.png",
  "/assets/2.png",
  "/assets/3.png",
  "/assets/4.png",
  "/assets/5.png",
  "/assets/6.png",
  "/assets/7.png",
  "/assets/8.png",
  "/assets/9.png",
  "/assets/10.png",
  "/assets/11.png",
  "/assets/12.png",
  "/assets/13.png",
];

// Default program features - fallback
const defaultProgramFeatures = [
  {
    title: "Guidance:",
    description: "Course selection guidance, Career Day, job shadowing, Resume",
  },
  {
    title: "Standardized testing:",
    description: "SAT",
  },
  {
    title: "College selection:",
    description: "college visits and individual college guidance",
  },
  {
    title: "College planning resources:",
    description:
      "Free Application for Federal Student Aid (FAFSA), Common Application, and more!",
  },
];

// Reusable ProgramFeature Component with Card and Alternating Alignment
const ProgramFeature = ({ title, description, index }) => {
  const isOdd = index % 2 !== 0;

  // Subtle color gradients based on ARA Academy's orange/teal theme
  const gradients = [
    "from-orange-50 to-amber-50", // Soft orange
    "from-teal-50 to-cyan-50", // Soft teal
    "from-peach-50 to-orange-50", // Warm peach
    "from-sky-50 to-teal-50", // Cool sky
  ];

  return (
    <li className={`flex ${isOdd ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`bg-gradient-to-br ${gradients[index]} rounded-lg shadow-sm p-5 w-11/12 hover:shadow-md transition-all duration-300 border border-gray-100`}
      >
        <div className="flex items-start">
          <span className="text-orange-500 text-xl font-bold mr-3 mt-1">•</span>
          <div>
            <span className="font-bold text-gray-800 text-base">{title}</span>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

// Carousel Component - Auto-play with 3 Images Display
const UniversityCarousel = ({
  logos = defaultLogos,
  autoPlayInterval = 2000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play effect - changes every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % logos.length);
    }, autoPlayInterval); // Use dynamic interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, [logos.length, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % logos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + logos.length) % logos.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get three consecutive logos to display
  const getVisibleLogos = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % logos.length;
      visible.push({ logo: logos[index], index });
    }
    return visible;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel Container - Display 3 Images */}
      <div className="relative h-96 overflow-hidden">
        <div className="flex items-center justify-center h-full gap-6 px-16">
          {getVisibleLogos().map((item, idx) => (
            <div
              key={item.index}
              className="flex-1 h-full flex items-center justify-center p-4 transition-all duration-500 ease-in-out"
            >
              <img
                src={item.logo}
                alt={`University Logo ${item.index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Borderless Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-600 hover:text-orange-500 transition-colors duration-300 p-1"
        aria-label="Previous slide"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600 hover:text-orange-500 transition-colors duration-300 p-1"
        aria-label="Next slide"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators/Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {logos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-orange-500 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const CollegeGuidancePage = () => {
  const [collegeData, setCollegeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollegeData();
  }, []);

  const fetchCollegeData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/college-preparatory"
      );
      if (response.ok) {
        const data = await response.json();
        setCollegeData(data);
      } else {
        // Use fallback defaults if CMS data not available
        console.warn("CMS data not available, using defaults");
        setCollegeData({
          banner: {
            backgroundImage: "/assets/hall.jpg",
            title: "Our Curriculum",
            breadcrumb: "Home › Curriculum",
          },
          header: {
            description:
              "ARA school guides students and their families though the college planning and application process. Topics covered include College Application, Financial Aid Application (FAFSA), Common App, Resume Design and Letters of Recommendation.",
          },
          hero: {
            image:
              "https://images.unsplash.com/photo-1760605193118-a3536e1eea61?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
            imageAlt:
              "Our Students During Their Participation in the College Fair!",
            description:
              "ARA Academy School's college guidance program helps students navigate every step of their path to college, including:",
            programFeatures: defaultProgramFeatures,
          },
          universities: {
            title:
              "Our Graduates Have Been Accepted at the Following Universities",
            logos: defaultLogos,
            autoPlayInterval: 2000,
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch college data:", error);
      // Use fallback defaults on error
      setCollegeData({
        banner: {
          backgroundImage: "/assets/hall.jpg",
          title: "Our Curriculum",
          breadcrumb: "Home › Curriculum",
        },
        header: {
          description:
            "ARA school guides students and their families though the college planning and application process. Topics covered include College Application, Financial Aid Application (FAFSA), Common App, Resume Design and Letters of Recommendation.",
        },
        hero: {
          image:
            "https://images.unsplash.com/photo-1760605193118-a3536e1eea61?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
          imageAlt:
            "Our Students During Their Participation in the College Fair!",
          description:
            "ARA Academy School's college guidance program helps students navigate every step of their path to college, including:",
          programFeatures: defaultProgramFeatures,
        },
        universities: {
          title:
            "Our Graduates Have Been Accepted at the Following Universities",
          logos: defaultLogos,
          autoPlayInterval: 2000,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !collegeData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college preparatory page...</p>
        </div>
      </div>
    );
  }

  const programFeatures =
    collegeData.hero?.programFeatures || defaultProgramFeatures;

  return (
    <>
      <Head>
        <title>College Preparatory - Al-Rasheed Academy</title>
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
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${
              collegeData.banner?.backgroundImage || "/assets/hall.jpg"
            }')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl font-light tracking-wide"
          >
            {collegeData.banner?.title || "Our Curriculum"}
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            {collegeData.banner?.breadcrumb || "Home › Curriculum"}
          </motion.p>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        {/* Header Banner - Full Width */}
        <header className="w-screen bg-gradient-to-r from-slate-700 via-indigo-700 to-indigo-800 text-white py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-sm md:text-base leading-relaxed">
              {collegeData.header?.description ||
                "ARA school guides students and their families though the college planning and application process. Topics covered include College Application, Financial Aid Application (FAFSA), Common App, Resume Design and Letters of Recommendation."}
            </p>
          </div>
        </header>

        {/* Combined Section: Hero Image (Left) + Program Information (Right) - Equal Height */}
        <section className="bg-gray-50 py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Hero Section with Student Image */}
              <div className="flex flex-col">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex-1">
                  <img
                    src={
                      collegeData.hero?.image ||
                      "https://images.unsplash.com/photo-1760605193118-a3536e1eea61?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600"
                    }
                    alt={
                      collegeData.hero?.imageAlt ||
                      "Our Students During Their Participation in the College Fair!"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 italic mt-4">
                  {collegeData.hero?.imageAlt ||
                    "Our Students During Their Participation in the College Fair!"}
                </p>
              </div>

              {/* Right Column - Program Information with Alternating Cards */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                <p className="text-gray-700 text-base mb-6">
                  {collegeData.hero?.description ||
                    "ARA Academy School's college guidance program helps students navigate every step of their path to college, including:"}
                </p>

                <ul className="space-y-2 flex-1 list-none">
                  {programFeatures.map((feature, index) => (
                    <ProgramFeature
                      key={index}
                      index={index}
                      title={feature.title}
                      description={feature.description}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Universities Section with Auto-play Carousel */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-red-600 text-center mb-12">
              {collegeData.universities?.title ||
                "Our Graduates Have Been Accepted at the Following Universities"}
            </h1>

            <UniversityCarousel
              logos={collegeData.universities?.logos || defaultLogos}
              autoPlayInterval={
                collegeData.universities?.autoPlayInterval || 2000
              }
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default CollegeGuidancePage;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";

// Import local images - assuming they are placed in public/assets/
const commonImg = "/assets/common.png";
const engageImg = "/assets/engage.png";
const scienceImg = "/assets/making_sense.png";

const defaultCurriculumData = [
  {
    title: "Common Core Standards",
    subTitle: null,
    imageSrc: commonImg,
    imageAlt: "Common Core State Standards Initiative logo",
    content:
      "Al-Rasheed Academy aligns its curriculum with the Common Core Standards, a set of rigorous and internationally benchmarked guidelines that ensure students develop essential skills in English Language Arts (ELA) and mathematics. By incorporating these standards into our teaching methods, we empower our students to think critically, communicate effectively, and solve complex problems—skills that are crucial for success in the 21st century.",
    reverse: false,
    accent: "#0ea5a4",
  },
  {
    title: "EngageNY Mathematics",
    subTitle: "Our Students. Their Moment.",
    imageSrc: engageImg,
    imageAlt: "EngageNY logo",
    content:
      "We are proud to implement the Engage New York curriculum in our mathematics program. This curriculum emphasizes a deep understanding of mathematical concepts, fostering a love for problem-solving and critical thinking. Through hands-on activities, real-world applications, and a focus on mathematical reasoning, our students not only master mathematical skills but also develop a genuine appreciation for the beauty and relevance of mathematics in their everyday lives.",
    reverse: true,
    accent: "#b87333",
  },
  {
    title: "Making Sense of SCIENCE",
    subTitle: null,
    imageSrc: scienceImg,
    imageAlt: "Making Sense of Science logo",
    content:
      "In our commitment to providing a comprehensive education, Al-Rasheed Academy incorporates the Next Generation Science Standards (NGSS). These standards guide our science curriculum, encouraging students to explore scientific concepts through inquiry-based learning, hands-on experiments, and collaborative projects. By engaging in the scientific process, our students develop a curiosity for the world around them and acquire the skills needed to succeed in an increasingly STEM-driven society.",
    reverse: false,
    accent: "#6b4226",
  },
];

// --- Component for the Curriculum Sections ---
const SectionCard = ({
  title,
  subTitle,
  imageSrc,
  imageAlt,
  children,
  reverse = false,
  accent = "#cc8a33",
}) => {
  // helper: convert hex to rgba
  const hexToRgba = (hex, alpha = 1) => {
    const h = hex.replace("#", "");
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const overlay = `linear-gradient(135deg, ${hexToRgba(
    accent,
    0.08
  )}, transparent 40%)`;
  const titleStyle = { color: accent };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={`group flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } md:items-stretch items-center gap-8 md:gap-12`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-1/3 flex justify-center md:items-stretch"
      >
        <img
          alt={imageAlt}
          className={`object-contain w-auto ${
            imageAlt.includes("EngageNY") || imageAlt.includes("Science")
              ? "md:max-h-[420px]"
              : "md:max-h-[360px]"
          } md:h-full`}
          src={
            imageSrc.startsWith("/uploads/")
              ? `https://alrasheedacademyserver.onrender.com${imageSrc}`
              : imageSrc
          }
          style={{ maxWidth: "100%" }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="md:w-2/3"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden h-full flex flex-col">
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 6,
              background: hexToRgba(accent, 0.14),
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              zIndex: 5,
            }}
            aria-hidden
          ></span>
          <div className="relative z-10">
            <h2
              className="text-3xl font-bold mb-4 subtle-glow"
              style={{
                ...titleStyle,
                ["--glow-color"]: hexToRgba(accent, 0.35),
              }}
            >
              {title}
            </h2>
            {subTitle && (
              <h3 className="text-xl font-semibold italic text-gray-600 mb-4">
                {subTitle}
              </h3>
            )}
            <p className="text-gray-600 leading-relaxed">{children}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- The Main Curricular Component ---
function CurricularPage() {
  const [curriculumData, setCurriculumData] = useState(defaultCurriculumData);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const response = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/auth/cms/curricular"
        );
        if (response.ok) {
          const data = await response.json();
          if (data.sections && Array.isArray(data.sections)) {
            setCurriculumData(data.sections);
          }
        }
      } catch (err) {
        console.error("Failed to fetch curriculum data", err);
      }
    };
    fetchCurriculumData();
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBarOnly />

      {/* Banner Section */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/hall.jpg')",
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
            Our Curriculum
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            Home › Curriculum
          </motion.p>
        </div>
      </div>

      <style>{`
                @keyframes subtleGlow {
                    0% { filter: drop-shadow(0 0 6px var(--glow-color)); }
                    50% { filter: drop-shadow(0 0 10px var(--glow-color)); }
                    100% { filter: drop-shadow(0 0 6px var(--glow-color)); }
                }
                .subtle-glow { animation: subtleGlow 3.5s ease-in-out infinite; }
            `}</style>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
            Our Curriculum
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            At Al-Rasheed Academy, we believe in nurturing well-rounded
            individuals who are not only academically proficient but also
            equipped with the skills and knowledge needed to thrive in an
            ever-changing global landscape.
          </p>
        </motion.div>

        <div className="space-y-16">
          {curriculumData.map((section, index) => (
            <SectionCard
              key={index}
              title={section.title}
              subTitle={section.subTitle}
              imageSrc={section.imageSrc}
              imageAlt={section.imageAlt}
              reverse={section.reverse}
              accent={section.accent}
            >
              {section.content}
            </SectionCard>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CurricularPage;

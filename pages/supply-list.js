import React, { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import {
  ChevronRight,
  CheckCircle,
  Notebook,
  Pencil,
  GraduationCap,
  X,
  Download,
  Loader2,
} from "lucide-react";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

// Load Lucide Icons: Assumed to be available in the React environment.

// Color mapping for PDF generation
// Helper function to convert Tailwind color classes to hex colors for PDF
const getColorValue = (colorName) => {
  const colorMap = {
    pink: [236, 72, 153], // #EC4899
    indigo: [79, 70, 229], // #4F46E5
    green: [5, 150, 105], // #059669
    yellow: [217, 119, 6], // #D97706
    purple: [124, 58, 237], // #7C3AED
    teal: [13, 148, 136], // #0D9488
    red: [220, 38, 38], // #DC2626
    gray: [55, 65, 81], // #374151
  };
  return colorMap[colorName] || [55, 65, 81]; // Default to gray if color not found
};

// Helper function to get icon component based on grade
const getGradeIcon = (grade) => {
  if (grade.includes("Kindergarten") || grade.includes("9th")) {
    return <GraduationCap className="w-3 h-3" />;
  } else if (grade.includes("1st") || grade.includes("4th")) {
    return <Pencil className="w-3 h-3" />;
  } else {
    return <Notebook className="w-3 h-3" />;
  }
};

const SupplyList = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [isFading, setIsFading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % 4);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Fetch supply list data from CMS
  useEffect(() => {
    const fetchSupplyListData = async () => {
      try {
        const response = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/auth/cms/supply-list"
        );
        if (response.ok) {
          const data = await response.json();
          // Add icons to each grade data
          const dataWithIcons = data.map((gradeData) => ({
            ...gradeData,
            icon: getGradeIcon(gradeData.grade),
          }));
          setCmsData(dataWithIcons);
          // Set default selected grade to first one
          if (dataWithIcons && dataWithIcons.length > 0) {
            setSelectedGrade(dataWithIcons[0].grade);
          }
        } else {
          setError("Failed to load supply list information");
        }
      } catch (err) {
        console.error("Error fetching supply list data:", err);
        setError("Failed to load supply list information");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplyListData();
  }, []);

  const currentData = cmsData?.find((data) => data.grade === selectedGrade);

  // Map color names to specific Tailwind classes
  const colorClasses = {
    pink: {
      primary: "bg-pink-600 hover:bg-pink-700",
      light: "bg-pink-50",
      text: "text-pink-700",
      ring: "ring-pink-500",
    },
    indigo: {
      primary: "bg-indigo-600 hover:bg-indigo-700",
      light: "bg-indigo-50",
      text: "text-indigo-700",
      ring: "ring-indigo-500",
    },
    green: {
      primary: "bg-green-600 hover:bg-green-700",
      light: "bg-green-50",
      text: "text-green-700",
      ring: "ring-green-500",
    },
    yellow: {
      primary: "bg-yellow-600 hover:bg-yellow-700",
      light: "bg-yellow-50",
      text: "text-yellow-700",
      ring: "ring-yellow-500",
    },
    purple: {
      primary: "bg-purple-600 hover:bg-purple-700",
      light: "bg-purple-50",
      text: "text-purple-700",
      ring: "ring-purple-500",
    },
    teal: {
      primary: "bg-teal-600 hover:bg-teal-700",
      light: "bg-teal-50",
      text: "text-teal-700",
      ring: "ring-teal-500",
    },
    red: {
      primary: "bg-red-600 hover:bg-red-700",
      light: "bg-red-50",
      text: "text-red-700",
      ring: "ring-red-500",
    },
  };

  const primaryColorClass =
    colorClasses[currentData?.color]?.primary ||
    "bg-gray-600 hover:bg-gray-700";
  const lightBgClass = colorClasses[currentData?.color]?.light || "bg-gray-50";
  const textColorClass =
    colorClasses[currentData?.color]?.text || "text-gray-700";
  const ringColorClass =
    colorClasses[currentData?.color]?.ring || "ring-gray-500";

  // Handler for item checklist toggle
  const toggleCheck = useCallback(
    (item) => {
      setCheckedItems((prev) => ({
        ...prev,
        [selectedGrade]: {
          ...(prev[selectedGrade] || {}),
          [item]: !(prev[selectedGrade]?.[item] || false),
        },
      }));
    },
    [selectedGrade]
  );

  // Handler for downloading all supply lists as PDF
  const handleDownload = () => {
    if (!cmsData) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;

    cmsData.forEach((gradeData, gradeIndex) => {
      if (gradeIndex > 0) {
        pdf.addPage();
      }

      // Add logo image centered with low opacity
      const imgWidth = 100; // Larger logo
      const imgHeight = 100;
      const imgX = (pageWidth - imgWidth) / 2; // Center horizontally
      const imgY = (pdf.internal.pageSize.height - imgHeight) / 2; // Center vertically

      const img = new Image();
      img.src = "https://www.alrasheedacademy.org/images/Untitled-1.png";

      // Save graphics state
      pdf.saveGraphicsState();
      // Set global alpha for transparency (0.1 = 10% opacity)
      pdf.setGState(pdf.GState({ opacity: 0.1 }));
      // Add watermark-style logo
      pdf.addImage(img, "PNG", imgX, imgY, imgWidth, imgHeight);
      // Restore graphics state
      pdf.restoreGraphicsState();

      // Add header centered
      const [r, g, b] = getColorValue(gradeData.color);
      pdf.setTextColor(r, g, b);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      const title = `AL-RASHEED ACADEMY - ${gradeData.grade} Supply List`;
      const titleWidth = pdf.getTextWidth(title);
      pdf.text(title, (pageWidth - titleWidth) / 2, margin + 10);

      // Add subtitle centered
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      const subtitle = "School Year 2025-2026";
      const subtitleWidth = pdf.getTextWidth(subtitle);
      pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, margin + 20);

      // Add items section
      pdf.setFontSize(10);
      let yPosition = margin + 35;
      const lineHeight = 6;

      // Items list
      gradeData.items.forEach((item, index) => {
        const isChecked = checkedItems[gradeData.grade]?.[item] || false;
        const itemNumber = index + 1;
        const text = `${itemNumber}. ${item}`;

        // Check if we need a new page
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = margin;
        }

        // Format each item
        pdf.setFont("courier", "normal");
        const xPosition = margin + (itemNumber >= 10 ? 3 : 5);
        pdf.text(text, xPosition, yPosition);
        yPosition += lineHeight;
      });

      // Add footer on each page
      pdf.setFontSize(10);
      pdf.setTextColor(128);
      const footer = "Generated by ARA Academy Supply List App";
      pdf.text(footer, margin, 285);

      const date = new Date().toLocaleDateString();
      pdf.text(date, pageWidth - margin - pdf.getTextWidth(date), 285);
    });

    // Save PDF with all lists
    const filename = `ara_academy_complete_supply_list.pdf`;
    pdf.save(filename);
  };

  // Handle tab change with fade animation
  const handleTabChange = (grade) => {
    if (grade === selectedGrade) return;

    setIsFading(true);
    // Wait for fade-out (300ms) before changing content and fading in
    setTimeout(() => {
      setSelectedGrade(grade);
      setIsFading(false);
    }, 300);
  };

  // Component for a single checklist item
  const CheckListItem = ({ item, isChecked }) => (
    <li
      onClick={() => toggleCheck(item)}
      className={`flex items-center p-1.5 rounded-md cursor-pointer transition-all duration-300 transform text-xs
                        ${
                          isChecked
                            ? `border-transparent ring-2 ring-opacity-50 ${ringColorClass} opacity-90`
                            : "hover:bg-gray-50"
                        }
            `}
    >
      <div
        className={`w-4 h-4 mr-1.5 flex-shrink-0 rounded-full transition-all duration-300 flex items-center justify-center
                            ${
                              isChecked
                                ? `${
                                    colorClasses[currentData.color]?.primary ||
                                    "bg-gray-500"
                                  } text-white`
                                : "bg-gray-100 text-gray-400"
                            }
            `}
      >
        {isChecked ? (
          <CheckCircle className="w-2.5 h-2.5" />
        ) : (
          <ChevronRight className="w-2.5 h-2.5" />
        )}
      </div>
      <span
        className={`text-gray-800 transition-all duration-300 font-medium ${
          isChecked ? "line-through opacity-60" : "text-sm"
        }`}
      >
        {item}
      </span>
    </li>
  );

  // Main render function
  const carouselImages = [
    "/assets/sl1.png",
    "/assets/sl2.png",
    "/assets/sl3.png",
    "/assets/sl4.png",
  ];

  return (
    <>
      <Head>
        <title>Supply List - Al-Rasheed Academy</title>
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
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
            Supply List
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            Home › Supply List
          </motion.p>
        </div>
      </div>

      <main className="flex h-screen bg-white">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading supply list...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <div className="text-red-600 mb-2">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Content
              </h3>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-[25%]">
              <div className="bg-gray-50 relative overflow-hidden h-full">
                <div className="relative h-full overflow-hidden">
                  {carouselImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        currentSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Supply List ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="w-[75%] p-4 h-full bg-gray-50 border-l-[12px] border-white overflow-y-auto hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="w-full h-full">
                <header className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24">
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
                    .delay-200 { animation-delay: 200ms; }
                    .delay-400 { animation-delay: 400ms; }
                    .delay-600 { animation-delay: 600ms; }
                    .delay-800 { animation-delay: 800ms; }
                    .delay-1000 { animation-delay: 1000ms; }
                    .delay-1200 { animation-delay: 1200ms; }
                    .delay-1400 { animation-delay: 1400ms; }
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
                        style={{
                          animationDelay: "800ms",
                          animationDuration: "1000ms",
                        }}
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
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className={textColorClass}>ARA Academy</span>
                      <span>Supply List</span>
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                      Your comprehensive school supply checklist for 2025-2026
                    </p>
                  </div>
                </header>

                <div className="mb-4">
                  {/* Grade Navigation Tabs Wrapper - Now with shadow */}
                  <div className="bg-white shadow-md rounded-xl p-3">
                    {" "}
                    {/* Added shadow to tabs only */}
                    {/* Tabs Content - uses flex-wrap to stack buttons */}
                    <nav className="flex flex-wrap gap-2 justify-center">
                      {" "}
                      {/* Increased gap between buttons */}
                      {cmsData?.map((data) => (
                        <button
                          key={data.grade}
                          onClick={() => handleTabChange(data.grade)}
                          className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm whitespace-nowrap
                                                ${
                                                  selectedGrade === data.grade
                                                    ? `${primaryColorClass} text-white transform scale-105 ring-2 ring-${data.color}-300 ring-opacity-50`
                                                    : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                                                }
                                    `}
                        >
                          {React.cloneElement(data.icon, {
                            className: "w-4 h-4",
                          })}
                          <span className="ml-2">{data.grade}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Supply List Display Area */}
                  <main className="mt-6">
                    {" "}
                    {/* Increased top margin for separation */}
                    <div className="flex justify-between items-center mb-2">
                      {" "}
                      {/* Reduced margin */}
                      <h2
                        className={`text-lg sm:text-xl font-bold flex items-center ${textColorClass} transition-opacity duration-300 ${
                          isFading ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        {currentData?.icon}
                        <span className="ml-1">
                          {currentData?.grade} List
                        </span>{" "}
                        {/* Reduced text and margin */}
                      </h2>
                      {/* Download Button */}
                      <button
                        onClick={handleDownload}
                        className={`flex items-center space-x-0.5 px-2 py-1 rounded-md text-[10px] font-semibold transition-all duration-300 shadow-sm transform hover:scale-[1.02]
                                        bg-gray-200 text-gray-800 hover:bg-gray-300
                                `}
                        title="Download complete supply list for all grades"
                        disabled={isFading}
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>Download</span>
                      </button>
                    </div>
                    {currentData && (
                      <div
                        className={`transition-opacity duration-300 ease-in-out ${
                          isFading ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                          {" "}
                          {/* Reduced gap */}
                          {currentData.items.map((item, index) => (
                            <CheckListItem
                              key={index}
                              item={item}
                              isChecked={
                                checkedItems[selectedGrade]?.[item] || false
                              }
                            />
                          ))}
                        </ul>

                        {/* Completion Indicator */}
                        {checkedItems[selectedGrade] &&
                          Object.keys(checkedItems[selectedGrade]).length >
                            0 && (
                            <div
                              className={`mt-4 p-2 rounded-lg border-t-2 ${lightBgClass} ${textColorClass} flex items-center justify-between shadow-inner animate-pulse`}
                            >
                              <p className="font-semibold text-[10px]">
                                <span className="font-extrabold text-xs mr-1">
                                  {
                                    Object.values(
                                      checkedItems[selectedGrade]
                                    ).filter(Boolean).length
                                  }{" "}
                                  / {currentData.items.length}
                                </span>
                                items checked off!
                              </p>
                              <button
                                onClick={() =>
                                  setCheckedItems((prev) => ({
                                    ...prev,
                                    [selectedGrade]: {},
                                  }))
                                }
                                className={`text-xs font-medium ${textColorClass} hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-100`}
                                title="Clear all checks for this list"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                      </div>
                    )}
                  </main>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.05);
          }
          50% {
            box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.01);
          }
        }
        .animate-pulse-subtle {
          animation: pulse 2s infinite;
        }
      `}</style>

      <Footer />
    </>
  );
};

export default SupplyList;

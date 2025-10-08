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
} from "lucide-react";
import jsPDF from "jspdf";

// Load Lucide Icons: Assumed to be available in the React environment.

/**
 * Data parsed from the AL-RASHEED ACADEMY SCHOOL SUPPLY LIST PDF.
 * Grades 9-11 are combined due to high similarity for a cleaner user experience.
 */
const SUPPLY_DATA = [
  {
    grade: "Kindergarten",
    color: "pink",
    icon: <GraduationCap className="w-3 h-3" />,
    items: [
      "1 primary journal for writing",
      "1 full-size backpack",
      "12 packs of #2 pencils",
      "2 pink erasers",
      "4 dry erase markers",
      "1 small dry erase board with eraser",
      "1 Crayola Washable Paint/10 ct. 2oz",
      "1 washable crayola markers",
      "24 box of Crayola crayons",
      "2-4 oz bottle of Elmer's glue",
      "1 package-colored pencils",
      "1 scissor (blunt-tip)",
      "1 pack of index cards",
      "1 painting smock",
      "1 plastic pencil box",
      "2 transparent scotch tapes",
      "1 pack of construction paper",
      "3 large boxes of tissues",
      "3 packages of antibacterial wipes",
      "3 rolls of paper towels",
      "1 complete set of clothes (left at school)",
      "1 pack of gallon Ziploc bags",
    ],
  },
  {
    grade: "1st Grade",
    color: "indigo",
    icon: <Pencil className="w-3 h-3" />,
    items: [
      "1 full-size backpack",
      "5 composition notebooks (different colors)",
      "5 plastic double pocket folders",
      "3 packages of printer paper",
      "24 #2 sharpened pencils",
      "1 package markers",
      "1 package dry erase markers",
      "2 pink erasers",
      "1 package-colored pencils",
      "1 scissor (blunt-tip)",
      "4 glue sticks",
      "1 4-oz bottle white glue",
      "1 pack of construction paper",
      "1 Agenda",
      "3 rolls of paper towels",
      "3 Klenex tissue boxes",
      "3 antibacterial 75ct wipes",
      "1 pack of sandwich lock bags",
    ],
  },
  {
    grade: "2nd & 3rd Grade",
    color: "green",
    icon: <Notebook className="w-3 h-3" />,
    items: [
      "1 full-size backpack",
      "5 composition notebooks (different colors)",
      "5 plastic double pocket folders",
      "3 packages of printer paper",
      "24-36 #2 sharpened pencils",
      "1 package markers",
      "1 package dry erase markers",
      "2 pink erasers",
      "1 package-colored pencils",
      "1 scissor (blunt-tip)",
      "4 glue sticks",
      "1 4-oz bottle white glue",
      "1 plastic pencil box",
      "2 transparent scotch tapes",
      "1 pack of construction paper",
      "1 Agenda",
      "3 rolls paper towels",
      "3 Klenex tissue boxes",
      "3 antibacterial 75ct wipes",
      "1 package 3x5 index cards",
    ],
  },
  {
    grade: "4th Grade",
    color: "yellow",
    icon: <Pencil className="w-3 h-3" />,
    items: [
      "1 full-size backpack",
      "6 composition notebooks",
      "5 plastic double pocket folders",
      "3 packages of printer paper",
      "4 packs #2 sharpened pencils",
      "1 pack of colored pencils",
      "1 package dry erase markers",
      "2 pink erasers",
      "1 scissor (blunt-tip)",
      "4 glue sticks",
      "1 plastic pencil box",
      "2 transparent scotch tapes",
      "1 package 3x5 index cards",
      "3 rolls paper towels",
      "3 Klenex tissue boxes",
      "3 antibacterial 75ct wipes",
    ],
  },
  {
    grade: "5th & 6th Grade",
    color: "purple",
    icon: <Notebook className="w-3 h-3" />,
    items: [
      "1 full-size backpack",
      "7 composition notebooks (different colors)",
      "5 plastic double pocket folders",
      "3 packages of printer paper",
      "4 packs #2 sharpened pencils",
      "1 pack of colored pencils",
      "1 package dry erase markers",
      "2 pink erasers",
      "1 scissor (blunt-tip)",
      "4 glue sticks",
      "1 4-oz bottle white glue",
      "1 plastic pencil box",
      "2 transparent scotch tapes",
      "1 package 3x5 index cards",
      "1 scientific calculator (6th Grade)",
      "3 rolls paper towels",
      "3 Klenex tissue boxes",
      "3 antibacterial 75ct wipes",
    ],
  },
  {
    grade: "7th & 8th Grade",
    color: "teal",
    icon: <Notebook className="w-3 h-3" />,
    items: [
      "1 full-size backpack",
      "7 composition notebooks (different colors)",
      "5 plastic double pocket folders",
      "3 packages of printer paper",
      "4 packs #2 sharpened pencils",
      "1 package markers",
      "1 box of crayons",
      "1 Personal dry erase board",
      "1 package dry erase markers",
      "2 pink erasers",
      "1 package colored pencils",
      "1 scissor (blunt-tip)",
      "4 glue sticks",
      "1 4-oz bottle white glue",
      "1 plastic pencil box",
      "2 transparent scotch tapes",
      "1 pack construction paper",
      "1 package 3x5 index cards",
      "1 Protractor",
      "1 Ruler",
      "3 rolls paper towels",
      "3 Klenex tissue boxes",
      "3 antibacterial 75ct wipes",
    ],
  },
  {
    grade: "9th-11th Grade",
    color: "red",
    icon: <GraduationCap className="w-3 h-3" />,
    items: [
      "1 pack of Graphing Paper",
      "3-3 subject notebooks",
      "3 composition notebooks",
      "2 Pack of loose-Leaf Paper (Wide-Ruled)",
      "7 Plastic Double-Pocket Folders with Prong (1 of each color)",
      "1 Pack of Cardstock paper",
      "3 Packages of Printing Paper",
      "2 packs of #2 pencils",
      "2 Pink erasers",
      "1 Pack of Pens (blue, black & red)",
      "4 dry erase markers (broad with eraser)",
      "1 Pack of Markers",
      "2 Highlighters",
      "1 4oz bottle of glue",
      "1 Pair of Scissors",
      "1 Compass",
      "1 Clear Protractor",
      "1 Sharpener",
      "1 Pack of colored printing paper",
      "1 Pencil case/pouch",
      "12-Inch Ruler (Metric and inches)",
      "3 Transparent scotch tape",
      "1 Calculator Graphing",
      "3 rolls paper towels",
      "3 Klenex tissue",
      "3 antibacterial 75ct wipes",
    ],
  },
];

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

const SupplyList = () => {
  const [selectedGrade, setSelectedGrade] = useState(SUPPLY_DATA[0].grade);
  const [checkedItems, setCheckedItems] = useState({});
  const [isFading, setIsFading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % 4);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentData = SUPPLY_DATA.find((data) => data.grade === selectedGrade);

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
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;

    SUPPLY_DATA.forEach((gradeData, gradeIndex) => {
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

      <main className="flex h-screen bg-white">
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
        <div className="w-[75%] p-4 h-full bg-gray-50 border-l-[12px] border-white overflow-y-auto hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
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
              {SUPPLY_DATA.map((data) => (
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
                  {React.cloneElement(data.icon, { className: "w-4 h-4" })}
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
                <span className="ml-1">{currentData?.grade} List</span>{" "}
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
                      isChecked={checkedItems[selectedGrade]?.[item] || false}
                    />
                  ))}
                </ul>

                {/* Completion Indicator */}
                {checkedItems[selectedGrade] &&
                  Object.keys(checkedItems[selectedGrade]).length > 0 && (
                    <div
                      className={`mt-4 p-2 rounded-lg border-t-2 ${lightBgClass} ${textColorClass} flex items-center justify-between shadow-inner animate-pulse`}
                    >
                      <p className="font-semibold text-[10px]">
                        <span className="font-extrabold text-xs mr-1">
                          {
                            Object.values(checkedItems[selectedGrade]).filter(
                              Boolean
                            ).length
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

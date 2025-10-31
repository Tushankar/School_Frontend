import React, { useState, useEffect } from "react";
import { NavBar } from "./ui/tubelight-navbar";
import Link from "next/link";
import {
  Home,
  User,
  FileText,
  BookOpen,
  Image,
  Award,
  Briefcase,
  ChevronDown,
} from "lucide-react";

const iconMap = {
  Home,
  User,
  FileText,
  BookOpen,
  Image,
  Award,
  Briefcase,
};

const IslamicCenterPage = () => {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState({
    arabicText: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ",
    subtitle: "Excellence in Islamic Education",
    titleLine1: "Recognized by",
    titleLine2: "New York State",
    titleLine3: "Education Department",
    backgroundImages: [
      "/assets/istudies_1.png",
      "/assets/istudies_2.png",
      "/assets/istudies_3.png",
      "/assets/istudies_4.png",
      "/assets/istudies_5.png",
      "/assets/istudies_6.png",
      "/assets/istudies_7.png",
    ],
    socialLinks: {
      instagram: "#",
      youtube: "#",
      twitter: "#",
    },
  });

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const response = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/navbar"
        );
        if (response.ok) {
          const data = await response.json();
          // Filter active items and map icon strings to components
          const filteredData = data.filter((item) => item.isActive !== false);
          const mappedData = filteredData.map((item) => ({
            ...item,
            icon: iconMap[item.icon] || Home,
            dropdown: item.dropdown
              ?.filter((subItem) => subItem.isActive !== false)
              .map((subItem) => ({
                ...subItem,
                dropdown: subItem.dropdown
                  ?.filter((nestedItem) => nestedItem.isActive !== false)
                  .map((nestedItem) => nestedItem),
              })),
          }));
          setNavItems(mappedData);
        } else {
          console.error("Failed to fetch navbar items");
        }
      } catch (error) {
        console.error("Error fetching navbar items:", error);
      }
    };

    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/auth/cms/hero"
        );
        if (response.ok) {
          const data = await response.json();
          setHeroData(data);
        } else {
          console.log("Using default hero data");
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchNavItems();
    fetchHeroData();
    setLoading(false); // Set loading to false after API calls are initiated
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenuItem, setExpandedMenuItem] = useState(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroData.backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroData.backgroundImages.length]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Sliding Background Images */}
      {heroData.backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${
              image.startsWith("/uploads/")
                ? `https://alrasheedacademyserver.onrender.com${image}`
                : image
            })`,
            opacity: index === currentImage ? 0.9 : 0,
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes slideInFromLeft {
                      0% { opacity: 0; transform: translateX(-300px) scale(0.8); }
                      50% { opacity: 0.7; transform: translateX(-50px) scale(0.9); }
                      100% { opacity: 1; transform: translateX(0) scale(1); }
                    }
                    @keyframes slideInFromRight {
                      0% { opacity: 0; transform: translateX(300px) scale(0.8); }
                      50% { opacity: 0.7; transform: translateX(50px) scale(0.9); }
                      100% { opacity: 1; transform: translateX(0) scale(1); }
                    }
                    @keyframes slideInFromTop {
                      0% { opacity: 0; transform: translateY(-300px) scale(0.8); }
                      50% { opacity: 0.7; transform: translateY(-50px) scale(0.9); }
                      100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes slideInFromBottom {
                      0% { opacity: 0; transform: translateY(300px) scale(0.8); }
                      50% { opacity: 0.7; transform: translateY(50px) scale(0.9); }
                      100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .slide-left {
                      animation: slideInFromLeft 2500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                      animation-fill-mode: both;
                    }
                    .slide-right {
                      animation: slideInFromRight 2500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                      animation-fill-mode: both;
                    }
                    .slide-top {
                      animation: slideInFromTop 2500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                      animation-fill-mode: both;
                    }
                    .slide-bottom {
                      animation: slideInFromBottom 2500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                      animation-fill-mode: both;
                    }
                    .delay-200 { animation-delay: 200ms; }
                    .delay-400 { animation-delay: 400ms; }
                    .delay-600 { animation-delay: 600ms; }
                    .delay-800 { animation-delay: 800ms; }
                    .delay-1000 { animation-delay: 1000ms; }
                    .delay-1200 { animation-delay: 1200ms; }
                    .delay-1400 { animation-delay: 1400ms; }
                    .nav-link::after {
                      content: '';
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      width: 0;
                      height: 2px;
                      background-color: #fbbf24;
                      transition: width 0.3s ease;
                    }
                    .nav-link:hover::after {
                      width: 100%;
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
                style={{
                  animationDelay: "800ms",
                  animationDuration: "2500ms",
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
          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-lg font-serif relative">
            {!loading && <NavBar items={navItems} />}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-yellow-500 p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* CTA Button */}
          <Link href="/contact" className="hidden lg:block">
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-4 py-1.5 sm:px-6 sm:py-2 lg:px-8 lg:py-2 rounded-full font-bold transition-all duration-300 shadow-lg text-xs sm:text-sm font-serif slide-bottom"
              style={{ animationDelay: "1400ms" }}
            >
              Contact
            </button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && !loading && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm px-4 py-6 space-y-2">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.dropdown && item.dropdown.length > 0 ? (
                  <>
                    <button
                      onClick={() =>
                        setExpandedMenuItem(
                          expandedMenuItem === index ? null : index
                        )
                      }
                      className="w-full flex items-center justify-between text-white hover:text-yellow-400 py-3 font-serif text-left rounded-lg hover:bg-white/5 px-2 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          expandedMenuItem === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedMenuItem === index && (
                      <div className="pl-2 space-y-1 mt-1">
                        {item.dropdown.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            {subItem.dropdown && subItem.dropdown.length > 0 ? (
                              <>
                                <button
                                  onClick={() =>
                                    setExpandedSubMenu(
                                      expandedSubMenu === `${index}-${subIndex}`
                                        ? null
                                        : `${index}-${subIndex}`
                                    )
                                  }
                                  className="w-full flex items-center justify-between text-gray-300 hover:text-yellow-400 py-2 text-sm pl-3 pr-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                  <span>{subItem.name}</span>
                                  <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${
                                      expandedSubMenu === `${index}-${subIndex}`
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>
                                {expandedSubMenu === `${index}-${subIndex}` && (
                                  <div className="pl-3 space-y-1 mt-1">
                                    {subItem.dropdown.map(
                                      (nestedItem, nestedIndex) => (
                                        <Link
                                          key={nestedIndex}
                                          href={nestedItem.url}
                                          className="block text-gray-400 hover:text-yellow-400 py-2 text-xs pl-2 rounded-lg hover:bg-white/5 transition-colors"
                                          onClick={() => {
                                            setMobileMenuOpen(false);
                                            setExpandedMenuItem(null);
                                            setExpandedSubMenu(null);
                                          }}
                                        >
                                          {nestedItem.name}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={subItem.url}
                                className="block text-gray-300 hover:text-yellow-400 py-2 text-sm pl-3 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setExpandedMenuItem(null);
                                  setExpandedSubMenu(null);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className="block text-white hover:text-yellow-400 py-3 font-serif rounded-lg hover:bg-white/5 px-2 transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setExpandedMenuItem(null);
                      setExpandedSubMenu(null);
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/contact">
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full font-bold mt-6">
                Contact
              </button>
            </Link>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)] text-center px-4 sm:px-6">
          {/* Arabic Text */}
          <div className="mb-2">
            <h2
              className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 lg:mb-6 opacity-90 slide-top"
              style={{
                fontFamily: "serif",
                letterSpacing: "0.1em",
                lineHeight: "1.8",
                animationDelay: "1600ms",
              }}
            >
              {heroData.arabicText}
            </h2>
          </div>

          {/* Main Heading */}
          <div className="mb-6 sm:mb-8">
            <h3
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-light mb-2 tracking-wider opacity-90 slide-left"
              style={{ animationDelay: "1800ms" }}
            >
              {heroData.subtitle}
            </h3>
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold leading-tight tracking-wide slide-right"
              style={{ animationDelay: "2000ms" }}
            >
              <span className="text-yellow-600">{heroData.titleLine1}</span>
              <br />
              <span className="text-white">{heroData.titleLine2}</span>
              <br />
              <span className="text-yellow-600">{heroData.titleLine3}</span>
            </h1>
          </div>

          {/* Social Media Icons */}
          <div
            className="flex space-x-4 sm:space-x-6 slide-bottom"
            style={{ animationDelay: "2200ms" }}
          >
            <a
              href={heroData.socialLinks.instagram}
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={heroData.socialLinks.youtube}
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href={heroData.socialLinks.twitter}
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Subtle geometric patterns */}
        <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 border border-yellow-400 opacity-10 rotate-45"></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-24 h-24 border border-yellow-400 opacity-10 rotate-12"></div>
        <div className="hidden sm:block absolute top-1/2 left-5 w-16 h-16 border border-yellow-400 opacity-10 rounded-full"></div>
      </div>
    </div>
  );
};

export default IslamicCenterPage;

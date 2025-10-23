import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NavBar } from "./ui/tubelight-navbar";
import {
  Home,
  User,
  FileText,
  BookOpen,
  Image,
  Award,
  Briefcase,
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

const NavBarOnly = () => {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenuItem, setExpandedMenuItem] = useState(null);

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
      } finally {
        setLoading(false);
      }
    };

    fetchNavItems();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#381607] to-black overflow-visible">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1678395211776-4b2fcb1e3368?w=1920&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hc2ppZCUyMG5pZ2h0fGVufDB8fDB8fHww')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 pointer-events-none" />

      {/* Navigation */}
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
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
            <div className="hidden sm:block">
              <h1
                className="text-white font-bold text-sm sm:text-base lg:text-xl tracking-wide font-montserrat slide-bottom"
                style={{ animationDelay: "1200ms" }}
              >
                K-12 Schools
              </h1>
              <p
                className="text-yellow-400 text-xs font-light tracking-widest slide-bottom"
                style={{ animationDelay: "1400ms" }}
              >
                Islamic center
              </p>
            </div>
          </Link>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-lg font-serif relative">
            {!loading && <NavBar items={navItems} />}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-yellow-500 p-2 z-[9999]"
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
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-2 rounded-full font-bold transition-all duration-300 shadow-lg text-sm font-serif slide-bottom delay-1000">
              Contact
            </button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && !loading && (
          <div className="lg:hidden bg-gradient-to-r from-[#381607] to-black backdrop-blur-sm px-4 py-6 space-y-4 relative z-[9998]">
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
                      className="w-full flex items-center justify-between text-white hover:text-yellow-500 py-2 font-serif text-left"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          expandedMenuItem === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </button>
                    {expandedMenuItem === index && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            <Link
                              href={subItem.url}
                              className="block text-gray-300 hover:text-yellow-500 py-1 text-sm"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setExpandedMenuItem(null);
                              }}
                            >
                              {subItem.name}
                            </Link>
                            {subItem.dropdown &&
                              subItem.dropdown.length > 0 && (
                                <div className="pl-4 space-y-1 mt-1">
                                  {subItem.dropdown.map(
                                    (nestedItem, nestedIndex) => (
                                      <Link
                                        key={nestedIndex}
                                        href={nestedItem.url}
                                        className="block text-gray-400 hover:text-yellow-500 py-1 text-xs"
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          setExpandedMenuItem(null);
                                        }}
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className="block text-white hover:text-yellow-500 py-2 font-serif"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setExpandedMenuItem(null);
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/contact">
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full font-bold mt-4">
                Contact
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarOnly;

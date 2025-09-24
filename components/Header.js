import React, { useState } from "react";

const IslamicCenterPage = () => {
  const [dropdowns, setDropdowns] = useState({
    about: false,
    admission: false,
    learning: false,
    accreditation: false,
    career: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1678395211776-4b2fcb1e3368?w=1920&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hc2ppZCUyMG5pZ2h0fGVufDB8fDB8fHww')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <nav className="flex items-center justify-between px-6 lg:px-12 py-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-16 h-16">
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes customAnimationIn {
                      0% { opacity: 0; transform: scale(0.8); }
                      100% { opacity: 1; transform: scale(1); }
                    }
                    .animate-custom {
                      animation: customAnimationIn 1500ms ease-in-out;
                      animation-fill-mode: both;
                    }
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
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-2.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqdd.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/48999.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{
                  animationDelay: "1000ms",
                  animationDuration: "1000ms",
                }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/1333.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-13.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-12.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-6.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqq.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1500ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-9.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/7788.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-11.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-10.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qw.png"
                alt=""
                className="absolute w-full h-full object-contain animate-custom"
                style={{ animationDelay: "1000ms" }}
              />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-wide">
                k12 schools
              </h1>
              <p className="text-yellow-400 text-xs font-light tracking-widest">
                Islamic center
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-lg font-serif relative">
            <a
              href="#"
              className="nav-link relative text-[#D1A041] hover:text-yellow-400 transition-colors font-black"
            >
              Home
            </a>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("about")}
                className="nav-link relative text-[#D1A041] hover:text-yellow-400 transition-colors font-black flex items-center"
              >
                About
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    dropdowns.about ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdowns.about && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Our Mission
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Our Vision
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    History
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Leadership
                  </a>
                </div>
              )}
            </div>

            {/* Admission Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("admission")}
                className="nav-link relative text-[#D1A041] hover:text-yellow-400 transition-colors font-black flex items-center"
              >
                Admission
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    dropdowns.admission ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdowns.admission && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Application Process
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Requirements
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Fees
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Deadlines
                  </a>
                </div>
              )}
            </div>

            {/* Learning at ARA Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("learning")}
                className="nav-link relative text-[#D1A041] hover:text-yellow-400 transition-colors font-black flex items-center"
              >
                Learning at ARA
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    dropdowns.learning ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdowns.learning && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Curriculum
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Islamic Studies
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Academic Programs
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Extracurricular
                  </a>
                </div>
              )}
            </div>

            <a
              href="#"
              className="nav-link relative text-[#D1A041] hover:text-yellow-400 transition-colors font-black"
            >
              Gallery
            </a>

            {/* Accreditation Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("accreditation")}
                className="nav-link relative text-[#D1A041] hover:text-yellow-400 transition-colors font-black flex items-center"
              >
                Accreditation
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    dropdowns.accreditation ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdowns.accreditation && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    COGNIA Accreditation
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Standards & Compliance
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Quality Assurance
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Recognition
                  </a>
                </div>
              )}
            </div>

            {/* Career Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("career")}
                className="nav-link relative text-[#D1A041] hover:text-yellow-400 transition-colors font-black flex items-center"
              >
                Career
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    dropdowns.career ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdowns.career && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Job Opportunities
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Teaching Positions
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Staff Openings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Apply Now
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-2 rounded-full font-bold transition-all duration-300 shadow-lg text-sm font-serif">
            Contact Us
          </button>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-6">
          {/* Arabic Text */}
          <div className="mb-2">
            <h2
              className="text-white text-xl lg:text-2xl mb-6 opacity-90"
              style={{
                fontFamily: "serif",
                letterSpacing: "0.1em",
                lineHeight: "1.8",
              }}
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ
            </h2>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h3 className="text-white text-lg lg:text-xl font-light mb-2 tracking-wider opacity-90">
              Know the Real
            </h3>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight tracking-wide">
              <span className="text-yellow-600">Recognized by</span>
              <br />
              <span className="text-white">New York State</span>
              <br />
              <span className="text-yellow-600">Education Department</span>
            </h1>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Subtle geometric patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-400 opacity-10 rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-yellow-400 opacity-10 rotate-12"></div>
        <div className="absolute top-1/2 left-5 w-16 h-16 border border-yellow-400 opacity-10 rounded-full"></div>
      </div>
    </div>
  );
};

export default IslamicCenterPage;

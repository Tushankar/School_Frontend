"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShirtIcon,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Loader2,
} from "lucide-react";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";

const THEME_COLOR = "#ba6f02";

const DressCodePage = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDressCodeData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/cms/dress-code"
        );
        if (response.ok) {
          const data = await response.json();
          setCmsData(data);
        } else {
          setError("Failed to load dress code information");
        }
      } catch (err) {
        console.error("Error fetching dress code data:", err);
        setError("Failed to load dress code information");
      } finally {
        setLoading(false);
      }
    };

    fetchDressCodeData();
  }, []);

  return (
    <>
      <NavBarOnly />
      <Ticker />

      {loading ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading dress code information...</p>
          </div>
        </div>
      ) : error ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Error Loading Content
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      ) : cmsData ? (
        <>
          {/* Banner Section */}
          <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${
                  cmsData.banner?.backgroundImage || "/assets/hall.jpg"
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
                {cmsData.banner?.title || "Dress Code"}
              </motion.h1>
              <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="mt-4 text-sm"
              >
                {cmsData.banner?.breadcrumb || "Home › Dress Code"}
              </motion.p>
            </div>
          </div>

          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Hero Section with Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl shadow-2xl p-8 mb-8 text-white"
                style={{ backgroundColor: THEME_COLOR }}
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0">
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
                      src={
                        cmsData.heroSection?.logoImages?.[0] ||
                        "https://www.alrasheedacademy.org/images/Untitled-1.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-left"
                      style={{ animationDelay: "200ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[1] ||
                        "https://www.alrasheedacademy.org/images/Untitled-2.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-left"
                      style={{ animationDelay: "400ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[2] ||
                        "https://www.alrasheedacademy.org/images/qqdd.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-left"
                      style={{ animationDelay: "600ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[3] ||
                        "https://www.alrasheedacademy.org/images/48999.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-left"
                      style={{
                        animationDelay: "800ms",
                        animationDuration: "1000ms",
                      }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[4] ||
                        "https://www.alrasheedacademy.org/images/1333.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-right"
                      style={{ animationDelay: "300ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[5] ||
                        "https://www.alrasheedacademy.org/images/Untitled-13.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-right"
                      style={{ animationDelay: "500ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[6] ||
                        "https://www.alrasheedacademy.org/images/Untitled-12.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-right"
                      style={{ animationDelay: "700ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[7] ||
                        "https://www.alrasheedacademy.org/images/Untitled-6.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-right"
                      style={{ animationDelay: "900ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[8] ||
                        "https://www.alrasheedacademy.org/images/qqq.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-top"
                      style={{ animationDelay: "400ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[9] ||
                        "https://www.alrasheedacademy.org/images/Untitled-9.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-top"
                      style={{ animationDelay: "600ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[10] ||
                        "https://www.alrasheedacademy.org/images/7788.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-top"
                      style={{ animationDelay: "800ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[11] ||
                        "https://www.alrasheedacademy.org/images/Untitled-11.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-bottom"
                      style={{ animationDelay: "500ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[12] ||
                        "https://www.alrasheedacademy.org/images/Untitled-10.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-bottom"
                      style={{ animationDelay: "700ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[13] ||
                        "https://www.alrasheedacademy.org/images/Untitled-1qwe.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-bottom"
                      style={{ animationDelay: "900ms" }}
                    />
                    <img
                      src={
                        cmsData.heroSection?.logoImages?.[14] ||
                        "https://www.alrasheedacademy.org/images/qw.png"
                      }
                      alt=""
                      className="absolute w-full h-full object-contain slide-bottom"
                      style={{ animationDelay: "1100ms" }}
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mb-1">
                      {cmsData.heroSection?.schoolName || "AL-RASHEED ACADEMY"}
                    </h1>
                    <p className="text-gray-200 text-sm">
                      {cmsData.heroSection?.tagline ||
                        "Established in Excellence"}
                    </p>
                  </div>
                </div>
                <div className="max-w-3xl">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {cmsData.heroSection?.mainTitle || "Dress Code Guidelines"}
                  </h2>
                  <p className="text-lg text-gray-100 leading-relaxed">
                    {cmsData.heroSection?.description ||
                      "Creating unity, responsibility, and a positive learning environment through proper attire. Your cooperation ensures our students are prepared for success every day."}
                  </p>
                </div>
              </motion.div>

              {/* Key Information Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {cmsData.infoCards?.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    className="bg-white rounded-xl shadow-lg p-6 border-t-4"
                    style={{ borderTopColor: card.borderColor || "#ba6f02" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: card.iconBgColor || "#ba6f02",
                        }}
                      >
                        <ShirtIcon
                          className="h-6 w-6"
                          style={{ color: card.iconColor || "#ffffff" }}
                        />
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {card.title || "Card Title"}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {card.description || "Card description"}
                    </p>
                  </motion.div>
                )) || (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <ShirtIcon className="h-6 w-6 text-teal-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">
                          Daily Uniform
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Required every school day for all students
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Calendar className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">
                          Gym Days
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Special uniform for PE and outdoor activities
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">
                          Compliance
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Full uniform required upon entry to school
                      </p>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Important Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-full flex-shrink-0">
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#201f1a] mb-3">
                      {cmsData.notice?.title || "Dress Code Violations Policy"}
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      {cmsData.notice?.points?.map((point, index) => (
                        <p key={index}>
                          <strong>{point.label}:</strong> {point.description}
                        </p>
                      )) || (
                        <>
                          <p>
                            <strong>Parent Responsibility:</strong> Parents are
                            responsible for ensuring their child leaves home in
                            full uniform each day.
                          </p>
                          <p>
                            <strong>School Entry:</strong> Students must enter
                            school premises fully uniformed. Students not in
                            proper uniform will not be admitted.
                          </p>
                          <p>
                            <strong>Consequences:</strong> If a student arrives
                            without proper uniform, parents must bring the
                            uniform or the student will receive after-school
                            detention.
                          </p>
                          <p>
                            <strong>Repeated Violations:</strong> Continued
                            violations will result in suspension until a parent
                            conference is held.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Uniform Requirements Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
              >
                <div
                  className="p-6 transition-colors duration-300"
                  style={{ backgroundColor: THEME_COLOR }}
                >
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <ShirtIcon className="h-8 w-8" />
                    {cmsData.uniformRequirements?.title ||
                      "Uniform Requirements"}
                  </h2>
                  <p className="text-gray-100 mt-2">
                    {cmsData.uniformRequirements?.description ||
                      "Complete dress code guidelines by grade level"}
                  </p>
                </div>

                <div className="flex border-b bg-gray-50">
                  <button
                    onClick={() => setActiveTab("daily")}
                    className={`flex-1 py-4 px-6 font-semibold transition-all relative ${
                      activeTab === "daily"
                        ? "text-orange-600 bg-white"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {cmsData.uniformRequirements?.dailyUniform?.title ||
                      "Daily Uniform"}
                    {activeTab === "daily" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("gym")}
                    className={`flex-1 py-4 px-6 font-semibold transition-all relative ${
                      activeTab === "gym"
                        ? "text-orange-600 bg-white"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {cmsData.uniformRequirements?.gymUniform?.title ||
                      "Gym Uniform"}
                    {activeTab === "gym" && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"
                      />
                    )}
                  </button>
                </div>

                {/* Daily Uniform Content */}
                {activeTab === "daily" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    {/* Uniform Description */}
                    <div className="mb-8 grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg text-gray-800 mb-2">
                          Daily Uniform Standard
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Every student must wear the required daily uniform
                          every day. Both boys and girls may wear uniform
                          sweaters or fleece jackets/vests as optional layers.
                        </p>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                        <h4 className="font-bold text-lg text-gray-800 mb-2">
                          Gym Uniform Policy
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Gym uniforms are worn <strong>ONLY</strong> on gym,
                          games, and field trip days. Girls 4th grade and up may
                          wear gym uniforms under their abayas.
                        </p>
                      </div>
                    </div>

                    {/* Grade Level Sections */}
                    <h3 className="text-2xl font-bold text-[#201f1a] mb-6 text-center">
                      {cmsData.uniformRequirements?.dailyUniform?.title ||
                        "Required Uniform Purchase Items"}
                    </h3>

                    <div className="space-y-6">
                      {/* Kindergarten thru 3rd */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">
                            K-3rd Grade
                          </div>
                          <h4 className="text-xl font-bold text-gray-800">
                            Kindergarten through 3rd Grade
                          </h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Navy Blue uniform dresses</strong>{" "}
                                  with Navy Blue pants
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Maroon collared shirts</strong>
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Maroon Hijab</strong>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-48 h-48 bg-white rounded-xl shadow-lg border-4 border-blue-200 overflow-hidden flex items-center justify-center">
                              <img
                                src="/assets/12grade.png"
                                alt="Kindergarten through 3rd grade uniform"
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4th Grade thru 12th Grade */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-bold">
                            4th-12th Grade
                          </div>
                          <h4 className="text-xl font-bold text-gray-800">
                            4th Grade through 12th Grade
                          </h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Black Abaya</strong> (with no design)
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Maroon Hijab</strong>
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Black or white socks</strong>
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Black Cardigans/Button down</strong>{" "}
                                  (no zippers or hoods allowed)
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-48 h-48 bg-white rounded-xl shadow-lg border-4 border-purple-200 overflow-hidden flex items-center justify-center">
                              <img
                                src="/assets/hijabblack.png"
                                alt="4th through 12th grade uniform"
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* All Grades */}
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-bold">
                            All Grades
                          </div>
                          <h4 className="text-xl font-bold text-gray-800">
                            Kindergarten through 12th Grade
                          </h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>School uniform colors</strong> by
                                  school level
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Navy Blue Hijab</strong>
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>Black or white socks</strong>
                                </span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <strong>
                                    Navy Blue Uniform Sweaters/Button down
                                  </strong>{" "}
                                  (no zippers or hoods)
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center">
                                <div className="bg-white rounded-lg shadow-md p-2 mb-2 border-2 border-teal-200 h-24 overflow-hidden">
                                  <img
                                    src="/assets/kgpant.png"
                                    alt="Elementary uniform"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-xs font-medium text-gray-700">
                                  Elementary
                                </p>
                              </div>
                              <div className="text-center">
                                <div className="bg-white rounded-lg shadow-md p-2 mb-2 border-2 border-teal-200 h-24 overflow-hidden">
                                  <img
                                    src="/assets/shoe.png"
                                    alt="School shoes"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-xs font-medium text-gray-700">
                                  School Shoes
                                </p>
                              </div>
                              <div className="text-center">
                                <div className="bg-white rounded-lg shadow-md p-2 mb-2 border-2 border-teal-200 h-24 overflow-hidden">
                                  <img
                                    src="/assets/kgthr12Pant.png"
                                    alt="High school uniform"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-xs font-medium text-gray-700">
                                  High School
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Gym Uniform Content - UPDATED: Smaller cards, no icons */}
                {activeTab === "gym" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#201f1a] mb-3">
                        {cmsData.uniformRequirements?.gymUniform?.title ||
                          "Physical Education Uniform"}
                      </h3>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        {cmsData.uniformRequirements?.gymUniform?.description ||
                          "Appropriate athletic wear for gym class, games, and outdoor activities"}
                      </p>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6 mb-8">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
                        <p className="font-bold text-orange-900">
                          Black sneakers are required for all gym classes
                        </p>
                      </div>
                    </div>

                    {/* Gym Uniform Table - Smaller & Compact */}
                    <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                      {/* Boys */}
                      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                        <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                            B
                          </div>
                          {cmsData.uniformRequirements?.gymUniform?.boys
                            ?.title || "Boys Gym Uniform"}
                        </h4>
                        <ul className="space-y-2">
                          {cmsData.uniformRequirements?.gymUniform?.boys?.items?.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>{item}</strong>
                                </span>
                              </li>
                            )
                          ) || (
                            <>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>T-shirt</strong> (no design)
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>Baggy sweatpants</strong>
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>Black sneakers</strong>
                                </span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      {/* Girls */}
                      <div className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200">
                        <h4 className="text-lg font-bold text-pink-900 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs">
                            G
                          </div>
                          {cmsData.uniformRequirements?.gymUniform?.girls
                            ?.title || "Girls Gym Uniform"}
                        </h4>
                        <ul className="space-y-2">
                          {cmsData.uniformRequirements?.gymUniform?.girls?.items?.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4 text-pink-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>{item}</strong>
                                </span>
                              </li>
                            )
                          ) || (
                            <>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-pink-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>Long sleeve t-shirt</strong> (no
                                  design)
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-pink-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>Baggy sweatpants</strong>
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-pink-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  <strong>Black sneakers</strong>
                                </span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl shadow-2xl p-8 text-white"
                style={{ backgroundColor: THEME_COLOR }}
              >
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold mb-4">
                    {cmsData.contact?.title || "Need Assistance?"}
                  </h3>
                  <p className="text-gray-100 mb-8 text-lg">
                    {cmsData.contact?.description ||
                      "Our office staff is available to answer any questions about dress code requirements"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {cmsData.contact?.contactMethods?.map((method, index) => (
                      <a
                        key={index}
                        href={method.href}
                        className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                      >
                        {method.type === "phone" ? (
                          <Phone className="h-5 w-5 text-orange-500" />
                        ) : (
                          <Mail
                            className="h-5 w-5"
                            style={{ color: method.iconColor || "#ba6f02" }}
                          />
                        )}
                        <span>{method.label}</span>
                      </a>
                    )) || (
                      <>
                        <a
                          href={`tel:${cmsData.contact?.phone || "7167061303"}`}
                          className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                        >
                          <Phone className="h-5 w-5 text-orange-500" />
                          <span>
                            {cmsData.contact?.phone || "(716) 706-1303"}
                          </span>
                        </a>
                        <a
                          href={`mailto:${
                            cmsData.contact?.email ||
                            "registration@alrasheed.edu"
                          }`}
                          className="flex items-center gap-3 bg-white text-[#ba6f02] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                        >
                          <Mail className="h-5 w-5" />
                          <span>
                            {cmsData.contact?.email ||
                              "registration@alrasheed.edu"}
                          </span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default DressCodePage;

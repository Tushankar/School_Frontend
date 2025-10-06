import React, { useState } from "react";
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

const NavBarOnly = () => {
  const navItems = [
    { name: "Home", url: "#", icon: Home },
    {
      name: "About",
      url: "#",
      icon: User,
      dropdown: [
        { name: "Mission and Vision", url: "/mission-vision" },
        { name: "Principal's message", url: "#" },
        { name: "School Board", url: "#" },
        { name: "General Administration", url: "#" },
        { name: "Parent handbook", url: "#" },
        { name: "Faculty", url: "#" },
      ],
    },
    {
      name: "Admission",
      url: "#",
      icon: FileText,
      dropdown: [
        { name: "New Enrollment", url: "#" },
        { name: "Re-Enrollment", url: "#" },
        { name: "Uniform Policy", url: "#" },
        { name: "Bus Policy", url: "#" },
        { name: "Supply List", url: "#" },
      ],
    },
    {
      name: "Learning",
      url: "#",
      icon: BookOpen,
      dropdown: [
        { name: "Calender", url: "#" },
        { name: "College Preparatory", url: "#" },
        { name: "Islamic Studies & Qur'an", url: "#" },
        { name: "Curricular", url: "#" },
      ],
    },
    { name: "Gallery", url: "#", icon: Image },
    {
      name: "Accreditation",
      url: "#",
      icon: Award,
      dropdown: [
        { name: "Staff Surveys", url: "#" },
        { name: "Parents Surveys", url: "#" },
        { name: "Students Surveys", url: "#" },
      ],
    },
    { name: "Career", url: "#", icon: Briefcase },
  ];

  return (
    <div className="relative bg-black overflow-visible">
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

      {/* Navigation */}
      <div className="relative z-[9999]">
        <nav className="flex items-center justify-between px-6 lg:px-12 py-4">
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
          <div className="hidden lg:flex items-center space-x-8 text-lg font-serif relative z-[999]">
            <NavBar items={navItems} />
          </div>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-2 rounded-full font-bold transition-all duration-300 shadow-lg text-sm font-serif">
            Contact Us
          </button>
        </nav>
      </div>
    </div>
  );
};

export default NavBarOnly;

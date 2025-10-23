"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  DollarSign,
  Calendar,
  ShoppingCart,
  Tag,
  BarChart3,
  Users,
  ChevronDown,
  ChevronsRight,
  Moon,
  Sun,
  TrendingUp,
  Activity,
  Package,
  Bell,
  LogOut,
  FileText,
  Plus,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Image,
  Upload,
  Trash2,
  Edit,
  Loader2,
  Heart,
  Menu,
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "sonner";
import dynamic from "next/dynamic";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Custom styles for Quill editor in dark mode
const quillDarkStyles = `
  .dark .ql-toolbar {
    border-color: #374151;
    background-color: #1f2937;
  }
  .dark .ql-container {
    border-color: #374151;
    background-color: #1f2937;
  }
  .dark .ql-editor {
    color: #f3f4f6;
  }
  .dark .ql-editor.ql-blank::before {
    color: #9ca3af;
  }
  .dark .ql-toolbar .ql-stroke {
    stroke: #d1d5db;
  }
  .dark .ql-toolbar .ql-fill {
    fill: #d1d5db;
  }
  .dark .ql-toolbar button:hover .ql-stroke {
    stroke: #f3f4f6;
  }
  .dark .ql-toolbar button:hover .ql-fill {
    fill: #f3f4f6;
  }
  .dark .ql-toolbar button.ql-active .ql-stroke {
    stroke: #3b82f6;
  }
  .dark .ql-toolbar button.ql-active .ql-fill {
    fill: #3b82f6;
  }
`;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { Input } from "./input";
import GalleryManagement from "./GalleryManagement";
import { ContactFormsTable, ContactFormDetailView } from "./ContactManagement";
import CalendarView from "./CalendarView";
import {
  JobApplicationTable,
  VolunteerApplicationTable,
  JobApplicationDetailView,
  VolunteerApplicationDetailView,
} from "./CareerManagement";
import {
  EnrollmentTable,
  EnrollmentDetailView,
} from "./NewEnrollmentManagement";
import {
  ReEnrollmentTable,
  ReEnrollmentDetailView,
} from "./ReEnrollmentManagement";
import {
  ParentSurveyTable,
  StaffSurveyTable,
  StudentSurveyTable,
  ParentSurveyDetailView,
  StaffSurveyDetailView,
  StudentSurveyDetailView,
} from "./SurveyManagement";

// Import NavBarOnly for preview
import NavBarOnly from "../NavBarOnly";
import PrincipalMessageCMS from "./principal-message-cms";
import TeamCMS from "./team-cms";
import AdministrationCMS from "./administration-cms";
import K3FacultyCMS from "./k3-faculty-cms";
import BoysFacultyCMS from "./boys-faculty-cms";
import GirlsFacultyCMS from "./girls-faculty-cms";
import HeroCMS from "./hero-cms";
import AboutUsCMS from "./about-us-cms";
import TrustedBrandsCMS from "./trusted-brands-cms";
import AffiliationsCMS from "./affiliations-cms";
import CharacterCardsCMS from "./character-cards-cms";
import BentoGridCMS from "./bento-grid-cms";
import FooterCMS from "./footer-cms";
import DressCodeCMS from "./dress-code-cms";
import BusPolicyCMS from "./bus-policy-cms";
import CollegePreparatoryCMS from "./college-preparatory-cms";

export const Dashboard = () => {
  // Function to get initial theme
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  };

  const [isDark, setIsDark] = useState(getInitialTheme);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [authorized, setAuthorized] = useState(null);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark, mounted]);

  // Auth guard: verify user on mount. If not authenticated, set authorized=false so parent can show sign-in.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers = storedToken
          ? { Authorization: `Bearer ${storedToken}` }
          : {};

        const res = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/auth/me",
          {
            credentials: "include",
            headers,
          }
        );
        if (res.ok) {
          setAuthorized(true);
          return;
        }

        // try local token decode fallback
        if (storedToken) {
          try {
            const parts = storedToken.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(
                atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
              );
              const now = Math.floor(Date.now() / 1000);
              if (!payload.exp || payload.exp > now) {
                setAuthorized(true);
                return;
              }
            }
          } catch (e) {
            // ignore
          }
        }

        setAuthorized(false);
      } catch (err) {
        // network error, try fallback
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (storedToken) {
          try {
            const parts = storedToken.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(
                atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
              );
              const now = Math.floor(Date.now() / 1000);
              if (!payload.exp || payload.exp > now) {
                setAuthorized(true);
                return;
              }
            }
          } catch (e) {
            // ignore
          }
        }
        setAuthorized(false);
      }
    };

    if (mounted) checkAuth();
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      // Force re-render
      html.style.colorScheme = isDark ? "dark" : "light";
    }
  }, [isDark, mounted]);

  // Wait until mounted and authorized check completes. If not authorized, render null
  if (!mounted || authorized !== true) {
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex-col lg:flex-row">
      <Sidebar selected={selected} setSelected={setSelected} />
      <DashboardContent
        isDark={isDark}
        setIsDark={setIsDark}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

const Sidebar = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [accreditationOpen, setAccreditationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [pageCmsOpen, setPageCmsOpen] = useState(false);
  const [landingPageCmsOpen, setLandingPageCmsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed lg:relative h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-16"
        } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm flex flex-col z-40 ${
          showMobileMenu
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <TitleSection open={open} />

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-1 mb-8">
            <Option
              Icon={Home}
              title="Dashboard"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <DropdownOption
              Icon={FileText}
              title="Admission"
              selected={selected}
              setSelected={setSelected}
              open={open}
              isOpen={admissionOpen}
              setIsOpen={setAdmissionOpen}
              subOptions={[
                { title: "New Enrollment", href: null },
                { title: "Re-Enrollment", href: null },
              ]}
            />
            <DropdownOption
              Icon={Users}
              title="Career"
              selected={selected}
              setSelected={setSelected}
              open={open}
              isOpen={careerOpen}
              setIsOpen={setCareerOpen}
              subOptions={[
                { title: "Job Application", href: null },
                { title: "Volunteer Application", href: null },
              ]}
            />
            <Option
              Icon={Calendar}
              title="Calendar"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={Image}
              title="Gallery"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />

            <DropdownOption
              Icon={BarChart3}
              title="Accreditation"
              selected={selected}
              setSelected={setSelected}
              open={open}
              isOpen={accreditationOpen}
              setIsOpen={setAccreditationOpen}
              subOptions={[
                { title: "Staff Surveys", href: null },
                { title: "Parent Surveys", href: null },
                { title: "Student Surveys", href: null },
              ]}
            />
            <Option
              Icon={TrendingUp}
              title="Ticker CMS"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={Menu}
              title="Navbar CMS"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <DropdownOption
              Icon={MapPin}
              title="Contact"
              selected={selected}
              setSelected={setSelected}
              open={open}
              isOpen={contactOpen}
              setIsOpen={setContactOpen}
              subOptions={[
                { title: "CMS Management", href: null },
                { title: "Contact Forms", href: null },
              ]}
            />
            <DropdownOption
              Icon={FileText}
              title="Page CMS"
              selected={selected}
              setSelected={setSelected}
              open={open}
              isOpen={pageCmsOpen}
              setIsOpen={setPageCmsOpen}
              subOptions={[
                { title: "Mission & Vision", href: null },
                { title: "Principal Message", href: null },
                { title: "Team", href: null },
                { title: "Administration", href: null },
                { title: "K3 Faculty", href: null },
                { title: "Boys Faculty", href: null },
                { title: "Girls Faculty", href: null },
                { title: "Bus Policy CMS", href: null },
                { title: "Supply List CMS", href: null },
                { title: "Dress Code CMS", href: null },
                { title: "College Preparatory CMS", href: null },
                { title: "Islamic Studies CMS", href: null },
                { title: "Curricular CMS", href: null },
              ]}
            />
            <DropdownOption
              Icon={Home}
              title="Landing Page CMS"
              selected={selected}
              setSelected={setSelected}
              open={open}
              isOpen={landingPageCmsOpen}
              setIsOpen={setLandingPageCmsOpen}
              subOptions={[
                { title: "Hero CMS", href: null },
                { title: "About Us CMS", href: null },
                { title: "Trusted Brands CMS", href: null },
                { title: "Affiliations CMS", href: null },
                { title: "Character Cards CMS", href: null },
                { title: "Bento Grid CMS", href: null },
                { title: "Footer CMS", href: null },
              ]}
            />
          </div>

          {open && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Account
              </div>
              <div className="px-3">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-3 rounded-md p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="grid h-6 w-6 place-content-center">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Log out</span>
                </button>
              </div>
              {/* Logout confirmation modal */}
              {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setShowLogoutModal(false)}
                  ></div>
                  <div className="relative z-10 w-full max-w-md rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg mx-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Confirm log out
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Are you sure you want to log out?
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowLogoutModal(false)}
                        className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await fetch(
                              "https://alrasheedacademyserver.onrender.com/api/auth/logout",
                              {
                                method: "POST",
                                credentials: "include",
                              }
                            );
                          } catch (e) {
                            // ignore
                          }
                          if (typeof window !== "undefined") {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                          }
                        }}
                        className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <ToggleClose open={open} setOpen={setOpen} />
      </nav>
    </>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  isLink,
}) => {
  const isSelected = selected === title;

  const handleClick = () => {
    console.log("Option clicked:", title, "isLink:", isLink);
    if (!isLink) {
      setSelected(title);
      console.log("Selected set to:", title);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>

      {open && (
        <span
          className={`text-sm font-medium transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {title}
        </span>
      )}

      {notifs && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600 text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const DropdownOption = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  isOpen,
  setIsOpen,
  subOptions,
}) => {
  const isSelected =
    selected === title ||
    subOptions.some((option) => option.title === selected);

  const handleClick = () => {
    setIsOpen(!isOpen);
    // Don't set selected when opening/closing dropdown
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
          isSelected
            ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        <div className="grid h-full w-12 place-content-center">
          <Icon className="h-4 w-4" />
        </div>

        {open && (
          <>
            <span
              className={`text-sm font-medium transition-opacity duration-200 flex-1 text-left ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              {title}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {isOpen && open && (
        <div className="ml-6 mt-1 space-y-1">
          {subOptions.map((option, index) =>
            option.href ? (
              <Link key={index} href={option.href}>
                <button
                  onClick={() => setSelected(option.title)}
                  className={`flex h-9 w-full items-center rounded-md px-3 text-sm transition-all duration-200 ${
                    selected === option.title
                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  {option.title}
                </button>
              </Link>
            ) : (
              <button
                key={index}
                onClick={() => setSelected(option.title)}
                className={`flex h-9 w-full items-center rounded-md px-3 text-sm transition-all duration-200 ${
                  selected === option.title
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {option.title}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div
              className={`transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Admin Panel
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    School Management
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && (
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-10 h-10 shrink-0">
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
    </Link>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex items-center p-3">
          <div className="grid size-10 place-content-center">
            <ChevronsRight
              className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
          {open && (
            <span
              className={`text-sm font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Hide
            </span>
          )}
        </div>
      </button>
    </div>
  );
};

const DashboardContent = ({ isDark, setIsDark, selected, setSelected }) => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalEnrollments: 0,
      totalReenrollments: 0,
      totalJobApplications: 0,
      totalVolunteerApplications: 0,
      totalStaffSurveys: 0,
      totalParentSurveys: 0,
      totalStudentSurveys: 0,
      totalContactForms: 0,
      pendingEnrollments: 0,
      pendingReenrollments: 0,
      pendingJobApplications: 0,
      pendingVolunteerApplications: 0,
    },
    recentActivities: [],
    loading: true,
  });

  const [notifications, setNotifications] = useState({
    count: 0,
    items: [],
    showDropdown: false,
    lastCheck: Date.now(),
  });

  useEffect(() => {
    if (selected === "Dashboard") {
      fetchDashboardData();
    }
  }, [selected]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifications.showDropdown &&
        !event.target.closest(".notification-dropdown-container")
      ) {
        setNotifications((prev) => ({ ...prev, showDropdown: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifications.showDropdown]);

  // Check for new notifications every 30 seconds
  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const lastCheck = notifications.lastCheck;
        const currentTime = Date.now();

        // Fetch data from all APIs to check for new submissions
        const [
          enrollmentsRes,
          reenrollmentsRes,
          jobAppsRes,
          volunteerAppsRes,
          staffSurveysRes,
          parentSurveysRes,
          studentSurveysRes,
          contactFormsRes,
        ] = await Promise.all([
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/forms/student-registration"
          ).catch(() => ({ ok: false })),
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/renroll/renroll-form"
          ).catch(() => ({
            ok: false,
          })),
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/job-applications/"
          ).catch(() => ({
            ok: false,
          })),
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/volunteer-applications/"
          ).catch(() => ({ ok: false })),
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/surveys/staff"
          ).catch(() => ({
            ok: false,
          })),
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/surveys/parent"
          ).catch(() => ({
            ok: false,
          })),
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/surveys/student"
          ).catch(() => ({
            ok: false,
          })),
          fetch(
            "https://alrasheedacademyserver.onrender.com/api/contact/"
          ).catch(() => ({
            ok: false,
          })),
        ]);

        const newNotifications = [];

        if (enrollmentsRes.ok) {
          const data = await enrollmentsRes.json();
          const recent =
            data.registrations?.filter(
              (item) =>
                new Date(item.submittedAt || item.createdAt).getTime() >
                lastCheck
            ) || [];
          recent.forEach((item) =>
            newNotifications.push({
              id: `enroll-${item._id}`,
              type: "enrollment",
              title: "New Enrollment Application",
              description: `${item.childFirstName} ${item.childLastName} - ${item.gradeLevel}`,
              time: new Date(item.submittedAt || item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        if (reenrollmentsRes.ok) {
          const data = await reenrollmentsRes.json();
          const recent =
            data.forms?.filter(
              (item) =>
                new Date(item.submittedAt || item.createdAt).getTime() >
                lastCheck
            ) || [];
          recent.forEach((item) =>
            newNotifications.push({
              id: `reenroll-${item._id}`,
              type: "re-enrollment",
              title: "New Re-Enrollment Application",
              description: `${item.childFirstName} ${item.childLastName} - ${item.gradeLevel}`,
              time: new Date(item.submittedAt || item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        if (jobAppsRes.ok) {
          const data = await jobAppsRes.json();
          const recent =
            data.applications?.filter(
              (item) =>
                new Date(item.submittedAt || item.createdAt).getTime() >
                lastCheck
            ) || [];
          recent.forEach((item) =>
            newNotifications.push({
              id: `job-${item._id}`,
              type: "job-application",
              title: "New Job Application",
              description: `${item.firstName} ${item.lastName} - ${item.position}`,
              time: new Date(item.submittedAt || item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        if (volunteerAppsRes.ok) {
          const data = await volunteerAppsRes.json();
          const recent =
            data.applications?.filter(
              (item) =>
                new Date(item.submittedAt || item.createdAt).getTime() >
                lastCheck
            ) || [];
          recent.forEach((item) =>
            newNotifications.push({
              id: `volunteer-${item._id}`,
              type: "volunteer-application",
              title: "New Volunteer Application",
              description: `${item.firstName} ${item.lastName} - ${item.position}`,
              time: new Date(item.submittedAt || item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        if (staffSurveysRes.ok) {
          const data = await staffSurveysRes.json();
          const recent =
            data.surveys?.filter(
              (item) =>
                new Date(item.submittedAt || item.createdAt).getTime() >
                lastCheck
            ) || [];
          recent.forEach((item) =>
            newNotifications.push({
              id: `staff-survey-${item._id}`,
              type: "staff-survey",
              title: "New Staff Survey",
              description: "Staff feedback submitted",
              time: new Date(item.submittedAt || item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        if (parentSurveysRes.ok) {
          const data = await parentSurveysRes.json();
          const recent =
            data.surveys?.filter(
              (item) =>
                new Date(item.submittedAt || item.createdAt).getTime() >
                lastCheck
            ) || [];
          recent.forEach((item) =>
            newNotifications.push({
              id: `parent-survey-${item._id}`,
              type: "parent-survey",
              title: "New Parent Survey",
              description: "Parent feedback submitted",
              time: new Date(item.submittedAt || item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        if (studentSurveysRes.ok) {
          const data = await studentSurveysRes.json();
          const recent =
            data.surveys?.filter(
              (item) =>
                new Date(item.submittedAt || item.createdAt).getTime() >
                lastCheck
            ) || [];
          recent.forEach((item) =>
            newNotifications.push({
              id: `student-survey-${item._id}`,
              type: "student-survey",
              title: "New Student Survey",
              description: "Student feedback submitted",
              time: new Date(item.submittedAt || item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        if (contactFormsRes.ok) {
          const data = await contactFormsRes.json();
          const recent = (Array.isArray(data) ? data : []).filter(
            (item) => new Date(item.createdAt).getTime() > lastCheck
          );
          recent.forEach((item) =>
            newNotifications.push({
              id: `contact-${item._id}`,
              type: "contact-form",
              title: "New Contact Form",
              description: `${item.name} - ${item.subject}`,
              time: new Date(item.createdAt).getTime(),
              actionId: item._id,
            })
          );
        }

        // Sort by time (newest first)
        newNotifications.sort((a, b) => b.time - a.time);

        // Update notifications state
        if (newNotifications.length > 0) {
          setNotifications((prev) => ({
            ...prev,
            count: prev.count + newNotifications.length,
            items: [...newNotifications, ...prev.items].slice(0, 50), // Keep only 50 most recent
            lastCheck: currentTime,
          }));
        } else {
          setNotifications((prev) => ({
            ...prev,
            lastCheck: currentTime,
          }));
        }
      } catch (error) {
        console.error("Error checking notifications:", error);
      }
    };

    // Initial check
    checkNotifications();

    // Set up polling every 30 seconds
    const interval = setInterval(checkNotifications, 30000);

    return () => clearInterval(interval);
  }, [notifications.lastCheck]);

  const fetchDashboardData = async () => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true }));

      // Fetch data from all APIs in parallel
      const [
        enrollmentsRes,
        reenrollmentsRes,
        jobAppsRes,
        volunteerAppsRes,
        staffSurveysRes,
        parentSurveysRes,
        studentSurveysRes,
        contactFormsRes,
      ] = await Promise.all([
        fetch(
          "https://alrasheedacademyserver.onrender.com/api/forms/student-registration"
        ).catch(() => ({ ok: false, json: () => ({}) })),
        fetch(
          "https://alrasheedacademyserver.onrender.com/api/renroll/renroll-form"
        ).catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch(
          "https://alrasheedacademyserver.onrender.com/api/job-applications/"
        ).catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch(
          "https://alrasheedacademyserver.onrender.com/api/volunteer-applications/"
        ).catch(() => ({ ok: false, json: () => ({}) })),
        fetch(
          "https://alrasheedacademyserver.onrender.com/api/surveys/staff"
        ).catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch(
          "https://alrasheedacademyserver.onrender.com/api/surveys/parent"
        ).catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch(
          "https://alrasheedacademyserver.onrender.com/api/surveys/student"
        ).catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch("https://alrasheedacademyserver.onrender.com/api/contact/").catch(
          () => ({
            ok: false,
            json: () => ({}),
          })
        ),
      ]);

      const [
        enrollmentsData,
        reenrollmentsData,
        jobAppsData,
        volunteerAppsData,
        staffSurveysData,
        parentSurveysData,
        studentSurveysData,
        contactFormsData,
      ] = await Promise.all([
        enrollmentsRes.ok ? enrollmentsRes.json() : { registrations: [] },
        reenrollmentsRes.ok ? reenrollmentsRes.json() : { forms: [] },
        jobAppsRes.ok ? jobAppsRes.json() : { applications: [] },
        volunteerAppsRes.ok ? volunteerAppsRes.json() : { applications: [] },
        staffSurveysRes.ok ? staffSurveysRes.json() : { surveys: [] },
        parentSurveysRes.ok ? parentSurveysRes.json() : { surveys: [] },
        studentSurveysRes.ok ? studentSurveysRes.json() : { surveys: [] },
        contactFormsRes.ok ? contactFormsRes.json() : [],
      ]);

      // Calculate stats
      const stats = {
        totalEnrollments: enrollmentsData.registrations?.length || 0,
        totalReenrollments: reenrollmentsData.forms?.length || 0,
        totalJobApplications: Array.isArray(jobAppsData.applications)
          ? jobAppsData.applications.length
          : 0,
        totalVolunteerApplications: Array.isArray(
          volunteerAppsData.applications
        )
          ? volunteerAppsData.applications.length
          : 0,
        totalStaffSurveys: Array.isArray(staffSurveysData.surveys)
          ? staffSurveysData.surveys.length
          : 0,
        totalParentSurveys: Array.isArray(parentSurveysData.surveys)
          ? parentSurveysData.surveys.length
          : 0,
        totalStudentSurveys: Array.isArray(studentSurveysData.surveys)
          ? studentSurveysData.surveys.length
          : 0,
        totalContactForms: Array.isArray(contactFormsData)
          ? contactFormsData.length
          : 0,
        pendingEnrollments:
          enrollmentsData.registrations?.filter(
            (f) => f.status === "pending" || f.status === "Pending"
          ).length || 0,
        pendingReenrollments:
          reenrollmentsData.forms?.filter(
            (f) => f.currentStep === 0 || f.status === "Pending"
          ).length || 0,
        pendingJobApplications: Array.isArray(jobAppsData.applications)
          ? jobAppsData.applications.filter(
              (app) => app.status === "pending" || app.status === "Pending"
            ).length
          : 0,
        pendingVolunteerApplications: Array.isArray(
          volunteerAppsData.applications
        )
          ? volunteerAppsData.applications.filter(
              (app) => app.status === "pending" || app.status === "Pending"
            ).length
          : 0,
      };

      // Generate recent activities from all data sources
      const activities = [];

      // Add enrollment activities
      enrollmentsData.registrations?.slice(0, 3).forEach((form) => {
        activities.push({
          icon: Users,
          title: "New enrollment application",
          desc: `${form.childFirstName} ${form.childLastName} - ${form.gradeLevel}`,
          time: new Date(form.submittedAt).toLocaleDateString(),
          color: "blue",
          type: "enrollment",
          id: form._id,
        });
      });

      // Add reenrollment activities
      reenrollmentsData.forms?.slice(0, 3).forEach((form) => {
        activities.push({
          icon: Users,
          title: "Re-enrollment application",
          desc: `${form.childFirstName} ${form.childLastName} - ${form.gradeLevel}`,
          time: new Date(form.submittedAt).toLocaleDateString(),
          color: "green",
          type: "reenrollment",
          id: form._id,
        });
      });

      // Add job application activities
      if (Array.isArray(jobAppsData.applications)) {
        jobAppsData.applications.slice(0, 2).forEach((app) => {
          activities.push({
            icon: FileText,
            title: "Job application submitted",
            desc: `${app.firstName} ${app.lastName} - ${app.position}`,
            time: app.submittedAt
              ? new Date(app.submittedAt).toLocaleDateString()
              : "Recent",
            color: "purple",
            type: "job",
            id: app._id,
          });
        });
      }

      // Add volunteer application activities
      if (Array.isArray(volunteerAppsData.applications)) {
        volunteerAppsData.applications.slice(0, 2).forEach((app) => {
          activities.push({
            icon: Heart,
            title: "Volunteer application submitted",
            desc: `${app.firstName} ${app.lastName} - ${app.position}`,
            time: app.submittedAt
              ? new Date(app.submittedAt).toLocaleDateString()
              : "Recent",
            color: "pink",
            type: "volunteer",
            id: app._id,
          });
        });
      }

      // Add survey activities
      if (Array.isArray(staffSurveysData.surveys)) {
        staffSurveysData.surveys.slice(0, 1).forEach((survey) => {
          activities.push({
            icon: BarChart3,
            title: "Staff survey submitted",
            desc: `Staff feedback received`,
            time: survey.submittedAt
              ? new Date(survey.submittedAt).toLocaleDateString()
              : "Recent",
            color: "indigo",
            type: "staff-survey",
            id: survey._id,
          });
        });
      }

      if (Array.isArray(parentSurveysData.surveys)) {
        parentSurveysData.surveys.slice(0, 1).forEach((survey) => {
          activities.push({
            icon: BarChart3,
            title: "Parent survey submitted",
            desc: `Parent feedback received`,
            time: survey.submittedAt
              ? new Date(survey.submittedAt).toLocaleDateString()
              : "Recent",
            color: "teal",
            type: "parent-survey",
            id: survey._id,
          });
        });
      }

      if (Array.isArray(studentSurveysData.surveys)) {
        studentSurveysData.surveys.slice(0, 1).forEach((survey) => {
          activities.push({
            icon: BarChart3,
            title: "Student survey submitted",
            desc: `Student feedback received`,
            time: survey.submittedAt
              ? new Date(survey.submittedAt).toLocaleDateString()
              : "Recent",
            color: "cyan",
            type: "student-survey",
            id: survey._id,
          });
        });
      }

      // Add contact form activities
      if (Array.isArray(contactFormsData)) {
        contactFormsData.slice(0, 2).forEach((form) => {
          activities.push({
            icon: MapPin,
            title: "Contact form submitted",
            desc: `${form.name} - ${form.subject}`,
            time: form.createdAt
              ? new Date(form.createdAt).toLocaleDateString()
              : "Recent",
            color: "orange",
            type: "contact",
            id: form._id,
          });
        });
      }

      // Sort activities by time (most recent first) and take top 8
      activities.sort((a, b) => new Date(b.time) - new Date(a.time));
      const recentActivities = activities.slice(0, 8);

      setDashboardData({
        stats,
        recentActivities,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDashboardData((prev) => ({ ...prev, loading: false }));
    }
  };
  const getPageTitle = () => {
    if (selected === "New Enrollment") return "New Enrollment";
    if (selected === "Re-Enrollment") return "Re-Enrollment";
    if (selected === "Job Application") return "Job Applications";
    if (selected === "Volunteer Application") return "Volunteer Applications";
    if (selected === "Staff Surveys") return "Staff Surveys";
    if (selected === "Parent Surveys") return "Parent Surveys";
    if (selected === "Student Surveys") return "Student Surveys";
    if (selected === "CMS Management") return "Contact Page CMS";
    if (selected === "Ticker CMS") return "Ticker Management";
    if (selected === "Navbar CMS") return "Navbar Management";
    if (selected === "Mission & Vision") return "Mission & Vision CMS";
    if (selected === "Principal Message") return "Principal Message CMS";
    if (selected === "Team") return "Team / Board Members CMS";
    if (selected === "Administration") return "Administration CMS";
    if (selected === "K3 Faculty") return "K-3 Section Faculty CMS";
    if (selected === "Boys Faculty") return "Boys Section Faculty CMS";
    if (selected === "Girls Faculty") return "Girls Section Faculty CMS";
    if (selected === "Hero CMS") return "Hero CMS";
    if (selected === "About Us CMS") return "About Us CMS";
    if (selected === "Affiliations CMS") return "Affiliations CMS";
    if (selected === "Character Cards CMS") return "Character Cards CMS";
    if (selected === "Bento Grid CMS") return "Bento Grid CMS";
    if (selected === "Contact Forms") return "Contact Form Submissions";
    if (selected === "Calendar") return "School Calendar";
    if (selected === "Gallery") return "Gallery Management";
    if (selected.startsWith("enrollment-detail-")) return "Enrollment Details";
    if (selected.startsWith("re-enrollment-detail-"))
      return "Re-Enrollment Details";
    if (selected.startsWith("job-application-detail-"))
      return "Job Application Details";
    if (selected.startsWith("volunteer-application-detail-"))
      return "Volunteer Application Details";
    if (selected.startsWith("staff-survey-detail-"))
      return "Staff Survey Details";
    if (selected.startsWith("parent-survey-detail-"))
      return "Parent Survey Details";
    if (selected.startsWith("student-survey-detail-"))
      return "Student Survey Details";
    if (selected.startsWith("contact-form-detail-"))
      return "Contact Form Details";
    if (selected === "Dress Code CMS") return "Dress Code CMS";
    if (selected === "Bus Policy CMS") return "Bus Policy CMS";
    if (selected === "Supply List CMS") return "Supply List CMS";
    if (selected === "College Preparatory CMS")
      return "College Preparatory CMS";
    if (selected === "Islamic Studies CMS") return "Islamic Studies CMS";
    if (selected === "Curricular CMS") return "Curricular CMS";
    return "Dashboard";
  };

  const getPageDescription = () => {
    if (selected === "New Enrollment")
      return "Manage student enrollment applications";
    if (selected === "Re-Enrollment")
      return "Manage student re-enrollment applications";
    if (selected === "Job Application") return "Manage job applications";
    if (selected === "Volunteer Application")
      return "Manage volunteer applications";
    if (selected === "Staff Surveys")
      return "View and manage staff survey responses";
    if (selected === "Parent Surveys")
      return "View and manage parent survey responses";
    if (selected === "Student Surveys")
      return "View and manage student survey responses";
    if (selected === "CMS Management")
      return "Edit contact page content and information";
    if (selected === "Ticker CMS")
      return "Edit ticker news content and settings";
    if (selected === "Navbar CMS")
      return "Edit navigation menu items and their routes";
    if (selected === "Mission & Vision")
      return "Edit mission and vision page content and information";
    if (selected === "Principal Message")
      return "Edit principal message page content and information";
    if (selected === "Team")
      return "Edit team / board members page content and information";
    if (selected === "Administration")
      return "Edit administration page content and information";
    if (selected === "K3 Faculty")
      return "Edit K-3 section faculty page content and information";
    if (selected === "Boys Faculty")
      return "Edit boys section faculty page content and information";
    if (selected === "Girls Faculty")
      return "Edit girls section faculty page content and information";
    if (selected === "Hero CMS")
      return "Edit hero section content and information";
    if (selected === "About Us CMS")
      return "Edit about us page content and information";
    if (selected === "Trusted Brands CMS")
      return "Edit trusted brands and accreditations content and information";
    if (selected === "Affiliations CMS")
      return "Edit affiliations and logos content and information";
    if (selected === "Character Cards CMS")
      return "Edit character cards section content and information";
    if (selected === "Bento Grid CMS")
      return "Edit bento grid section content and information";
    if (selected === "Footer CMS")
      return "Edit footer section content and information";
    if (selected === "Footer CMS")
      return "Edit footer section content and information";
    if (selected === "Contact Forms")
      return "View and manage contact form submissions";
    if (selected === "Calendar") return "Manage school events and schedule";
    if (selected === "Gallery") return "Upload and manage gallery images";
    if (
      selected.startsWith("enrollment-detail-") ||
      selected.startsWith("re-enrollment-detail-") ||
      selected.startsWith("job-application-detail-") ||
      selected.startsWith("volunteer-application-detail-") ||
      selected.startsWith("staff-survey-detail-") ||
      selected.startsWith("parent-survey-detail-") ||
      selected.startsWith("student-survey-detail-") ||
      selected.startsWith("contact-form-detail-")
    )
      return "View detailed information";
    if (selected === "Dress Code CMS")
      return "Edit dress code page content and information";
    if (selected === "Bus Policy CMS")
      return "Edit bus policy page content and information";
    if (selected === "Supply List CMS")
      return "Edit supply list page content and information";
    if (selected === "College Preparatory CMS")
      return "Edit college preparatory page content and information";
    if (selected === "Islamic Studies CMS")
      return "Edit islamic studies page slides and content";
    if (selected === "Curricular CMS")
      return "Edit curriculum page sections and content";
    return "Welcome back to your dashboard";
  };

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden mt-16 lg:mt-0">
      <div className="h-full flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1 line-clamp-1">
                {getPageDescription()}
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="relative notification-dropdown-container">
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      showDropdown: !prev.showDropdown,
                    }))
                  }
                  className="relative p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors h-8 w-8 md:h-9 md:w-9 flex items-center justify-center"
                >
                  <Bell className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  {notifications.count > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {notifications.count > 99 ? "99+" : notifications.count}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifications.showDropdown && (
                  <div className="absolute top-full right-0 mt-1 md:mt-2 w-80 max-w-[calc(100vw-16px)] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
                    <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Notifications
                        </h3>
                        {notifications.count > 0 && (
                          <button
                            onClick={() =>
                              setNotifications((prev) => ({
                                ...prev,
                                count: 0,
                                items: [],
                              }))
                            }
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.items.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No new notifications</p>
                        </div>
                      ) : (
                        notifications.items.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => {
                              // Navigate to the appropriate section based on notification type
                              const navigationMap = {
                                enrollment: `enrollment-detail-${notification.actionId}`,
                                "re-enrollment": `re-enrollment-detail-${notification.actionId}`,
                                "job-application": `job-application-detail-${notification.actionId}`,
                                "volunteer-application": `volunteer-application-detail-${notification.actionId}`,
                                "staff-survey": `staff-survey-detail-${notification.actionId}`,
                                "parent-survey": `parent-survey-detail-${notification.actionId}`,
                                "student-survey": `student-survey-detail-${notification.actionId}`,
                                "contact-form": `contact-form-detail-${notification.actionId}`,
                              };
                              const target =
                                navigationMap[notification.type] || "Dashboard";
                              setSelected(target);
                              setNotifications((prev) => ({
                                ...prev,
                                showDropdown: false,
                              }));
                            }}
                            className="p-2 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          >
                            <div className="flex items-start gap-2 md:gap-3">
                              <div
                                className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${
                                  notification.type === "enrollment"
                                    ? "bg-blue-50 dark:bg-blue-900/20"
                                    : notification.type === "re-enrollment"
                                    ? "bg-green-50 dark:bg-green-900/20"
                                    : notification.type === "job-application"
                                    ? "bg-purple-50 dark:bg-purple-900/20"
                                    : notification.type ===
                                      "volunteer-application"
                                    ? "bg-pink-50 dark:bg-pink-900/20"
                                    : notification.type.includes("survey")
                                    ? "bg-indigo-50 dark:bg-indigo-900/20"
                                    : "bg-orange-50 dark:bg-orange-900/20"
                                }`}
                              >
                                {notification.type === "enrollment" ||
                                notification.type === "re-enrollment" ? (
                                  <Users
                                    className={`h-3 md:h-4 w-3 md:w-4 ${
                                      notification.type === "enrollment"
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-green-600 dark:text-green-400"
                                    }`}
                                  />
                                ) : notification.type.includes(
                                    "application"
                                  ) ? (
                                  <FileText
                                    className={`h-3 md:h-4 w-3 md:w-4 ${
                                      notification.type === "job-application"
                                        ? "text-purple-600 dark:text-purple-400"
                                        : "text-pink-600 dark:text-pink-400"
                                    }`}
                                  />
                                ) : notification.type.includes("survey") ? (
                                  <BarChart3 className="h-3 md:h-4 w-3 md:w-4 text-indigo-600 dark:text-indigo-400" />
                                ) : (
                                  <MapPin className="h-3 md:h-4 w-3 md:w-4 text-orange-600 dark:text-orange-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {notification.description}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                  {new Date(notification.time).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Dark mode button and Profile removed per UI change - replaced by Log out in sidebar */}
            </div>
          </div>
        </header>

        {/* Content */}
        <div key={selected} className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 md:p-8 lg:p-6 w-full">
            {selected === "New Enrollment" && (
              <EnrollmentTable setSelected={setSelected} />
            )}
            {selected === "Re-Enrollment" && (
              <ReEnrollmentTable setSelected={setSelected} />
            )}
            {selected === "Job Application" && (
              <JobApplicationTable setSelected={setSelected} />
            )}
            {selected === "Volunteer Application" && (
              <VolunteerApplicationTable setSelected={setSelected} />
            )}
            {selected === "Staff Surveys" && (
              <StaffSurveyTable setSelected={setSelected} />
            )}
            {selected === "Parent Surveys" && (
              <ParentSurveyTable setSelected={setSelected} />
            )}
            {selected === "Student Surveys" && (
              <StudentSurveyTable setSelected={setSelected} />
            )}
            {selected === "CMS Management" && (
              <CMSManagement setSelected={setSelected} />
            )}
            {selected === "Ticker CMS" && (
              <TickerCMS setSelected={setSelected} />
            )}
            {selected === "Navbar CMS" && (
              <NavbarCMS setSelected={setSelected} />
            )}
            {selected === "Mission & Vision" && (
              <MissionVisionCMS setSelected={setSelected} />
            )}
            {selected === "Principal Message" && (
              <PrincipalMessageCMS setSelected={setSelected} />
            )}
            {selected === "Team" && <TeamCMS setSelected={setSelected} />}
            {selected === "Administration" && (
              <AdministrationCMS setSelected={setSelected} />
            )}
            {selected === "K3 Faculty" && (
              <K3FacultyCMS setSelected={setSelected} />
            )}
            {selected === "Boys Faculty" && (
              <BoysFacultyCMS setSelected={setSelected} />
            )}
            {selected === "Girls Faculty" && (
              <GirlsFacultyCMS setSelected={setSelected} />
            )}
            {selected === "Hero CMS" && <HeroCMS setSelected={setSelected} />}
            {selected === "About Us CMS" && (
              <AboutUsCMS setSelected={setSelected} />
            )}
            {selected === "Trusted Brands CMS" && (
              <TrustedBrandsCMS setSelected={setSelected} />
            )}
            {selected === "Affiliations CMS" && (
              <AffiliationsCMS setSelected={setSelected} />
            )}
            {selected === "Character Cards CMS" && (
              <CharacterCardsCMS setSelected={setSelected} />
            )}
            {selected === "Bento Grid CMS" && (
              <BentoGridCMS setSelected={setSelected} />
            )}
            {selected === "Footer CMS" && (
              <FooterCMS setSelected={setSelected} />
            )}
            {selected === "Dress Code CMS" && (
              <DressCodeCMS setSelected={setSelected} />
            )}
            {selected === "Bus Policy CMS" && (
              <BusPolicyCMS setSelected={setSelected} />
            )}
            {selected === "Supply List CMS" && (
              <SupplyListCMS setSelected={setSelected} />
            )}
            {selected === "College Preparatory CMS" && (
              <CollegePreparatoryCMS setSelected={setSelected} />
            )}
            {selected === "Islamic Studies CMS" && (
              <IslamicStudiesCMS setSelected={setSelected} />
            )}
            {selected === "Curricular CMS" && (
              <CurricularCMS setSelected={setSelected} />
            )}
            {selected === "Contact Forms" && (
              <ContactFormsTable setSelected={setSelected} />
            )}
            {selected.startsWith("enrollment-detail-") && (
              <EnrollmentDetailView
                enrollmentId={selected.split("-")[2]}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("reenrollment-detail-") && (
              <ReEnrollmentDetailView
                enrollmentId={selected.split("-")[2]}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("job-application-detail-") && (
              <JobApplicationDetailView
                applicationId={selected}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("volunteer-application-detail-") && (
              <VolunteerApplicationDetailView
                applicationId={selected}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("staff-survey-detail-") && (
              <StaffSurveyDetailView
                surveyId={selected}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("parent-survey-detail-") && (
              <ParentSurveyDetailView
                surveyId={selected}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("student-survey-detail-") && (
              <StudentSurveyDetailView
                surveyId={selected}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("contact-form-detail-") && (
              <ContactFormDetailView
                formId={selected.split("-")[3]}
                setSelected={setSelected}
              />
            )}
            {selected === "Calendar" && (
              <CalendarView setSelected={setSelected} />
            )}
            {selected === "Gallery" && (
              <GalleryManagement setSelected={setSelected} />
            )}
            {selected === "Dashboard" && (
              <div className="space-y-6">
                {dashboardData.loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      Loading dashboard data...
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      <button
                        onClick={() => setSelected("New Enrollment")}
                        className="p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Users className="h-4 md:h-5 w-4 md:w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <TrendingUp className="h-3 md:h-4 w-3 md:w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-sm">
                          Total Enrollments
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalEnrollments}
                        </p>
                        <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 mt-1">
                          {dashboardData.stats.pendingEnrollments} pending
                        </p>
                      </button>

                      <button
                        onClick={() => setSelected("Re-Enrollment")}
                        className="p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <Users className="h-4 md:h-5 w-4 md:w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <TrendingUp className="h-3 md:h-4 w-3 md:w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-sm">
                          Re-Enrollments
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalReenrollments}
                        </p>
                        <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 mt-1">
                          {dashboardData.stats.pendingReenrollments} pending
                        </p>
                      </button>

                      <button
                        onClick={() => setSelected("Job Application")}
                        className="p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <FileText className="h-4 md:h-5 w-4 md:w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <TrendingUp className="h-3 md:h-4 w-3 md:w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-sm">
                          Job Applications
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalJobApplications}
                        </p>
                        <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 mt-1">
                          {dashboardData.stats.pendingJobApplications} pending
                        </p>
                      </button>

                      <button
                        onClick={() => setSelected("Contact Forms")}
                        className="p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <MapPin className="h-4 md:h-5 w-4 md:w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <TrendingUp className="h-3 md:h-4 w-3 md:w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1 text-sm">
                          Contact Forms
                        </h3>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalContactForms}
                        </p>
                        <p className="text-xs md:text-sm text-green-600 dark:text-green-400 mt-1">
                          All inquiries
                        </p>
                      </button>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                      {/* Recent Activity */}
                      <div className="lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                              Recent Activity
                            </h3>
                            <button className="text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                              View all
                            </button>
                          </div>
                          <div className="space-y-4">
                            {dashboardData.recentActivities.length > 0 ? (
                              dashboardData.recentActivities.map(
                                (activity, i) => {
                                  const getNavigationTarget = (type, id) => {
                                    if (id) {
                                      switch (type) {
                                        case "enrollment":
                                          return `enrollment-detail-${id}`;
                                        case "reenrollment":
                                          return `re-enrollment-detail-${id}`;
                                        case "job":
                                          return `job-application-detail-${id}`;
                                        case "volunteer":
                                          return `volunteer-application-detail-${id}`;
                                        case "staff-survey":
                                          return `staff-survey-detail-${id}`;
                                        case "parent-survey":
                                          return `parent-survey-detail-${id}`;
                                        case "student-survey":
                                          return `student-survey-detail-${id}`;
                                        case "contact":
                                          return `contact-form-detail-${id}`;
                                      }
                                    }
                                    switch (type) {
                                      case "enrollment":
                                        return "New Enrollment";
                                      case "reenrollment":
                                        return "Re-Enrollment";
                                      case "job":
                                        return "Job Application";
                                      case "volunteer":
                                        return "Volunteer Application";
                                      case "staff-survey":
                                        return "Staff Surveys";
                                      case "parent-survey":
                                        return "Parent Surveys";
                                      case "student-survey":
                                        return "Student Surveys";
                                      case "contact":
                                        return "Contact Forms";
                                      default:
                                        return "Dashboard";
                                    }
                                  };

                                  return (
                                    <div
                                      key={i}
                                      onClick={() =>
                                        setSelected(
                                          getNavigationTarget(
                                            activity.type,
                                            activity.id
                                          )
                                        )
                                      }
                                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                    >
                                      <div
                                        className={`p-2 rounded-lg ${
                                          activity.color === "green"
                                            ? "bg-green-50 dark:bg-green-900/20"
                                            : activity.color === "blue"
                                            ? "bg-blue-50 dark:bg-blue-900/20"
                                            : activity.color === "purple"
                                            ? "bg-purple-50 dark:bg-purple-900/20"
                                            : activity.color === "orange"
                                            ? "bg-orange-50 dark:bg-orange-900/20"
                                            : "bg-red-50 dark:bg-red-900/20"
                                        }`}
                                      >
                                        <activity.icon
                                          className={`h-4 w-4 ${
                                            activity.color === "green"
                                              ? "text-green-600 dark:text-green-400"
                                              : activity.color === "blue"
                                              ? "text-blue-600 dark:text-blue-400"
                                              : activity.color === "purple"
                                              ? "text-purple-600 dark:text-purple-400"
                                              : activity.color === "orange"
                                              ? "text-orange-600 dark:text-orange-400"
                                              : "text-red-600 dark:text-red-400"
                                          }`}
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                          {activity.title}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                          {activity.desc}
                                        </p>
                                      </div>
                                      <div className="text-xs text-gray-400 dark:text-gray-500">
                                        {activity.time}
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <p>No recent activity</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Application Overview
                          </h3>
                          <div className="space-y-4">
                            <button
                              onClick={() =>
                                setSelected("Volunteer Application")
                              }
                              className="w-full flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-pointer"
                            >
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Volunteer Apps
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {dashboardData.stats.totalVolunteerApplications}
                              </span>
                            </button>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width:
                                    dashboardData.stats
                                      .totalVolunteerApplications > 0
                                      ? `${Math.min(
                                          (dashboardData.stats
                                            .pendingVolunteerApplications /
                                            dashboardData.stats
                                              .totalVolunteerApplications) *
                                            100,
                                          100
                                        )}%`
                                      : "0%",
                                }}
                              ></div>
                            </div>

                            <button
                              onClick={() => setSelected("Staff Surveys")}
                              className="w-full flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-pointer"
                            >
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Staff Surveys
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {dashboardData.stats.totalStaffSurveys}
                              </span>
                            </button>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: "75%" }}
                              ></div>
                            </div>

                            <button
                              onClick={() => setSelected("Parent Surveys")}
                              className="w-full flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-pointer"
                            >
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Parent Surveys
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {dashboardData.stats.totalParentSurveys}
                              </span>
                            </button>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: "60%" }}
                              ></div>
                            </div>

                            <button
                              onClick={() => setSelected("Student Surveys")}
                              className="w-full flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors cursor-pointer"
                            >
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Student Surveys
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {dashboardData.stats.totalStudentSurveys}
                              </span>
                            </button>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: "85%" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            System Status
                          </h3>
                          <div className="space-y-3">
                            {[
                              {
                                label: "Enrollment System",
                                status: "Active",
                                color: "green",
                              },
                              {
                                label: "Survey System",
                                status: "Active",
                                color: "green",
                              },
                              {
                                label: "Contact Forms",
                                status: "Active",
                                color: "green",
                              },
                              {
                                label: "Gallery",
                                status: "Active",
                                color: "green",
                              },
                              {
                                label: "Calendar",
                                status: "Active",
                                color: "green",
                              },
                            ].map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between py-2"
                              >
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.label}
                                </span>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      item.color === "green"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                  ></div>
                                  <span
                                    className={`text-sm font-medium ${
                                      item.color === "green"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const NavbarCMS = ({ setSelected }) => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState({
    show: false,
    type: null, // 'nav', 'dropdown', 'nested'
    indices: null, // { navIndex, dropIndex, nestedIndex }
    action: null, // 'deactivate' or 'activate'
    itemName: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    type: null, // 'nav', 'dropdown', 'nested'
    indices: null, // { navIndex, dropIndex, nestedIndex }
    itemName: "",
    confirmationCode: "",
    userInput: "",
  });
  const [contentEditor, setContentEditor] = useState({
    show: false,
    navIndex: null,
    dropIndex: null,
    content: "",
    title: "",
    images: [],
    activeTab: "edit", // 'edit' or 'preview'
  });

  useEffect(() => {
    fetchNavbarData();
  }, []);

  const fetchNavbarData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/navbar",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNavbarItems(data);
      } else {
        toast.error("Failed to fetch navbar data");
      }
    } catch (err) {
      console.error("Failed to fetch navbar data", err);
      toast.error("Failed to fetch navbar data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/navbar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ items: navbarItems }),
        }
      );
      if (response.ok) {
        toast.success("Navbar updated successfully!");
      } else {
        toast.error("Failed to update navbar");
      }
    } catch (err) {
      console.error("Error updating navbar", err);
      toast.error("Error updating navbar");
    } finally {
      setSaving(false);
    }
  };

  const addNavItem = () => {
    setNavbarItems([
      ...navbarItems,
      {
        name: "",
        url: "",
        icon: "Home",
        isActive: true,
        dropdown: [],
      },
    ]);
  };

  const updateNavItem = (index, field, value) => {
    const updated = [...navbarItems];
    updated[index][field] = value;
    setNavbarItems(updated);
  };

  const toggleNavItem = (index) => {
    const item = navbarItems[index];
    setConfirmationDialog({
      show: true,
      type: item.isActive ? "deactivate" : "activate",
      indices: [index],
      action: "navItem",
      itemName: item.name || `Menu Item ${index + 1}`,
    });
  };

  const toggleDropdownItem = (navIndex, dropIndex) => {
    const item = navbarItems[navIndex].dropdown[dropIndex];
    setConfirmationDialog({
      show: true,
      type: item.isActive ? "deactivate" : "activate",
      indices: [navIndex, dropIndex],
      action: "dropdownItem",
      itemName: item.name || `Dropdown Item ${dropIndex + 1}`,
    });
  };

  const toggleNestedDropdownItem = (navIndex, dropIndex, nestedIndex) => {
    const item =
      navbarItems[navIndex].dropdown[dropIndex].dropdown[nestedIndex];
    setConfirmationDialog({
      show: true,
      type: item.isActive ? "deactivate" : "activate",
      indices: [navIndex, dropIndex, nestedIndex],
      action: "nestedItem",
      itemName: item.name || `Nested Item ${nestedIndex + 1}`,
    });
  };

  const confirmToggle = () => {
    const { action, indices } = confirmationDialog;
    if (action === "navItem") {
      const [index] = indices;
      const updated = [...navbarItems];
      updated[index].isActive = !updated[index].isActive;
      setNavbarItems(updated);
    } else if (action === "dropdownItem") {
      const [navIndex, dropIndex] = indices;
      const updated = [...navbarItems];
      updated[navIndex].dropdown[dropIndex].isActive =
        !updated[navIndex].dropdown[dropIndex].isActive;
      setNavbarItems(updated);
    } else if (action === "nestedItem") {
      const [navIndex, dropIndex, nestedIndex] = indices;
      const updated = [...navbarItems];
      updated[navIndex].dropdown[dropIndex].dropdown[nestedIndex].isActive =
        !updated[navIndex].dropdown[dropIndex].dropdown[nestedIndex].isActive;
      setNavbarItems(updated);
    }
    setConfirmationDialog({
      show: false,
      type: "",
      indices: [],
      action: "",
      itemName: "",
    });
  };

  const cancelToggle = () => {
    setConfirmationDialog({
      show: false,
      type: "",
      indices: [],
      action: "",
      itemName: "",
    });
  };

  const addDropdownItem = (navIndex) => {
    const updated = [...navbarItems];
    if (!updated[navIndex].dropdown) {
      updated[navIndex].dropdown = [];
    }
    updated[navIndex].dropdown.push({
      name: "",
      url: "",
      isActive: true,
      dropdown: [],
    });
    setNavbarItems(updated);
  };

  const updateDropdownItem = (navIndex, dropIndex, field, value) => {
    const updated = [...navbarItems];
    updated[navIndex].dropdown[dropIndex][field] = value;
    setNavbarItems(updated);
  };

  const addNestedDropdownItem = (navIndex, dropIndex) => {
    const updated = [...navbarItems];
    if (!updated[navIndex].dropdown[dropIndex].dropdown) {
      updated[navIndex].dropdown[dropIndex].dropdown = [];
    }
    updated[navIndex].dropdown[dropIndex].dropdown.push({
      name: "",
      url: "",
      isActive: true,
    });
    setNavbarItems(updated);
  };

  const updateNestedDropdownItem = (
    navIndex,
    dropIndex,
    nestedIndex,
    field,
    value
  ) => {
    const updated = [...navbarItems];
    updated[navIndex].dropdown[dropIndex].dropdown[nestedIndex][field] = value;
    setNavbarItems(updated);
  };

  const openContentEditor = (navIndex, dropIndex) => {
    const item = navbarItems[navIndex].dropdown[dropIndex];
    setContentEditor({
      show: true,
      navIndex,
      dropIndex,
      content: item.content || "",
      title: item.name || "",
      images: item.images || [],
    });
  };

  const closeContentEditor = () => {
    setContentEditor({
      show: false,
      navIndex: null,
      dropIndex: null,
      content: "",
      title: "",
      images: [],
      activeTab: "edit",
    });
  };

  const saveContent = () => {
    const updated = [...navbarItems];
    updated[contentEditor.navIndex].dropdown[contentEditor.dropIndex].content =
      contentEditor.content;
    updated[contentEditor.navIndex].dropdown[contentEditor.dropIndex].images =
      contentEditor.images;
    setNavbarItems(updated);
    closeContentEditor();
    toast.success("Content saved successfully!");
  };

  const addImage = () => {
    setContentEditor((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const updateImage = (index, url) => {
    const updatedImages = [...contentEditor.images];
    updatedImages[index] = url;
    setContentEditor((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const removeImage = (index) => {
    const updatedImages = contentEditor.images.filter((_, i) => i !== index);
    setContentEditor((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  // Generate random confirmation code (4 uppercase letters)
  const generateConfirmationCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return code;
  };

  // Delete functions
  const deleteNavItem = (index) => {
    const item = navbarItems[index];
    const code = generateConfirmationCode();
    setDeleteConfirmation({
      show: true,
      type: "nav",
      indices: [index],
      itemName: item.name || `Menu Item ${index + 1}`,
      confirmationCode: code,
      userInput: "",
    });
  };

  const deleteDropdownItem = (navIndex, dropIndex) => {
    const item = navbarItems[navIndex].dropdown[dropIndex];
    const code = generateConfirmationCode();
    setDeleteConfirmation({
      show: true,
      type: "dropdown",
      indices: [navIndex, dropIndex],
      itemName: item.name || `Dropdown Item ${dropIndex + 1}`,
      confirmationCode: code,
      userInput: "",
    });
  };

  const deleteNestedItem = (navIndex, dropIndex, nestedIndex) => {
    const item =
      navbarItems[navIndex].dropdown[dropIndex].dropdown[nestedIndex];
    const code = generateConfirmationCode();
    setDeleteConfirmation({
      show: true,
      type: "nested",
      indices: [navIndex, dropIndex, nestedIndex],
      itemName: item.name || `Nested Item ${nestedIndex + 1}`,
      confirmationCode: code,
      userInput: "",
    });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.userInput !== deleteConfirmation.confirmationCode) {
      toast.error("Confirmation code does not match!");
      return;
    }

    const { type, indices } = deleteConfirmation;
    if (type === "nav") {
      const [index] = indices;
      const updated = navbarItems.filter((_, i) => i !== index);
      setNavbarItems(updated);
      toast.success("Menu item deleted successfully!");
    } else if (type === "dropdown") {
      const [navIndex, dropIndex] = indices;
      const updated = [...navbarItems];
      updated[navIndex].dropdown = updated[navIndex].dropdown.filter(
        (_, i) => i !== dropIndex
      );
      setNavbarItems(updated);
      toast.success("Dropdown item deleted successfully!");
    } else if (type === "nested") {
      const [navIndex, dropIndex, nestedIndex] = indices;
      const updated = [...navbarItems];
      updated[navIndex].dropdown[dropIndex].dropdown = updated[
        navIndex
      ].dropdown[dropIndex].dropdown.filter((_, i) => i !== nestedIndex);
      setNavbarItems(updated);
      toast.success("Nested item deleted successfully!");
    }

    setDeleteConfirmation({
      show: false,
      type: null,
      indices: null,
      itemName: "",
      confirmationCode: "",
      userInput: "",
    });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({
      show: false,
      type: null,
      indices: null,
      itemName: "",
      confirmationCode: "",
      userInput: "",
    });
  };

  // Quill editor modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading navbar data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Navbar Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
            Edit navigation menu items and their routes
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
          <Button
            onClick={addNavItem}
            variant="outline"
            className="text-xs md:text-base w-full sm:w-auto"
          >
            <Plus className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
            Add Menu Item
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-base w-full sm:w-auto"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        {navbarItems.map((item, navIndex) => (
          <div
            key={navIndex}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Menu Item {navIndex + 1}
                </h3>
                <span
                  className={`px-2 py-0.5 md:py-1 text-xs font-medium rounded-full ${
                    item.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                <Button
                  onClick={() => toggleNavItem(navIndex)}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 md:h-9 md:w-9 p-0 ${
                    item.isActive
                      ? "text-red-600 hover:text-red-700"
                      : "text-green-600 hover:text-green-700"
                  }`}
                >
                  {item.isActive ? (
                    <EyeOff className="h-3 md:h-4 w-3 md:w-4" />
                  ) : (
                    <Eye className="h-3 md:h-4 w-3 md:w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => deleteNavItem(navIndex)}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 md:h-9 md:w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Name
                </label>
                <Input
                  value={item.name}
                  onChange={(e) =>
                    updateNavItem(navIndex, "name", e.target.value)
                  }
                  placeholder="Menu name"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  URL
                </label>
                <Input
                  value={item.url}
                  onChange={(e) =>
                    updateNavItem(navIndex, "url", e.target.value)
                  }
                  placeholder="/page-url"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Icon
                </label>
                <Input
                  value={item.icon}
                  onChange={(e) =>
                    updateNavItem(navIndex, "icon", e.target.value)
                  }
                  placeholder="Home"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs md:text-base"
                />
              </div>
            </div>

            {/* Dropdown Items */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-3 md:pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 md:mb-4">
                <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100">
                  Dropdown Items
                </h4>
                <Button
                  onClick={() => addDropdownItem(navIndex)}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto text-xs md:text-base"
                >
                  <Plus className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                  Add Dropdown
                </Button>
              </div>

              <div className="space-y-2 md:space-y-3">
                {item.dropdown?.map((dropItem, dropIndex) => (
                  <div
                    key={dropIndex}
                    className="p-2 md:p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className="flex items-center gap-1 md:gap-2">
                        <h5 className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">
                          Dropdown Item {dropIndex + 1}
                        </h5>
                        <span
                          className={`px-1.5 md:px-2 py-0.5 text-xs font-medium rounded-full ${
                            dropItem.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {dropItem.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                        <Button
                          onClick={() =>
                            toggleDropdownItem(navIndex, dropIndex)
                          }
                          variant="outline"
                          size="sm"
                          className={`h-7 w-7 md:h-8 md:w-8 p-0 ${
                            dropItem.isActive
                              ? "text-red-600 hover:text-red-700"
                              : "text-green-600 hover:text-green-700"
                          }`}
                        >
                          {dropItem.isActive ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          onClick={() =>
                            deleteDropdownItem(navIndex, dropIndex)
                          }
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 md:h-8 md:w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5 md:mb-1">
                          Name
                        </label>
                        <Input
                          value={dropItem.name}
                          onChange={(e) =>
                            updateDropdownItem(
                              navIndex,
                              dropIndex,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Dropdown name"
                          className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs md:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5 md:mb-1">
                          URL
                        </label>
                        <div className="flex gap-1 md:gap-2">
                          <Input
                            value={dropItem.url}
                            onChange={(e) =>
                              updateDropdownItem(
                                navIndex,
                                dropIndex,
                                "url",
                                e.target.value
                              )
                            }
                            placeholder="/dropdown-url"
                            className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs md:text-sm"
                          />
                          <Button
                            onClick={() =>
                              openContentEditor(navIndex, dropIndex)
                            }
                            variant="outline"
                            size="sm"
                            className="px-1.5 md:px-2 h-8 md:h-9"
                            title="Create/Edit Content"
                          >
                            <FileText className="h-3 md:h-4 w-3 md:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Nested Dropdown Items */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 md:pt-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1.5 md:mb-2">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Nested Items
                        </span>
                        <Button
                          onClick={() =>
                            addNestedDropdownItem(navIndex, dropIndex)
                          }
                          variant="outline"
                          size="sm"
                          className="text-xs w-full sm:w-auto"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>

                      <div className="space-y-1 md:space-y-2">
                        {dropItem.dropdown?.map((nestedItem, nestedIndex) => (
                          <div
                            key={nestedIndex}
                            className="flex flex-col sm:flex-row sm:items-center gap-1 md:gap-2 p-1.5 md:p-2 bg-white dark:bg-gray-700 rounded border text-xs"
                          >
                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 md:gap-2">
                              <span
                                className={`px-1.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
                                  nestedItem.isActive
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {nestedItem.isActive ? "Active" : "Inactive"}
                              </span>
                              <Input
                                value={nestedItem.name}
                                onChange={(e) =>
                                  updateNestedDropdownItem(
                                    navIndex,
                                    dropIndex,
                                    nestedIndex,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Name"
                                className="flex-1 bg-transparent border-none text-xs p-0"
                              />
                              <Input
                                value={nestedItem.url}
                                onChange={(e) =>
                                  updateNestedDropdownItem(
                                    navIndex,
                                    dropIndex,
                                    nestedIndex,
                                    "url",
                                    e.target.value
                                  )
                                }
                                placeholder="URL"
                                className="flex-1 bg-transparent border-none text-xs p-0"
                              />
                            </div>
                            <div className="flex gap-0.5 md:gap-1 flex-shrink-0">
                              <Button
                                onClick={() =>
                                  toggleNestedDropdownItem(
                                    navIndex,
                                    dropIndex,
                                    nestedIndex
                                  )
                                }
                                variant="outline"
                                size="sm"
                                className={`p-0.5 md:p-1 h-6 w-6 md:h-7 md:w-7 ${
                                  nestedItem.isActive
                                    ? "text-red-600 hover:text-red-700"
                                    : "text-green-600 hover:text-green-700"
                                }`}
                              >
                                {nestedItem.isActive ? (
                                  <EyeOff className="h-2.5 md:h-3 w-2.5 md:w-3" />
                                ) : (
                                  <Eye className="h-2.5 md:h-3 w-2.5 md:w-3" />
                                )}
                              </Button>
                              <Button
                                onClick={() =>
                                  deleteNestedItem(
                                    navIndex,
                                    dropIndex,
                                    nestedIndex
                                  )
                                }
                                variant="outline"
                                size="sm"
                                className="p-0.5 md:p-1 h-6 w-6 md:h-7 md:w-7 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-2.5 md:h-3 w-2.5 md:w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* NavBarOnly Preview Section */}
        <div className="mt-6 md:mt-8 border-t border-gray-200 dark:border-gray-800 pt-4 md:pt-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-4">
            Navbar Preview
          </h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
            How the navbar will appear to users (in light mode)
          </p>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white overflow-x-auto">
            <NavBarOnly navbarItems={navbarItems} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-2">
            This preview shows how the navbar will look to your users in light
            mode.
          </p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmationDialog.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div
                className={`p-2 rounded-full flex-shrink-0 ${
                  confirmationDialog.type === "deactivate"
                    ? "bg-red-100 dark:bg-red-900"
                    : "bg-green-100 dark:bg-green-900"
                }`}
              >
                {confirmationDialog.type === "deactivate" ? (
                  <EyeOff className="h-5 md:h-6 w-5 md:w-6 text-red-600 dark:text-red-400" />
                ) : (
                  <Eye className="h-5 md:h-6 w-5 md:w-6 text-green-600 dark:text-green-400" />
                )}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                Confirm{" "}
                {confirmationDialog.type === "deactivate"
                  ? "Deactivation"
                  : "Activation"}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
              Are you sure you want to {confirmationDialog.type} "
              {confirmationDialog.itemName}"?
              {confirmationDialog.type === "deactivate"
                ? " This will hide the item from the navbar."
                : " This will make the item visible in the navbar."}
            </p>
            <div className="flex gap-2 md:gap-3 justify-end">
              <Button
                onClick={cancelToggle}
                variant="outline"
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmToggle}
                className={`px-3 md:px-4 py-1.5 md:py-2 text-white text-xs md:text-base ${
                  confirmationDialog.type === "deactivate"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {confirmationDialog.type === "deactivate"
                  ? "Deactivate"
                  : "Activate"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 flex-shrink-0">
                <Trash2 className="h-5 md:h-6 w-5 md:w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
              Are you sure you want to delete "{deleteConfirmation.itemName}"?
              This action cannot be undone.
            </p>
            <div className="mb-3 md:mb-4">
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Type the confirmation code:{" "}
                <span className="font-mono text-base md:text-lg text-blue-600 dark:text-blue-400">
                  {deleteConfirmation.confirmationCode}
                </span>
              </label>
              <Input
                value={deleteConfirmation.userInput}
                onChange={(e) =>
                  setDeleteConfirmation((prev) => ({
                    ...prev,
                    userInput: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="Enter the code above"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-mono text-center text-xs md:text-base"
                maxLength={4}
              />
            </div>
            <div className="flex gap-2 md:gap-3 justify-end">
              <Button
                onClick={cancelDelete}
                variant="outline"
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={
                  deleteConfirmation.userInput !==
                  deleteConfirmation.confirmationCode
                }
                className="px-3 md:px-4 py-1.5 md:py-2 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-base"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content Editor Modal */}
      {contentEditor.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <style dangerouslySetInnerHTML={{ __html: quillDarkStyles }} />
          <div className="relative z-10 bg-white dark:bg-gray-900 rounded-lg p-3 md:p-6 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 md:mb-6">
              <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                Content Editor - {contentEditor.title}
              </h3>
              <button
                onClick={closeContentEditor}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0 w-6 h-6 flex items-center justify-center"
              >
                <svg
                  className="w-5 md:w-6 h-5 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3 md:space-y-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Page Title
                </label>
                <Input
                  value={contentEditor.title}
                  onChange={(e) =>
                    setContentEditor((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Enter page title"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs md:text-base"
                />
              </div>

              {/* Tabs for Edit/Preview */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-4 md:space-x-8">
                  <button
                    onClick={() =>
                      setContentEditor((prev) => ({
                        ...prev,
                        activeTab: "edit",
                      }))
                    }
                    className={`py-2 px-1 border-b-2 font-medium text-xs md:text-sm ${
                      contentEditor.activeTab === "edit"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Edit Content
                  </button>
                  <button
                    onClick={() =>
                      setContentEditor((prev) => ({
                        ...prev,
                        activeTab: "preview",
                      }))
                    }
                    className={`py-2 px-1 border-b-2 font-medium text-xs md:text-sm ${
                      contentEditor.activeTab === "preview"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Preview
                  </button>
                </nav>
              </div>

              {/* Content Editor/Preview */}
              <div>
                {contentEditor.activeTab === "edit" ? (
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                      Content (Rich Text Editor)
                    </label>
                    <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden">
                      <ReactQuill
                        value={contentEditor.content}
                        onChange={(content) =>
                          setContentEditor((prev) => ({ ...prev, content }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        theme="snow"
                        placeholder="Start writing your content here..."
                        className="min-h-[200px] md:min-h-[300px] text-xs md:text-base"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Use the toolbar above to format your text. You can add
                      headings, lists, links, and more.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                      Content Preview
                    </label>
                    <div className="bg-white border border-gray-300 rounded-md p-2 md:p-6 min-h-[300px] md:min-h-[600px] overflow-y-auto text-xs md:text-base">
                      {/* Preview Header - NavBarOnly */}
                      <div className="mb-2 md:mb-4 border-b border-gray-200 pb-2 md:pb-4">
                        <div className="text-xs text-gray-500 mb-1 md:mb-2">
                          Navigation (NavBarOnly)
                        </div>
                        <div className="bg-gray-100 rounded p-1 md:p-2 text-center text-xs md:text-sm text-gray-600">
                          NavBarOnly Component
                        </div>
                      </div>

                      {/* Preview Ticker */}
                      <div className="mb-2 md:mb-4 border-b border-gray-200 pb-2 md:pb-4">
                        <div className="text-xs text-gray-500 mb-1 md:mb-2">
                          Ticker
                        </div>
                        <div className="bg-gray-100 rounded p-1 md:p-2 text-center text-xs md:text-sm text-gray-600">
                          Ticker Component
                        </div>
                      </div>

                      {/* Preview Banner */}
                      <div className="mb-3 md:mb-6">
                        <div className="text-xs text-gray-500 mb-1 md:mb-2">
                          Banner Section
                        </div>
                        <div className="relative w-full h-24 md:h-32 flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded">
                          <div className="absolute inset-0 bg-black/30"></div>
                          <div className="relative z-10 text-center text-white px-2">
                            <h1 className="text-lg md:text-2xl font-light tracking-wide">
                              {contentEditor.title || "Page Title"}
                            </h1>
                            <p className="mt-1 md:mt-2 text-xs">
                              Home › {contentEditor.title || "Page"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Preview Content */}
                      <div className="mb-3 md:mb-6">
                        <div className="text-xs text-gray-500 mb-1 md:mb-2">
                          Page Content
                        </div>
                        <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 prose-blockquote:text-gray-600">
                          <h1 className="text-base md:text-xl font-bold mb-2 md:mb-4">
                            {contentEditor.title || "Page Title"}
                          </h1>
                          {contentEditor.content ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: contentEditor.content,
                              }}
                              className="text-xs md:text-base"
                            />
                          ) : (
                            <p className="text-gray-500 italic text-xs md:text-base">
                              No content to preview. Switch to Edit tab to add
                              content.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Preview Images */}
                      {contentEditor.images &&
                        contentEditor.images.length > 0 && (
                          <div className="mb-3 md:mb-6">
                            <div className="text-xs text-gray-500 mb-1 md:mb-2">
                              Images
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                              {contentEditor.images.map((imageUrl, index) => (
                                <div
                                  key={index}
                                  className="border border-gray-200 rounded-lg overflow-hidden"
                                >
                                  <img
                                    src={
                                      imageUrl ||
                                      "https://placehold.co/300x200/e2e8f0/64748b?text=No+Image"
                                    }
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-20 md:h-32 object-cover"
                                    onError={(e) => {
                                      e.target.src =
                                        "https://placehold.co/300x200/e2e8f0/64748b?text=Image+Error";
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Preview Footer */}
                      <div className="mt-3 md:mt-6 border-t border-gray-200 pt-2 md:pt-4">
                        <div className="text-xs text-gray-500 mb-1 md:mb-2">
                          Footer
                        </div>
                        <div className="bg-gray-100 rounded p-1 md:p-2 text-center text-xs md:text-sm text-gray-600">
                          Footer Component
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      This is how your content will appear on the actual page
                      with NavBarOnly, Ticker, Banner, and Footer components.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 md:mb-3">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Images
                  </label>
                  <Button
                    onClick={addImage}
                    variant="outline"
                    size="sm"
                    className="text-xs w-full sm:w-auto"
                  >
                    <Plus className="h-2.5 md:h-3 w-2.5 md:w-3 mr-1" />
                    Add Image
                  </Button>
                </div>
                <div className="space-y-1.5 md:space-y-3">
                  {contentEditor.images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="flex gap-1 md:gap-2 items-center"
                    >
                      <Input
                        value={imageUrl}
                        onChange={(e) => updateImage(index, e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs"
                      />
                      <Button
                        onClick={() => removeImage(index)}
                        variant="outline"
                        size="sm"
                        className="p-1 md:p-2 text-red-600 hover:text-red-700 h-8 md:h-9"
                      >
                        <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                      </Button>
                    </div>
                  ))}
                  {contentEditor.images.length === 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      No images added yet. Click "Add Image" to include images
                      in your content.
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 md:pt-4">
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <div className="flex-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <strong>Note:</strong> This content will be displayed on a
                      separate page with the NavBarOnly navbar, ticker, banner,
                      and footer components.
                    </p>
                  </div>
                  <div className="flex gap-2 md:gap-3 flex-shrink-0 w-full sm:w-auto">
                    <Button
                      onClick={closeContentEditor}
                      variant="outline"
                      className="flex-1 sm:flex-none text-xs md:text-base"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={saveContent}
                      className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-base"
                    >
                      Save Content
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CMSManagement = ({ setSelected }) => {
  const [cmsData, setCmsData] = useState({
    title: "Contact Us",
    description: "Contact the support team at Al-Rasheed Academy.",
    email: "info@alrasheedacademy.org",
    address: "3122 Abbott Rd, Orchard Park, NY 14127",
    phone1: "+1(716) 822-0440",
    phone2: "+1(716) 822-0440",
    socialHeading: "Find us online",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/sshahaider" },
      { label: "Twitter", href: "https://twitter.com/sshahaider" },
      { label: "LinkedIn", href: "https://linkedin.com/in/sshahaider" },
      { label: "Instagram", href: "https://instagram.com/sshahaider" },
    ],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCmsData();
  }, []);

  const fetchCmsData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/contact",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCmsData(data);
      }
    } catch (err) {
      console.error("Failed to fetch CMS data", err);
      toast.error("Failed to fetch CMS data");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!storedToken) {
        toast.error("You must be logged in to save changes");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/contact",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ content: cmsData }),
        }
      );
      if (response.ok) {
        toast.success("CMS updated successfully!");
      } else {
        toast.error("Failed to update CMS");
      }
    } catch (err) {
      console.error("Error updating CMS", err);
      toast.error("Error updating CMS");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setCmsData({ ...cmsData, [field]: value });
  };

  const handleSocialChange = (index, field, value) => {
    const newSocialLinks = [...cmsData.socialLinks];
    newSocialLinks[index][field] = value;
    setCmsData({ ...cmsData, socialLinks: newSocialLinks });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Contact Page CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Edit contact page content and information
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Page Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Title
                </label>
                <Input
                  value={cmsData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Contact Us"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <Input
                  value={cmsData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Contact the support team..."
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Social Links Heading
                </label>
                <Input
                  value={cmsData.socialHeading}
                  onChange={(e) =>
                    handleChange("socialHeading", e.target.value)
                  }
                  placeholder="Find us online"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  value={cmsData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="info@example.com"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <Input
                  value={cmsData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="123 Main St, City, State"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone 1
                  </label>
                  <Input
                    value={cmsData.phone1}
                    onChange={(e) => handleChange("phone1", e.target.value)}
                    placeholder="+1(123) 456-7890"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone 2
                  </label>
                  <Input
                    value={cmsData.phone2}
                    onChange={(e) => handleChange("phone2", e.target.value)}
                    placeholder="+1(123) 456-7890"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Social Links
            </h3>
            <div className="space-y-4">
              {cmsData.socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Platform
                      </label>
                      <Input
                        value={link.label}
                        onChange={(e) =>
                          handleSocialChange(index, "label", e.target.value)
                        }
                        placeholder="Platform"
                        className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        URL
                      </label>
                      <Input
                        value={link.href}
                        onChange={(e) =>
                          handleSocialChange(index, "href", e.target.value)
                        }
                        placeholder="https://..."
                        className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TickerCMS = ({ setSelected }) => {
  const [tickerData, setTickerData] = useState({
    label: "ARA News",
    content: `Accreditation Al-Rasheed Academy is the 1st Accredited School In the Buffalo Area by the COGNIA Accreditation Organization! - Good News! "Unlock Your Future: " Limited Volunteer Spots Available – Shape Your Experience by Contributing to ARA School Community Today! 🌟`,
    highlightText: "Limited Volunteer Spots Available",
    highlightLink: "/career/volunteer-application",
    enabled: true,
    scrollSpeed: 20,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickerData();
  }, []);

  const fetchTickerData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/ticker",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTickerData({ ...tickerData, ...data });
      }
    } catch (err) {
      console.error("Failed to fetch ticker data", err);
      toast.error("Failed to fetch ticker data");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!storedToken) {
        toast.error("You must be logged in to save changes");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/ticker",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ content: tickerData }),
        }
      );
      if (response.ok) {
        toast.success("Ticker updated successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to update ticker");
      }
    } catch (err) {
      console.error("Error updating ticker", err);
      toast.error("Error updating ticker");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setTickerData({ ...tickerData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Ticker Management
          </h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={tickerData.enabled}
                onChange={(e) => handleChange("enabled", e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              Enable Ticker
            </label>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticker Label
            </label>
            <Input
              value={tickerData.label}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="ARA News"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              The label displayed in the red box (e.g., "ARA News")
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticker Content
            </label>
            <textarea
              value={tickerData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Enter your news ticker content..."
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              The scrolling text content. Use quotes to highlight special
              phrases.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Highlight Text (Optional)
            </label>
            <Input
              value={tickerData.highlightText}
              onChange={(e) => handleChange("highlightText", e.target.value)}
              placeholder="Text to highlight with underline"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This text will be underlined and highlighted in the ticker
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Highlight Link URL (Optional)
            </label>
            <Input
              value={tickerData.highlightLink}
              onChange={(e) => handleChange("highlightLink", e.target.value)}
              placeholder="/career/volunteer-application"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              URL to navigate to when highlighted text is clicked (e.g.,
              /career/volunteer-application)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Scroll Speed (seconds)
            </label>
            <Input
              type="number"
              min="10"
              max="60"
              value={tickerData.scrollSpeed}
              onChange={(e) =>
                handleChange("scrollSpeed", parseInt(e.target.value) || 20)
              }
              className="w-32 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Duration for complete scroll (10-60 seconds)
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Preview
          </h3>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <div className="flex">
              <div className="bg-gradient-to-b from-red-500 to-red-600 text-white w-20 min-w-[80px] h-16 flex flex-col items-center justify-center font-bold text-xs text-center">
                <div>{tickerData.label.split(" ")[0]}</div>
                <div>{tickerData.label.split(" ")[1] || ""}</div>
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-gray-800 h-16 flex items-center px-4 overflow-hidden">
                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
                  {tickerData.content}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This is a static preview. The actual ticker will scroll
            continuously.
          </p>
        </div>
      </div>
    </div>
  );
};

const MissionVisionCMS = ({ setSelected }) => {
  const [missionVisionData, setMissionVisionData] = useState({
    // Banner Section
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "About Us",
      breadcrumb: "Home › About",
    },
    // Vision Section
    vision: {
      title: "Our vision",
      description:
        "Al-Rasheed Academy will provide each student with a Safe, Healthy, Nurturing, and Islamic learning environment facilitated by skilled, creative, and highly motivated professionals who promote lifelong learning.",
    },
    // Missions Section
    missions: {
      title: "Our missions",
      description:
        "Al-Rasheed Academy supports the total development of each student. As each student develops, he / she will become an upstanding citizen, an effective and productive individual for their family, the community, and the world.",
      circles: [
        {
          text: "Provide a Safe & Healthy Nurturing Islamic Environment",
          highlight: "Safe & Healthy",
        },
        {
          text: "Skilled, Creative & Highly Motivated Professionals",
          highlight: "Highly Motivated",
        },
        {
          text: "Total development of each student Upstanding citizen & productive individual",
          highlight: "each student",
        },
      ],
    },
    // Philosophy Section
    philosophy: {
      backgroundImage:
        "https://i.pinimg.com/1200x/31/43/2d/31432d4612d0211c4070c1389cb2ecd7.jpg",
      title: "Philosophy Statement",
      description1:
        "The education of the students at Al-Rasheed Academy is the responsibility of the entire community. We believe that the children of the community are the most important resource and future leaders. It is important that we encourage students to develop good Islamic characteristics, citizenship, high moral standards, and positive self-esteem.",
      description2:
        "We recognize that we exist in a worldwide community and that our educational program must reflect global needs. Our goal is to provide a positive Islamic learning environment that challenges students to grow mentally, academically, physically, and socially while ultimately preparing students to become productive members of society.",
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMissionVisionData();
  }, []);

  const fetchMissionVisionData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/mission-vision",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Validate and sanitize the data structure
        const sanitizedData = sanitizeMissionVisionData(data);

        // Create a completely fresh state object
        const freshState = {
          banner: {
            backgroundImage:
              sanitizedData.banner?.backgroundImage ||
              missionVisionData.banner.backgroundImage,
            title:
              sanitizedData.banner?.title || missionVisionData.banner.title,
            breadcrumb:
              sanitizedData.banner?.breadcrumb ||
              missionVisionData.banner.breadcrumb,
          },
          vision: {
            title:
              sanitizedData.vision?.title || missionVisionData.vision.title,
            description:
              sanitizedData.vision?.description ||
              missionVisionData.vision.description,
          },
          missions: {
            title:
              sanitizedData.missions?.title || missionVisionData.missions.title,
            description:
              sanitizedData.missions?.description ||
              missionVisionData.missions.description,
            circles:
              sanitizedData.missions?.circles ||
              missionVisionData.missions.circles,
          },
          philosophy: {
            backgroundImage:
              sanitizedData.philosophy?.backgroundImage ||
              missionVisionData.philosophy.backgroundImage,
            title:
              sanitizedData.philosophy?.title ||
              missionVisionData.philosophy.title,
            description1:
              sanitizedData.philosophy?.description1 ||
              missionVisionData.philosophy.description1,
            description2:
              sanitizedData.philosophy?.description2 ||
              missionVisionData.philosophy.description2,
          },
        };

        setMissionVisionData(freshState);
      } else if (response.status === 404) {
        // No data exists yet, use defaults
        console.log("No CMS data found, using defaults");
      }
    } catch (err) {
      console.error("Failed to fetch mission vision data", err);
      toast.error("Failed to fetch mission vision data");
    }
  };

  // Helper function to sanitize corrupted data from server
  const sanitizeMissionVisionData = (data) => {
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
        title: ensureString(data.banner.title, "About Us"),
        breadcrumb: ensureString(data.banner.breadcrumb, "Home › About"),
      };
    }

    // Sanitize vision section
    if (data.vision) {
      sanitized.vision = {
        title: ensureString(data.vision.title, "Our vision"),
        description: ensureString(
          data.vision.description,
          "Al-Rasheed Academy will provide each student with a Safe, Healthy, Nurturing, and Islamic learning environment facilitated by skilled, creative, and highly motivated professionals who promote lifelong learning."
        ),
      };
    }

    // Sanitize missions section
    if (data.missions) {
      sanitized.missions = {
        title: ensureString(data.missions.title, "Our missions"),
        description: ensureString(
          data.missions.description,
          "Al-Rasheed Academy supports the total development of each student. As each student develops, he / she will become an upstanding citizen, an effective and productive individual for their family, the community, and the world."
        ),
        circles: Array.isArray(data.missions.circles)
          ? data.missions.circles.map((circle, index) => ({
              text: ensureString(
                circle.text,
                [
                  "Provide a Safe & Healthy Nurturing Islamic Environment",
                  "Skilled, Creative & Highly Motivated Professionals",
                  "Total development of each student Upstanding citizen & productive individual",
                ][index] || ""
              ),
              highlight: ensureString(
                circle.highlight,
                ["Safe & Healthy", "Highly Motivated", "each student"][index] ||
                  ""
              ),
            }))
          : [
              {
                text: "Provide a Safe & Healthy Nurturing Islamic Environment",
                highlight: "Safe & Healthy",
              },
              {
                text: "Skilled, Creative & Highly Motivated Professionals",
                highlight: "Highly Motivated",
              },
              {
                text: "Total development of each student Upstanding citizen & productive individual",
                highlight: "each student",
              },
            ],
      };
    }

    // Sanitize philosophy section
    if (data.philosophy) {
      sanitized.philosophy = {
        backgroundImage: ensureString(
          data.philosophy.backgroundImage,
          "https://i.pinimg.com/1200x/31/43/2d/31432d4612d0211c4070c1389cb2ecd7.jpg"
        ),
        title: ensureString(data.philosophy.title, "Philosophy Statement"),
        description1: ensureString(
          data.philosophy.description1,
          "The education of the students at Al-Rasheed Academy is the responsibility of the entire community. We believe that the children of the community are the most important resource and future leaders. It is important that we encourage students to develop good Islamic characteristics, citizenship, high moral standards, and positive self-esteem."
        ),
        description2: ensureString(
          data.philosophy.description2,
          "We recognize that we exist in a worldwide community and that our educational program must reflect global needs. Our goal is to provide a positive Islamic learning environment that challenges students to grow mentally, academically, physically, and socially while ultimately preparing students to become productive members of society."
        ),
      };
    }

    return sanitized;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Use the current state data directly since change handlers ensure string values
      const dataToSave = {
        banner: {
          backgroundImage: missionVisionData.banner.backgroundImage || "",
          title: missionVisionData.banner.title || "",
          breadcrumb: missionVisionData.banner.breadcrumb || "",
        },
        vision: {
          title: missionVisionData.vision.title || "",
          description: missionVisionData.vision.description || "",
        },
        missions: {
          title: missionVisionData.missions.title || "",
          description: missionVisionData.missions.description || "",
          circles: missionVisionData.missions.circles.map((circle) => ({
            text: circle.text || "",
            highlight: circle.highlight || "",
          })),
        },
        philosophy: {
          backgroundImage: missionVisionData.philosophy.backgroundImage || "",
          title: missionVisionData.philosophy.title || "",
          description1: missionVisionData.philosophy.description1 || "",
          description2: missionVisionData.philosophy.description2 || "",
        },
      };

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/mission-vision",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              typeof window !== "undefined" ? localStorage.getItem("token") : ""
            }`,
          },
          credentials: "include",
          body: JSON.stringify({ content: dataToSave }),
        }
      );
      if (response.ok) {
        toast.success("Mission & Vision updated successfully!");
      } else {
        toast.error("Failed to update Mission & Vision");
      }
    } catch (err) {
      toast.error("Error updating Mission & Vision");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    // Ensure value is always a string
    const stringValue = typeof value === "string" ? value : String(value || "");
    // Use functional update and defensive checks in case stored data is corrupted
    setMissionVisionData((prev) => {
      const sectionObj =
        prev &&
        typeof prev[section] === "object" &&
        !Array.isArray(prev[section])
          ? prev[section]
          : {};

      return {
        ...prev,
        [section]: {
          ...sectionObj,
          [field]: stringValue,
        },
      };
    });
  };

  // Update a direct field under a top-level section, e.g. ("banner","title", value)
  const handleNestedChange = (section, field, value) => {
    // Ensure value is always a string
    const stringValue = typeof value === "string" ? value : String(value || "");

    // Use functional state update to avoid stale closures and accidental object keys
    setMissionVisionData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: stringValue,
      },
    }));
  };

  const handleCircleChange = (index, field, value) => {
    // Ensure value is always a string
    const stringValue = typeof value === "string" ? value : String(value || "");
    // Functional update + defensive guards
    setMissionVisionData((prev) => {
      const prevMissions = prev && prev.missions ? prev.missions : {};
      const prevCircles = Array.isArray(prevMissions.circles)
        ? prevMissions.circles.slice()
        : [];

      // Ensure the circle at index is an object
      const existing = prevCircles[index];
      const circleObj =
        existing && typeof existing === "object" && !Array.isArray(existing)
          ? { ...existing }
          : { text: "", highlight: "" };

      circleObj[field] = stringValue;
      prevCircles[index] = circleObj;

      return {
        ...prev,
        missions: {
          ...prevMissions,
          circles: prevCircles,
        },
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Mission & Vision CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Edit mission and vision page content and information
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Banner Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Banner Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background Image URL
              </label>
              <Input
                value={missionVisionData.banner.backgroundImage || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "banner",
                    "backgroundImage",
                    e.target.value
                  )
                }
                placeholder="/assets/hall.jpg"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Banner Title
              </label>
              <Input
                value={missionVisionData.banner.title || ""}
                onChange={(e) =>
                  handleNestedChange("banner", "title", e.target.value)
                }
                placeholder="About Us"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Breadcrumb Text
              </label>
              <Input
                value={missionVisionData.banner.breadcrumb || ""}
                onChange={(e) =>
                  handleNestedChange("banner", "breadcrumb", e.target.value)
                }
                placeholder="Home › About"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Vision Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vision Title
              </label>
              <Input
                value={missionVisionData.vision.title || ""}
                onChange={(e) =>
                  handleNestedChange("vision", "title", e.target.value)
                }
                placeholder="Our vision"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vision Description
              </label>
              <textarea
                value={missionVisionData.vision.description || ""}
                onChange={(e) =>
                  handleNestedChange("vision", "description", e.target.value)
                }
                placeholder="Enter vision description..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Missions Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Missions Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Missions Title
              </label>
              <Input
                value={missionVisionData.missions.title || ""}
                onChange={(e) =>
                  handleNestedChange("missions", "title", e.target.value)
                }
                placeholder="Our missions"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Missions Description
              </label>
              <textarea
                value={missionVisionData.missions.description || ""}
                onChange={(e) =>
                  handleNestedChange("missions", "description", e.target.value)
                }
                placeholder="Enter missions description..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mission Circles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Mission Circles
              </label>
              <div className="space-y-4">
                {missionVisionData.missions.circles.map((circle, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Circle {index + 1} Text
                        </label>
                        <textarea
                          value={circle.text || ""}
                          onChange={(e) =>
                            handleCircleChange(index, "text", e.target.value)
                          }
                          placeholder="Enter circle text..."
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Highlight Text
                        </label>
                        <Input
                          value={circle.highlight || ""}
                          onChange={(e) =>
                            handleCircleChange(
                              index,
                              "highlight",
                              e.target.value
                            )
                          }
                          placeholder="Text to highlight"
                          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Philosophy Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background Image URL
              </label>
              <Input
                value={missionVisionData.philosophy.backgroundImage || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "philosophy",
                    "backgroundImage",
                    e.target.value
                  )
                }
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Philosophy Title
              </label>
              <Input
                value={missionVisionData.philosophy.title || ""}
                onChange={(e) =>
                  handleNestedChange("philosophy", "title", e.target.value)
                }
                placeholder="Philosophy Statement"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Philosophy Description 1
              </label>
              <textarea
                value={missionVisionData.philosophy.description1 || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "philosophy",
                    "description1",
                    e.target.value
                  )
                }
                placeholder="Enter first part of philosophy description..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Philosophy Description 2
              </label>
              <textarea
                value={missionVisionData.philosophy.description2 || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "philosophy",
                    "description2",
                    e.target.value
                  )
                }
                placeholder="Enter second part of philosophy description..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupplyListCMS = ({ setSelected }) => {
  const [supplyListData, setSupplyListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSupplyListData();
  }, []);

  const fetchSupplyListData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/supply-list",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSupplyListData(data);
      } else if (response.status === 404) {
        // No data exists yet, use defaults
        console.log("No CMS data found, using defaults");
      }
    } catch (err) {
      console.error("Failed to fetch supply list data", err);
      toast.error("Failed to fetch supply list data");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!storedToken) {
        toast.error("You must be logged in to save changes");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/supply-list",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ content: supplyListData }),
        }
      );
      if (response.ok) {
        toast.success("Supply list updated successfully!");
      } else {
        toast.error("Failed to update supply list");
      }
    } catch (err) {
      toast.error("Error updating supply list");
    } finally {
      setLoading(false);
    }
  };

  const updateGrade = (index, field, value) => {
    const updatedData = [...supplyListData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setSupplyListData(updatedData);
  };

  const addGrade = () => {
    const newGrade = {
      grade: "New Grade",
      color: "gray",
      items: ["New item"],
    };
    setSupplyListData([...supplyListData, newGrade]);
  };

  const removeGrade = (index) => {
    const updatedData = supplyListData.filter((_, i) => i !== index);
    setSupplyListData(updatedData);
  };

  const addItem = (gradeIndex) => {
    const updatedData = [...supplyListData];
    updatedData[gradeIndex].items.push("New item");
    setSupplyListData(updatedData);
  };

  const updateItem = (gradeIndex, itemIndex, value) => {
    const updatedData = [...supplyListData];
    updatedData[gradeIndex].items[itemIndex] = value;
    setSupplyListData(updatedData);
  };

  const removeItem = (gradeIndex, itemIndex) => {
    const updatedData = [...supplyListData];
    updatedData[gradeIndex].items = updatedData[gradeIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setSupplyListData(updatedData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Supply List CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage school supply lists for different grade levels
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={addGrade}
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Add Grade
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {supplyListData.map((grade, gradeIndex) => (
          <div
            key={gradeIndex}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Grade {gradeIndex + 1}
              </h3>
              <Button
                onClick={() => removeGrade(gradeIndex)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
              >
                Remove Grade
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade Name
                  </label>
                  <Input
                    value={grade.grade || ""}
                    onChange={(e) =>
                      updateGrade(gradeIndex, "grade", e.target.value)
                    }
                    placeholder="e.g., Kindergarten"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color Theme
                  </label>
                  <select
                    value={grade.color || "gray"}
                    onChange={(e) =>
                      updateGrade(gradeIndex, "color", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pink">Pink</option>
                    <option value="indigo">Indigo</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                    <option value="teal">Teal</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Supply Items
                  </label>
                  <Button
                    onClick={() => addItem(gradeIndex)}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Add Item
                  </Button>
                </div>
                <div className="space-y-2">
                  {grade.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <Input
                        value={item || ""}
                        onChange={(e) =>
                          updateItem(gradeIndex, itemIndex, e.target.value)
                        }
                        placeholder="Enter supply item..."
                        className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
                      <Button
                        onClick={() => removeItem(gradeIndex, itemIndex)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IslamicStudiesCMS = ({ setSelected }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/islamic-studies",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.slides && Array.isArray(data.slides)) {
          setSlides(data.slides);
        } else {
          // Initialize with default slides if response doesn't have slides
          const defaultSlides = [
            {
              img: "/assets/istudies_1.png",
              heading:
                "Islamic Studies at Al-Rasheed Academy: Embracing Faith and Knowledge",
              text: "At Al-Rasheed Academy, we understand the significance of providing a well-rounded education that encompasses both academic excellence and spiritual development.",
            },
          ];
          setSlides(defaultSlides);
        }
      } else if (response.status === 404) {
        console.log("No CMS data found, using defaults");
        const defaultSlides = [
          {
            img: "/assets/istudies_1.png",
            heading:
              "Islamic Studies at Al-Rasheed Academy: Embracing Faith and Knowledge",
            text: "At Al-Rasheed Academy, we understand the significance of providing a well-rounded education that encompasses both academic excellence and spiritual development.",
          },
        ];
        setSlides(defaultSlides);
      }
    } catch (err) {
      console.error("Failed to fetch islamic studies data", err);
      toast.error("Failed to fetch islamic studies data");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!storedToken) {
        toast.error("You must be logged in to save changes");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/islamic-studies",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ content: { slides } }),
        }
      );
      if (response.ok) {
        toast.success("Islamic Studies slides updated successfully!");
        fetchSlides();
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(
          errorData.error || "Failed to update islamic studies slides"
        );
      }
    } catch (err) {
      console.error("Error updating islamic studies slides:", err);
      toast.error("Error updating islamic studies slides");
    } finally {
      setLoading(false);
    }
  };

  const updateSlide = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setSlides(updatedSlides);
  };

  const addSlide = () => {
    const newSlide = {
      img: "/assets/istudies_1.png",
      heading: "New Slide Title",
      text: "Slide description goes here",
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Islamic Studies CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage carousel slides for the Islamic Studies page
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={addSlide}
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto"
          >
            Add Slide
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                Slide {index + 1}
              </h3>
              <Button
                onClick={() => removeSlide(index)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 w-full sm:w-auto"
              >
                Remove Slide
              </Button>
            </div>

            <div className="space-y-4 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slide Image URL
                </label>
                <Input
                  value={slide.img || ""}
                  onChange={(e) => updateSlide(index, "img", e.target.value)}
                  placeholder="e.g., /assets/istudies_1.png"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slide Heading
                </label>
                <Input
                  value={slide.heading || ""}
                  onChange={(e) =>
                    updateSlide(index, "heading", e.target.value)
                  }
                  placeholder="Enter slide heading"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slide Description
                </label>
                <textarea
                  value={slide.text || ""}
                  onChange={(e) => updateSlide(index, "text", e.target.value)}
                  placeholder="Enter slide description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>

              {slide.img && (
                <div className="mt-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview:
                  </p>
                  <div className="relative w-full h-32 sm:h-40 md:h-40 rounded-lg overflow-hidden">
                    <img
                      src={slide.img}
                      alt={slide.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CurricularCMS = ({ setSelected }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/curricular",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.sections && Array.isArray(data.sections)) {
          setSections(data.sections);
        }
      } else if (response.status === 404) {
        console.log("No CMS data found, using defaults");
      }
    } catch (err) {
      console.error("Failed to fetch curricular data", err);
      toast.error("Failed to fetch curricular data");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!storedToken) {
        toast.error("You must be logged in to save changes");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/curricular",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ content: { sections } }),
        }
      );
      if (response.ok) {
        toast.success("Curricular sections updated successfully!");
        fetchSections();
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to update curricular sections");
      }
    } catch (err) {
      console.error("Error updating curricular sections:", err);
      toast.error("Error updating curricular sections");
    } finally {
      setLoading(false);
    }
  };

  const updateSection = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
  };

  const addSection = () => {
    const newSection = {
      title: "New Section",
      subTitle: null,
      imageSrc: "/assets/common.png",
      imageAlt: "Section image",
      content: "Section description goes here",
      reverse: false,
      accent: "#0ea5a4",
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Curricular CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage curriculum page sections and content
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={addSection}
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Add Section
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Section {index + 1}: {section.title}
              </h3>
              <Button
                onClick={() => removeSection(index)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
              >
                Remove Section
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section Title
                  </label>
                  <Input
                    value={section.title || ""}
                    onChange={(e) =>
                      updateSection(index, "title", e.target.value)
                    }
                    placeholder="e.g., Common Core Standards"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subtitle (optional)
                  </label>
                  <Input
                    value={section.subTitle || ""}
                    onChange={(e) =>
                      updateSection(index, "subTitle", e.target.value || null)
                    }
                    placeholder="e.g., Our Students. Their Moment."
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <Input
                    value={section.imageSrc || ""}
                    onChange={(e) =>
                      updateSection(index, "imageSrc", e.target.value)
                    }
                    placeholder="/assets/image.png"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image Alt Text
                  </label>
                  <Input
                    value={section.imageAlt || ""}
                    onChange={(e) =>
                      updateSection(index, "imageAlt", e.target.value)
                    }
                    placeholder="Image description"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={section.content || ""}
                  onChange={(e) =>
                    updateSection(index, "content", e.target.value)
                  }
                  placeholder="Section content goes here"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accent Color
                  </label>
                  <Input
                    type="color"
                    value={section.accent || "#0ea5a4"}
                    onChange={(e) =>
                      updateSection(index, "accent", e.target.value)
                    }
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Layout
                  </label>
                  <select
                    value={section.reverse ? "reverse" : "normal"}
                    onChange={(e) =>
                      updateSection(
                        index,
                        "reverse",
                        e.target.value === "reverse"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Image Left, Text Right</option>
                    <option value="reverse">Image Right, Text Left</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

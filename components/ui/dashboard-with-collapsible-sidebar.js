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
  Settings,
  HelpCircle,
  User,
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
} from "lucide-react";

import { toast } from "sonner";

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

export const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [authorized, setAuthorized] = useState(null);

  // Auth guard: verify user on mount. If not authenticated, set authorized=false so parent can show sign-in.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers = storedToken
          ? { Authorization: `Bearer ${storedToken}` }
          : {};

        const res = await fetch("http://localhost:4000/api/auth/me", {
          credentials: "include",
          headers,
        });
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
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
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
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [accreditationOpen, setAccreditationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <nav
      className={`h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? "w-64" : "w-16"
      } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm flex flex-col`}
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
        </div>

        {open && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1">
            <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Account
            </div>
            <Option
              Icon={Settings}
              title="Settings"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={HelpCircle}
              title="Help & Support"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          </div>
        )}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
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
    if (!isOpen) {
      setSelected(title);
    }
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
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
      <svg
        width="20"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-white"
      >
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
      </svg>
    </div>
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
  const getPageTitle = () => {
    if (selected === "New Enrollment") return "New Enrollment";
    if (selected === "Re-Enrollment") return "Re-Enrollment";
    if (selected === "Job Application") return "Job Applications";
    if (selected === "Volunteer Application") return "Volunteer Applications";
    if (selected === "Staff Surveys") return "Staff Surveys";
    if (selected === "Parent Surveys") return "Parent Surveys";
    if (selected === "Student Surveys") return "Student Surveys";
    if (selected === "CMS Management") return "Contact Page CMS";
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
    return "Welcome back to your dashboard";
  };

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {getPageDescription()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <button className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div key={selected} className="flex-1 overflow-auto">
          <div className="p-6">
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
              <StaffSurveysTable setSelected={setSelected} />
            )}
            {selected === "Parent Surveys" && (
              <ParentSurveysTable setSelected={setSelected} />
            )}
            {selected === "Student Surveys" && (
              <StudentSurveysTable setSelected={setSelected} />
            )}
            {selected === "CMS Management" && (
              <CMSManagement setSelected={setSelected} />
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
                applicationId={selected.split("-")[2]}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("volunteer-application-detail-") && (
              <VolunteerApplicationDetailView
                applicationId={selected.split("-")[2]}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("staff-survey-detail-") && (
              <StaffSurveyDetailView
                surveyId={selected.split("-")[2]}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("parent-survey-detail-") && (
              <ParentSurveyDetailView
                surveyId={selected.split("-")[2]}
                setSelected={setSelected}
              />
            )}
            {selected.startsWith("student-survey-detail-") && (
              <StudentSurveyDetailView
                surveyId={selected.split("-")[2]}
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
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Total Sales
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      $24,567
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      +12% from last month
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Active Users
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      1,234
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      +5% from last week
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Orders
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      456
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      +8% from yesterday
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <Package className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Products
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      89
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      +3 new this week
                    </p>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Recent Activity
                        </h3>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                          View all
                        </button>
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            icon: DollarSign,
                            title: "New sale recorded",
                            desc: "Order #1234 completed",
                            time: "2 min ago",
                            color: "green",
                          },
                          {
                            icon: Users,
                            title: "New user registered",
                            desc: "john.doe@example.com joined",
                            time: "5 min ago",
                            color: "blue",
                          },
                          {
                            icon: Package,
                            title: "Product updated",
                            desc: "iPhone 15 Pro stock updated",
                            time: "10 min ago",
                            color: "purple",
                          },
                          {
                            icon: Activity,
                            title: "System maintenance",
                            desc: "Scheduled backup completed",
                            time: "1 hour ago",
                            color: "orange",
                          },
                          {
                            icon: Bell,
                            title: "New notification",
                            desc: "Marketing campaign results",
                            time: "2 hours ago",
                            color: "red",
                          },
                        ].map((activity, i) => (
                          <div
                            key={i}
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
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-6">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Quick Stats
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Conversion Rate
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            3.2%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "32%" }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Bounce Rate
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            45%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Page Views
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            8.7k
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "87%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Recent Gallery Uploads
                      </h3>
                      <div className="space-y-3">
                        {[
                          "School Event Photo",
                          "Art Exhibition",
                          "Science Fair",
                          "Sports Day",
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2"
                          >
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {item}
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {
                                [
                                  "2 days ago",
                                  "5 days ago",
                                  "1 week ago",
                                  "2 weeks ago",
                                ][i]
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
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
        "http://localhost:4000/api/auth/cms/contact",
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
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/contact",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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

export default Dashboard;

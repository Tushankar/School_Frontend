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
import {
  ParentSurveyTable,
  StaffSurveyTable,
  StudentSurveyTable,
  ParentSurveyDetailView,
  StaffSurveyDetailView,
  StudentSurveyDetailView,
} from "./SurveyManagement";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
          <Option
            Icon={TrendingUp}
            title="Ticker CMS"
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
                <div className="relative z-10 w-full max-w-md rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg">
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
                          await fetch("http://localhost:4000/api/auth/logout", {
                            method: "POST",
                            credentials: "include",
                          });
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
          fetch("http://localhost:4000/api/forms/student-registration").catch(
            () => ({ ok: false })
          ),
          fetch("http://localhost:4000/api/renroll/renroll-form").catch(() => ({
            ok: false,
          })),
          fetch("http://localhost:4000/api/job-applications/").catch(() => ({
            ok: false,
          })),
          fetch("http://localhost:4000/api/volunteer-applications/").catch(
            () => ({ ok: false })
          ),
          fetch("http://localhost:4000/api/surveys/staff").catch(() => ({
            ok: false,
          })),
          fetch("http://localhost:4000/api/surveys/parent").catch(() => ({
            ok: false,
          })),
          fetch("http://localhost:4000/api/surveys/student").catch(() => ({
            ok: false,
          })),
          fetch("http://localhost:4000/api/contact/").catch(() => ({
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
        fetch("http://localhost:4000/api/forms/student-registration").catch(
          () => ({ ok: false, json: () => ({}) })
        ),
        fetch("http://localhost:4000/api/renroll/renroll-form").catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch("http://localhost:4000/api/job-applications/").catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch("http://localhost:4000/api/volunteer-applications/").catch(
          () => ({ ok: false, json: () => ({}) })
        ),
        fetch("http://localhost:4000/api/surveys/staff").catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch("http://localhost:4000/api/surveys/parent").catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch("http://localhost:4000/api/surveys/student").catch(() => ({
          ok: false,
          json: () => ({}),
        })),
        fetch("http://localhost:4000/api/contact/").catch(() => ({
          ok: false,
          json: () => ({}),
        })),
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
    if (selected === "Ticker CMS")
      return "Edit ticker news content and settings";
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
              <div className="relative notification-dropdown-container">
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      showDropdown: !prev.showDropdown,
                    }))
                  }
                  className="relative p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  {notifications.count > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {notifications.count > 99 ? "99+" : notifications.count}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifications.showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
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
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg flex-shrink-0 ${
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
                                    className={`h-4 w-4 ${
                                      notification.type === "enrollment"
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-green-600 dark:text-green-400"
                                    }`}
                                  />
                                ) : notification.type.includes(
                                    "application"
                                  ) ? (
                                  <FileText
                                    className={`h-4 w-4 ${
                                      notification.type === "job-application"
                                        ? "text-purple-600 dark:text-purple-400"
                                        : "text-pink-600 dark:text-pink-400"
                                    }`}
                                  />
                                ) : notification.type.includes("survey") ? (
                                  <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                ) : (
                                  <MapPin className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {notification.description}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
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
              {/* Profile removed per UI change - replaced by Log out in sidebar */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <button
                        onClick={() => setSelected("New Enrollment")}
                        className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Total Enrollments
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalEnrollments}
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                          {dashboardData.stats.pendingEnrollments} pending
                        </p>
                      </button>

                      <button
                        onClick={() => setSelected("Re-Enrollment")}
                        className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Re-Enrollments
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalReenrollments}
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                          {dashboardData.stats.pendingReenrollments} pending
                        </p>
                      </button>

                      <button
                        onClick={() => setSelected("Job Application")}
                        className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Job Applications
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalJobApplications}
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                          {dashboardData.stats.pendingJobApplications} pending
                        </p>
                      </button>

                      <button
                        onClick={() => setSelected("Contact Forms")}
                        className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Contact Forms
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {dashboardData.stats.totalContactForms}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          All inquiries
                        </p>
                      </button>
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
        "http://localhost:4000/api/auth/cms/ticker",
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
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/ticker",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content: tickerData }),
        }
      );
      if (response.ok) {
        toast.success("Ticker updated successfully!");
      } else {
        toast.error("Failed to update ticker");
      }
    } catch (err) {
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

export default Dashboard;

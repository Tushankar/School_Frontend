"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

const steps = [
  { id: "parents", title: "Parents" },
  { id: "students", title: "Students" },
  { id: "agreement", title: "Enrollment Agreement" },
];

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const carouselImages = [
  "/assets/chemicalReaction.jpg",
  "/assets/gardening.jpeg",
  "/assets/hall.jpg",
  "/assets/science.jpeg",
  "/assets/studentExam.jpg",
];

const NewEnrollmentForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const totalPages = 3;

  // Generate unique enrollment ID once when form loads
  const [enrollmentId, setEnrollmentId] = useState(() => {
    return `ENR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [completedPages, setCompletedPages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Parents
    parentFullName: "",
    relationshipToStudent: "",
    maritalStatus: "",
    primaryPhone: "",
    alternatePhone: "",
    email: "",
    alternateEmail: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    // Students
    studentFullName: "",
    gender: "",
    dateOfBirth: "",
    birthCertificateNIC: "",
    totalSiblings: "",
    orphanStatus: "",
    oscStatus: "",
    identificationMark: "",
    registrationNumber: "",
    admissionDate: "",
    classGrade: "",
    section: "",
    previousSchoolName: "",
    previousSchoolID: "",
    boardRollNumber: "",
    studentEmail: "",
    studentPhone: "",
    residentialAddress: "",
    studentPhoto: null,
    // Agreement
    agreementSignature: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoUpload = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setPhotoFile(file);
    setFormData((prev) => ({ ...prev, studentPhoto: file }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    toast.success("Photo uploaded successfully!");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handlePhotoUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handlePhotoUpload(file);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setFormData((prev) => ({ ...prev, studentPhoto: null }));
  };

  const validatePage = (pageNumber) => {
    switch (pageNumber) {
      case 0: // Parents
        if (
          !formData.parentFullName ||
          !formData.relationshipToStudent ||
          !formData.primaryPhone ||
          !formData.email ||
          !formData.streetAddress ||
          !formData.city ||
          !formData.state ||
          !formData.zipCode
        ) {
          toast.error("Please fill all required fields in Parents section", {
            description:
              "Full name, relationship, primary phone, email, and address are required",
            duration: 4000,
          });
          return false;
        }
        break;
      case 1: // Students
        if (
          !formData.studentFullName ||
          !formData.gender ||
          !formData.registrationNumber ||
          !formData.admissionDate ||
          !formData.classGrade ||
          !formData.section ||
          !formData.studentEmail ||
          !formData.studentPhone
        ) {
          toast.error("Please fill all required fields in Students section", {
            description:
              "Student full name, gender, registration number, admission date, class/grade, section, email, and phone are required",
            duration: 4000,
          });
          return false;
        }
        break;
      case 2: // Agreement
        if (!formData.agreementSignature) {
          toast.error("Please sign the enrollment agreement", {
            description: "Your signature is required to complete enrollment",
            duration: 4000,
          });
          return false;
        }
        break;
    }
    return true;
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      if (validatePage(currentPage)) {
        setCompletedPages([...new Set([...completedPages, currentPage])]);
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("Page validated successfully", {
          description: `Proceeding to ${steps[currentPage + 1].title}`,
          duration: 2000,
        });
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (page) => {
    if (page <= currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate final page
    if (!validatePage(currentPage)) {
      return;
    }

    setIsSubmitting(true);
    toast.loading("Submitting enrollment forms...", { id: "submit-toast" });

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        let value = formData[key];
        if (key === "orphanStatus" || key === "oscStatus") {
          value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
        if (key === "studentPhoto" && value) {
          formDataToSend.append("studentPhoto", value);
        } else if (value !== null && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      // Add enrollment ID
      formDataToSend.append("enrollmentId", enrollmentId);

      // Submit form data to backend
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/forms/new-enrollment",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        toast.dismiss("submit-toast");
        toast.success("Enrollment submitted successfully!", {
          description:
            "Your enrollment has been processed. Check your email for confirmation.",
          duration: 5000,
        });
        // Reset form
        setFormData({
          parentFullName: "",
          relationshipToStudent: "",
          maritalStatus: "",
          primaryPhone: "",
          alternatePhone: "",
          email: "",
          alternateEmail: "",
          streetAddress: "",
          city: "",
          state: "",
          zipCode: "",
          studentFullName: "",
          gender: "",
          dateOfBirth: "",
          birthCertificateNIC: "",
          totalSiblings: "",
          orphanStatus: "",
          oscStatus: "",
          identificationMark: "",
          registrationNumber: "",
          admissionDate: "",
          classGrade: "",
          section: "",
          previousSchoolName: "",
          previousSchoolID: "",
          boardRollNumber: "",
          studentEmail: "",
          studentPhone: "",
          residentialAddress: "",
          studentPhoto: null,
          agreementSignature: "",
        });
        setPhotoFile(null);
        setPhotoPreview(null);
        setCompletedPages([]);
        setCurrentPage(0);
        // Generate new enrollment ID
        setEnrollmentId(
          `ENR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        );
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.dismiss("submit-toast");
      toast.error("Submission Error", {
        description:
          "Failed to submit enrollment form. Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="hidden lg:block lg:w-[25%]">
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden h-full">
          <div className="relative h-full">
            <img
              src={carouselImages[currentImage]}
              alt={`School ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

            <div className="absolute inset-0 z-10 flex flex-col p-8">
              <div className="mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-28 h-28">
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
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Al-Rasheed Academy
                  </h1>
                  <h2 className="text-2xl font-bold text-center mb-2 text-white drop-shadow-2xl">
                    2025-2026
                  </h2>
                  <p className="text-center text-white text-sm drop-shadow-lg">
                    New Student Enrollment
                  </p>
                </div>

                <div className="mb-8 text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-lg">
                    Welcome to Our Community
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow-md">
                    Join a tradition of academic excellence and character
                    development
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="bg-white/15 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-sm text-white font-medium mb-2">
                      Overall Progress
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((currentPage + 1) / totalPages) * 100}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="text-sm font-bold text-white">
                        {Math.round(((currentPage + 1) / totalPages) * 100)}%
                      </div>
                    </div>
                    <div className="text-xs text-white/80 mt-2">
                      Step {currentPage + 1} of {totalPages} -{" "}
                      {steps[currentPage].title}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-xs text-white">
                    <p className="mb-1 font-semibold">Need Help?</p>
                    <p className="text-white/90">registration@alrasheed.edu</p>
                    <p className="text-white/90">(716) 706-1303</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentImage
                        ? "bg-orange-400 w-8 shadow-lg"
                        : "bg-white/50 hover:bg-white/70"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full lg:w-[75%] p-2 sm:p-4 h-full bg-gray-50 lg:border-l-[12px] border-white overflow-y-auto hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="w-full h-full">
          <motion.div
            className="max-w-5xl mx-auto py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <form onSubmit={handleSubmit}>
                <div className="p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6 border-b bg-gradient-to-r from-gray-50 to-slate-50">
                  <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 flex-shrink-0">
                      <div className="relative w-full h-full">
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
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                        New Student Enrollment
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600">
                        Al-Rasheed Academy
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2 gap-1">
                      {steps.map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center flex-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.div
                            className={cn(
                              "w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full cursor-pointer transition-colors duration-300",
                              index < currentPage
                                ? "bg-slate-600"
                                : index === currentPage
                                ? "bg-[#201f1a] ring-4 lg:ring-6 ring-[#201f1a]/30 shadow-lg"
                                : "bg-gray-300"
                            )}
                            onClick={() => goToPage(index)}
                            whileTap={{ scale: 0.95 }}
                          />
                          <motion.span
                            className={cn(
                              "text-[10px] sm:text-xs mt-1 sm:mt-1.5 hidden md:block text-center",
                              index === currentPage
                                ? "text-[#201f1a] font-bold"
                                : "text-gray-600 font-medium"
                            )}
                          >
                            {step.title}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                      <motion.div
                        className="h-full bg-[#201f1a]"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(currentPage / (steps.length - 1)) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                  >
                    <div className="p-4 sm:p-6 lg:p-8">
                      {currentPage === 0 && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="parentFullName"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Full Name *
                                </Label>
                                <Input
                                  id="parentFullName"
                                  name="parentFullName"
                                  value={formData.parentFullName}
                                  onChange={handleInputChange}
                                  placeholder="John Doe"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="relationshipToStudent"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Relationship to Student *
                                </Label>
                                <Select
                                  name="relationshipToStudent"
                                  value={formData.relationshipToStudent}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      relationshipToStudent: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Relationship" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="father">
                                      Father
                                    </SelectItem>
                                    <SelectItem value="mother">
                                      Mother
                                    </SelectItem>
                                    <SelectItem value="guardian">
                                      Guardian
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label
                                  htmlFor="maritalStatus"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Marital Status
                                </Label>
                                <Select
                                  name="maritalStatus"
                                  value={formData.maritalStatus}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      maritalStatus: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="single">
                                      Single
                                    </SelectItem>
                                    <SelectItem value="married">
                                      Married
                                    </SelectItem>
                                    <SelectItem value="divorced">
                                      Divorced
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="primaryPhone"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Primary Phone Number *
                                </Label>
                                <Input
                                  id="primaryPhone"
                                  name="primaryPhone"
                                  value={formData.primaryPhone}
                                  onChange={handleInputChange}
                                  placeholder="(555) 000-0000"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="alternatePhone"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Alternate Phone
                                </Label>
                                <Input
                                  id="alternatePhone"
                                  name="alternatePhone"
                                  value={formData.alternatePhone}
                                  onChange={handleInputChange}
                                  placeholder="(555) 000-0000"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="email"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Email Address *
                                </Label>
                                <Input
                                  id="email"
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="john.doe@email.com"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="alternateEmail"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Alternate Email
                                </Label>
                                <Input
                                  id="alternateEmail"
                                  type="email"
                                  name="alternateEmail"
                                  value={formData.alternateEmail}
                                  onChange={handleInputChange}
                                  placeholder="alternate@email.com"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Home Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                <Label
                                  htmlFor="streetAddress"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Street Address
                                </Label>
                                <Input
                                  id="streetAddress"
                                  name="streetAddress"
                                  value={formData.streetAddress}
                                  onChange={handleInputChange}
                                  placeholder="123 Main Street, Apt 4B"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="city"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  City
                                </Label>
                                <Input
                                  id="city"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="New York"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="state"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  State / Province
                                </Label>
                                <Input
                                  id="state"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  placeholder="NY"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="zipCode"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  ZIP / Postal Code
                                </Label>
                                <Input
                                  id="zipCode"
                                  name="zipCode"
                                  value={formData.zipCode}
                                  onChange={handleInputChange}
                                  placeholder="10001"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentPage === 1 && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Student Profile Photo
                            </h2>
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                              onDragOver={handleDragOver}
                              onDrop={handleDrop}
                              onClick={() =>
                                document.getElementById("photo-upload").click()
                              }
                            >
                              {photoPreview ? (
                                <div className="space-y-4">
                                  <div className="relative inline-block">
                                    <img
                                      src={photoPreview}
                                      alt="Student photo preview"
                                      className="max-w-32 max-h-32 object-cover rounded-lg mx-auto"
                                    />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removePhoto();
                                      }}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                    >
                                      ×
                                    </button>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {photoFile?.name} (
                                    {(photoFile?.size / 1024 / 1024).toFixed(2)}{" "}
                                    MB)
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Click to change photo or drag and drop a new
                                    one
                                  </p>
                                </div>
                              ) : (
                                <div className="text-gray-500">
                                  <div className="mb-4">
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <p className="text-lg font-medium">
                                    Click to upload student photo
                                  </p>
                                  <p className="text-sm">or drag and drop</p>
                                  <p className="text-xs text-gray-400 mt-2">
                                    PNG, JPG, GIF up to 5MB
                                  </p>
                                </div>
                              )}
                            </div>
                            <input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                          </div>

                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Personal Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="studentFullName"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Full Name *
                                </Label>
                                <Input
                                  id="studentFullName"
                                  name="studentFullName"
                                  value={formData.studentFullName}
                                  onChange={handleInputChange}
                                  placeholder="Jane Doe"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="gender"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Gender *
                                </Label>
                                <Select
                                  name="gender"
                                  value={formData.gender}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      gender: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Gender" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label
                                  htmlFor="dateOfBirth"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Date of Birth
                                </Label>
                                <Input
                                  id="dateOfBirth"
                                  type="date"
                                  name="dateOfBirth"
                                  value={formData.dateOfBirth}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="birthCertificateNIC"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Birth Certificate / NIC
                                </Label>
                                <Input
                                  id="birthCertificateNIC"
                                  name="birthCertificateNIC"
                                  value={formData.birthCertificateNIC}
                                  onChange={handleInputChange}
                                  placeholder="Enter ID Number"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="totalSiblings"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Total Siblings
                                </Label>
                                <Select
                                  name="totalSiblings"
                                  value={formData.totalSiblings}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      totalSiblings: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4+">4+</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label
                                  htmlFor="orphanStatus"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Orphan Status
                                </Label>
                                <Select
                                  name="orphanStatus"
                                  value={formData.orphanStatus}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      orphanStatus: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label
                                  htmlFor="oscStatus"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  OSC Status
                                </Label>
                                <Select
                                  name="oscStatus"
                                  value={formData.oscStatus}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      oscStatus: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="md:col-span-2">
                                <Label
                                  htmlFor="identificationMark"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Identification Mark
                                </Label>
                                <Input
                                  id="identificationMark"
                                  name="identificationMark"
                                  value={formData.identificationMark}
                                  onChange={handleInputChange}
                                  placeholder="e.g., Birthmark on left arm"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Academic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="registrationNumber"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Registration Number *
                                </Label>
                                <Input
                                  id="registrationNumber"
                                  name="registrationNumber"
                                  value={formData.registrationNumber}
                                  onChange={handleInputChange}
                                  placeholder="REG-2025-001"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="admissionDate"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Admission Date *
                                </Label>
                                <Input
                                  id="admissionDate"
                                  type="date"
                                  name="admissionDate"
                                  value={formData.admissionDate}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="classGrade"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Class / Grade *
                                </Label>
                                <Select
                                  name="classGrade"
                                  value={formData.classGrade}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      classGrade: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Class" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="k3">K3</SelectItem>
                                    <SelectItem value="k4">K4</SelectItem>
                                    <SelectItem value="k5">K5</SelectItem>
                                    <SelectItem value="1">Grade 1</SelectItem>
                                    <SelectItem value="2">Grade 2</SelectItem>
                                    <SelectItem value="3">Grade 3</SelectItem>
                                    <SelectItem value="4">Grade 4</SelectItem>
                                    <SelectItem value="5">Grade 5</SelectItem>
                                    <SelectItem value="6">Grade 6</SelectItem>
                                    <SelectItem value="7">Grade 7</SelectItem>
                                    <SelectItem value="8">Grade 8</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label
                                  htmlFor="section"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Section *
                                </Label>
                                <Select
                                  name="section"
                                  value={formData.section}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      section: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Section" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="a">A</SelectItem>
                                    <SelectItem value="b">B</SelectItem>
                                    <SelectItem value="c">C</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Previous School
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="previousSchoolName"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  School Name
                                </Label>
                                <Input
                                  id="previousSchoolName"
                                  name="previousSchoolName"
                                  value={formData.previousSchoolName}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="previousSchoolID"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Previous School ID
                                </Label>
                                <Input
                                  id="previousSchoolID"
                                  name="previousSchoolID"
                                  value={formData.previousSchoolID}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="boardRollNumber"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Board Roll Number
                                </Label>
                                <Input
                                  id="boardRollNumber"
                                  name="boardRollNumber"
                                  value={formData.boardRollNumber}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Student Contact
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label
                                  htmlFor="studentEmail"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Email Address *
                                </Label>
                                <Input
                                  id="studentEmail"
                                  type="email"
                                  name="studentEmail"
                                  value={formData.studentEmail}
                                  onChange={handleInputChange}
                                  placeholder="student@school.edu"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="studentPhone"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Phone Number *
                                </Label>
                                <Input
                                  id="studentPhone"
                                  name="studentPhone"
                                  value={formData.studentPhone}
                                  onChange={handleInputChange}
                                  placeholder="+1 123-456-7890"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Residential Address
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <Label
                                  htmlFor="residentialAddress"
                                  className="text-sm font-medium text-gray-700 mb-1"
                                >
                                  Residential Address
                                </Label>
                                <Textarea
                                  id="residentialAddress"
                                  name="residentialAddress"
                                  value={formData.residentialAddress}
                                  onChange={handleInputChange}
                                  rows={3}
                                  placeholder="Enter residential address"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentPage === 2 && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                              Enrollment Agreement
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-lg border">
                              <p className="text-gray-700 leading-relaxed mb-6">
                                Hereby place my confidence in the ability of the
                                administration and staff of the Al-Rasheed
                                Academy to provide the educational instruction
                                to my child(ren) at their discretion in
                                accordance with the school set curriculum.
                              </p>
                              <p className="text-gray-700 leading-relaxed mb-6">
                                I agree to accept all regulations of the school
                                on the applicant's behalf and authorize the
                                school to employ such discipline, as it deems
                                wise and expedient for my child(ren). I realize
                                that occasionally children may make an issue
                                with actions that they do not agree with and
                                that they are prone to take teacher criticisms
                                out of context. I pledge that if this should
                                occur, I will seek to clarify the matter with
                                the teacher and/or Principal first. If
                                necessary, I will correct my child(ren) and will
                                support the school personnel.
                              </p>
                              <p className="text-gray-700 leading-relaxed mb-6">
                                I will follow the same procedure for any school
                                incidents that may occur. I pledge to build a
                                strong relation with my child(ren)'s teachers
                                and aid in the education of my child(ren) by
                                providing an Islamic example at home, supporting
                                the spiritual teaching of the school, following
                                through with any homework assignments or slips
                                to be signed, ensuring that my child(ren)
                                arrive(s) at school on time, sending in written
                                excuses for absences or tardiness, teaching my
                                child(ren) to respect school property, and
                                attending all events/meetings for parents.
                              </p>
                            </div>
                            <div className="mt-6">
                              <Label
                                htmlFor="agreementSignature"
                                className="text-sm font-medium text-gray-700 mb-1"
                              >
                                Please Print Your Name Below *
                              </Label>
                              <Input
                                id="agreementSignature"
                                name="agreementSignature"
                                value={formData.agreementSignature}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                style={{
                                  fontFamily: "Brush Script MT, cursive",
                                  fontSize: "20px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-4 sm:pt-6 border-t bg-gray-50">
                  <motion.button
                    type="button"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all text-xs sm:text-sm lg:text-base ${
                      currentPage === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 shadow-md"
                    }`}
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />{" "}
                    <span className="hidden sm:inline">Back</span>
                    <span className="sm:hidden">←</span>
                  </motion.button>

                  {currentPage < 2 ? (
                    <motion.button
                      type="button"
                      onClick={nextPage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md text-xs sm:text-sm lg:text-base"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="sm:hidden">→</span>{" "}
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all shadow-md text-xs sm:text-sm lg:text-base ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      }`}
                    >
                      <span className="hidden sm:inline">
                        {isSubmitting ? "Submitting..." : "Submit Enrollment"}
                      </span>
                      <span className="sm:hidden">
                        {isSubmitting ? "..." : "Submit"}
                      </span>{" "}
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.button>
                  )}
                </div>
              </form>
            </div>

            <motion.div
              className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Step {currentPage + 1} of {totalPages}: {steps[currentPage].title}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default NewEnrollmentForm;

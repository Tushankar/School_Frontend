"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import HealthForm from "./HealthForm";
import TransferRecordsForm from "./TransferRecordsForm";
import EmergencyContactForm from "./EmergencyContactForm";
import PictureAuthorizationForm from "./PictureAuthorizationForm";
import TuitionContractForm from "./TuitionContractForm";
import StudentRegistrationForm from "./StudentRegistrationForm";
import { cn } from "../lib/utils";

const steps = [
  { id: "registration", title: "Registration" },
  { id: "health", title: "Health Info" },
  { id: "records", title: "Records Transfer" },
  { id: "emergency", title: "Emergency Contact" },
  { id: "authorization", title: "Authorization" },
  { id: "tuition", title: "Tuition Contract" },
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

const EnrollmentForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const totalPages = 6;

  // Generate unique enrollment ID once when form loads
  const [enrollmentId] = useState(() => {
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
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    gradeLevel: "",
    houseNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    citizenship: "",
    ethnicity: "",
    fatherFirstName: "",
    fatherLastName: "",
    fatherAddress1: "",
    fatherAddress2: "",
    fatherCity: "",
    fatherState: "",
    fatherZip: "",
    fatherPhone: "",
    fatherEmail: "",
    fatherOccupation: "",
    fatherEmployment: "",
    fatherWorkPhone: "",
    motherFirstName: "",
    motherLastName: "",
    motherAddress1: "",
    motherAddress2: "",
    motherCity: "",
    motherState: "",
    motherZip: "",
    motherPhone: "",
    motherEmail: "",
    motherOccupation: "",
    motherEmployment: "",
    publicSchoolName: "",
    publicDistrict: "",
    previousSchoolName: "",
    previousSchoolPhone: "",
    previousSchoolAddress: "",
    reasonForLeaving: "",
    repeatedGrade: "",
    disciplinaryAction: "",
    subjectsExcel: "",
    subjectsStruggle: "",
    extracurricularActivities: "",
    siblings: [{ name: "", grade: "" }],
    printName: "",
    insuranceCompany: "",
    physicianName: "",
    physicianNumber: "",
    hasDisabilities: "No",
    disabilityExplanation: "",
    medicalConditions: {
      asthma: false,
      diabetes: false,
      convulsion: false,
      heartTrouble: false,
      frequentCold: false,
      stomachUpsets: false,
      faintingSpells: false,
      urinaryProblems: false,
      skinRash: false,
      soiling: false,
      soreThroats: false,
      earInfection: false,
      noneOfAbove: false,
    },
    pastDiseases: {
      mumps: false,
      chickenpox: false,
      hepatitis: false,
      scarletFever: false,
      tuberculosis: false,
      measles: false,
      noneOfAbove: false,
    },
    pastConditions: "",
    takesRegularMedication: "No",
    medicationExplanation: "",
    hasAllergies: "No",
    allergiesList: "",
    healthFormSignature: "",
    pictureAuthSignature: "",
    disciplineAcknowledgment: "",
    signerRole: "Parent",
    disciplineFormSignature: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianAddressLine1: "",
    guardianAddressLine2: "",
    guardianCity: "",
    guardianState: "",
    guardianZipCode: "",
    tuitionAcknowledgment: "",
    textbookFeeAcknowledgment: "",
    applicationFeeAcknowledgment: "",
    paymentOption1: false,
    paymentOption2: false,
    paymentOption3: false,
    tuitionContractSignature: "",
    emergencyContact1Name: "",
    emergencyContact1Phone: "",
    emergencyContact1Relationship: "",
    emergencyContact2Name: "",
    emergencyContact2Phone: "",
    emergencyContact2Relationship: "",
    emergencyContact3Name: "",
    emergencyContact3Phone: "",
    emergencyContact3Relationship: "",
    pediatricianName: "",
    pediatricianPhone: "",
    authorizedPickup: "",
    emergencyFormSignature: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (
        name.startsWith("medicalConditions.") ||
        name.startsWith("pastDiseases.")
      ) {
        const [category, field] = name.split(".");
        setFormData((prev) => ({
          ...prev,
          [category]: {
            ...prev[category],
            [field]: checked,
          },
        }));
      } else if (name === "gender" || name === "citizenship") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked ? value : "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSiblingChange = (index, field, value) => {
    const newSiblings = [...formData.siblings];
    newSiblings[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      siblings: newSiblings,
    }));
  };

  const addSibling = () => {
    setFormData((prev) => ({
      ...prev,
      siblings: [...prev.siblings, { name: "", grade: "" }],
    }));
  };

  const validatePage = (pageNumber) => {
    switch (pageNumber) {
      case 0: // Student Registration
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.gender ||
          !formData.dateOfBirth ||
          !formData.gradeLevel ||
          !formData.addressLine1 ||
          !formData.city ||
          !formData.state ||
          !formData.zipCode
        ) {
          toast.error("Please fill all required fields", {
            description:
              "First name, last name, gender, date of birth, grade, and address are required",
            duration: 4000,
          });
          return false;
        }
        break;

      case 1: // Health Form
        if (
          !formData.insuranceCompany ||
          !formData.physicianName ||
          !formData.physicianNumber ||
          !formData.healthFormSignature
        ) {
          toast.error("Please fill all required health fields", {
            description:
              "Insurance, physician information, and signature are required",
            duration: 4000,
          });
          return false;
        }
        break;

      case 2: // Transfer Records
        // Transfer records might be optional, but if filled, validate
        break;

      case 3: // Emergency Contact
        if (
          !formData.emergencyContact1Name ||
          !formData.emergencyContact1Phone ||
          !formData.emergencyContact1Relationship ||
          !formData.emergencyContact2Name ||
          !formData.emergencyContact2Phone ||
          !formData.emergencyContact2Relationship ||
          !formData.emergencyFormSignature
        ) {
          toast.error("Please fill all required emergency contact fields", {
            description:
              "At least 2 emergency contacts and signature are required",
            duration: 4000,
          });
          return false;
        }
        break;

      case 4: // Picture Authorization
        if (
          !formData.pictureAuthSignature ||
          !formData.disciplineAcknowledgment ||
          !formData.disciplineFormSignature
        ) {
          toast.error("Please complete authorization form", {
            description: "All signatures and acknowledgments are required",
            duration: 4000,
          });
          return false;
        }
        break;

      case 5: // Tuition Contract
        if (
          !formData.guardianFirstName ||
          !formData.guardianLastName ||
          !formData.guardianPhone ||
          !formData.guardianEmail ||
          !formData.guardianAddressLine1 ||
          !formData.guardianCity ||
          !formData.guardianState ||
          !formData.guardianZipCode ||
          !formData.tuitionContractSignature
        ) {
          toast.error("Please complete tuition contract", {
            description: "Guardian information and signature are required",
            duration: 4000,
          });
          return false;
        }
        if (
          !formData.tuitionAcknowledgment ||
          !formData.textbookFeeAcknowledgment ||
          !formData.applicationFeeAcknowledgment ||
          formData.tuitionAcknowledgment === "" ||
          formData.textbookFeeAcknowledgment === "" ||
          formData.applicationFeeAcknowledgment === ""
        ) {
          toast.error("Please acknowledge all fees", {
            description:
              "You must acknowledge tuition, textbook, and application fees",
            duration: 4000,
          });
          return false;
        }
        if (
          !formData.paymentOption1 &&
          !formData.paymentOption2 &&
          !formData.paymentOption3
        ) {
          toast.error("Please select a payment option", {
            description: "Choose how you would like to pay tuition",
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
      // Submit all forms to backend with enrollmentId
      const responses = await Promise.all([
        // 1. Student Registration
        fetch("http://localhost:4000/api/forms/student-registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId, // Link forms together
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            gradeLevel: formData.gradeLevel,
            houseNumber: formData.houseNumber,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            citizenship: formData.citizenship,
            ethnicity: formData.ethnicity,
            fatherFirstName: formData.fatherFirstName,
            fatherLastName: formData.fatherLastName,
            fatherAddress1: formData.fatherAddress1,
            fatherAddress2: formData.fatherAddress2,
            fatherCity: formData.fatherCity,
            fatherState: formData.fatherState,
            fatherZip: formData.fatherZip,
            fatherPhone: formData.fatherPhone,
            fatherEmail: formData.fatherEmail,
            fatherOccupation: formData.fatherOccupation,
            fatherEmployment: formData.fatherEmployment,
            fatherWorkPhone: formData.fatherWorkPhone,
            motherFirstName: formData.motherFirstName,
            motherLastName: formData.motherLastName,
            motherAddress1: formData.motherAddress1,
            motherAddress2: formData.motherAddress2,
            motherCity: formData.motherCity,
            motherState: formData.motherState,
            motherZip: formData.motherZip,
            motherPhone: formData.motherPhone,
            motherEmail: formData.motherEmail,
            motherOccupation: formData.motherOccupation,
            motherEmployment: formData.motherEmployment,
            publicSchoolName: formData.publicSchoolName,
            publicDistrict: formData.publicDistrict,
            previousSchoolName: formData.previousSchoolName,
            previousSchoolPhone: formData.previousSchoolPhone,
            previousSchoolAddress: formData.previousSchoolAddress,
            reasonForLeaving: formData.reasonForLeaving,
            repeatedGrade: formData.repeatedGrade,
            disciplinaryAction: formData.disciplinaryAction,
            subjectsExcel: formData.subjectsExcel,
            subjectsStruggle: formData.subjectsStruggle,
            extracurricularActivities: formData.extracurricularActivities,
            siblings: formData.siblings,
            printName: formData.printName,
          }),
        }),

        // 2. Health Form
        fetch("http://localhost:4000/api/forms/health-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId, // Link forms together
            insuranceCompany: formData.insuranceCompany,
            physicianName: formData.physicianName,
            physicianNumber: formData.physicianNumber,
            hasDisabilities: formData.hasDisabilities,
            disabilityExplanation: formData.disabilityExplanation,
            medicalConditions: formData.medicalConditions,
            pastDiseases: formData.pastDiseases,
            pastConditions: formData.pastConditions,
            takesRegularMedication: formData.takesRegularMedication,
            medicationExplanation: formData.medicationExplanation,
            hasAllergies: formData.hasAllergies,
            allergiesList: formData.allergiesList,
            healthFormSignature: formData.healthFormSignature,
          }),
        }),

        // 3. Emergency Contact
        fetch("http://localhost:4000/api/forms/emergency-contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId, // Link forms together
            emergencyContact1Name: formData.emergencyContact1Name,
            emergencyContact1Phone: formData.emergencyContact1Phone,
            emergencyContact1Relationship:
              formData.emergencyContact1Relationship,
            emergencyContact2Name: formData.emergencyContact2Name,
            emergencyContact2Phone: formData.emergencyContact2Phone,
            emergencyContact2Relationship:
              formData.emergencyContact2Relationship,
            emergencyContact3Name: formData.emergencyContact3Name,
            emergencyContact3Phone: formData.emergencyContact3Phone,
            emergencyContact3Relationship:
              formData.emergencyContact3Relationship,
            pediatricianName: formData.pediatricianName,
            pediatricianPhone: formData.pediatricianPhone,
            authorizedPickup: formData.authorizedPickup,
            emergencyFormSignature: formData.emergencyFormSignature,
          }),
        }),

        // 4. Picture Authorization
        fetch("http://localhost:4000/api/forms/picture-authorization", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId, // Link forms together
            pictureAuthSignature: formData.pictureAuthSignature,
            disciplineAcknowledgment: formData.disciplineAcknowledgment,
            signerRole: formData.signerRole,
            disciplineFormSignature: formData.disciplineFormSignature,
          }),
        }),

        // 5. Transfer Records
        fetch("http://localhost:4000/api/forms/transfer-records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId, // Link forms together
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            grade: formData.gradeLevel,
            previousSchoolName: formData.previousSchoolName,
            previousSchoolAddress: formData.previousSchoolAddress,
            previousSchoolCity: formData.previousSchoolCity || formData.city,
            previousSchoolState: formData.previousSchoolState || formData.state,
            previousSchoolZip: formData.previousSchoolZip || formData.zipCode,
            previousSchoolPhone: formData.previousSchoolPhone,
            parentGuardianName: `${formData.fatherFirstName} ${formData.fatherLastName}`,
            parentGuardianPhone: formData.fatherPhone,
            parentGuardianEmail: formData.fatherEmail,
            recordsNeeded: formData.recordsNeeded || "All Records",
            urgencyLevel: formData.urgencyLevel || "Standard",
            transferFormSignature:
              formData.transferFormSignature || formData.printName,
          }),
        }),

        // 6. Tuition Contract
        fetch("http://localhost:4000/api/forms/tuition-contract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId, // Link forms together
            guardianFirstName: formData.guardianFirstName,
            guardianLastName: formData.guardianLastName,
            guardianPhone: formData.guardianPhone,
            guardianEmail: formData.guardianEmail,
            guardianAddressLine1: formData.guardianAddressLine1,
            guardianAddressLine2: formData.guardianAddressLine2,
            guardianCity: formData.guardianCity,
            guardianState: formData.guardianState,
            guardianZipCode: formData.guardianZipCode,
            tuitionAcknowledgment: formData.tuitionAcknowledgment,
            textbookFeeAcknowledgment: formData.textbookFeeAcknowledgment,
            applicationFeeAcknowledgment: formData.applicationFeeAcknowledgment,
            paymentOption1: formData.paymentOption1,
            paymentOption2: formData.paymentOption2,
            paymentOption3: formData.paymentOption3,
            tuitionContractSignature: formData.tuitionContractSignature,
          }),
        }),
      ]);

      // Parse all responses
      const results = await Promise.all(responses.map((r) => r.json()));

      // Check if all submissions succeeded
      const allSuccess = results.every((r) => r.success);

      toast.dismiss("submit-toast");

      if (allSuccess) {
        toast.success("Enrollment Submitted Successfully!", {
          description:
            "All forms have been submitted. You will receive a confirmation email shortly.",
          duration: 5000,
        });

        // Reset form after successful submission
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const failedForms = results
          .map((r, i) =>
            !r.success
              ? [
                  "Student Registration",
                  "Health Form",
                  "Emergency Contact",
                  "Picture Authorization",
                  "Transfer Records",
                  "Tuition Contract",
                ][i]
              : null
          )
          .filter(Boolean);

        toast.error("Some forms failed to submit", {
          description: `Failed: ${failedForms.join(", ")}. Please try again.`,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting forms:", error);
      toast.dismiss("submit-toast");
      toast.error("Submission Error", {
        description:
          "Failed to submit enrollment forms. Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex h-screen bg-white">
      <div className="w-[25%]">
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
        className="w-[75%] p-4 h-full bg-gray-50 border-l-[12px] border-white overflow-y-auto hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="w-full h-full">
          <motion.div
            className="max-w-5xl mx-auto py-8 px-4 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <form onSubmit={handleSubmit}>
                <div className="p-6 lg:p-8 pb-6 border-b bg-gradient-to-r from-gray-50 to-slate-50">
                  <div className="flex items-center gap-4 lg:gap-6 mb-6">
                    <div className="w-16 h-16 lg:w-24 lg:h-24 flex-shrink-0">
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
                    <div>
                      <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-2">
                        ARA 2025 - 2026 New Student Enrollment Form
                      </h1>
                      <p className="text-sm lg:text-base text-gray-600">
                        Al-Rasheed Academy
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2">
                      {steps.map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.div
                            className={cn(
                              "w-4 h-4 lg:w-5 lg:h-5 rounded-full cursor-pointer transition-colors duration-300",
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
                              "text-xs mt-1.5 hidden sm:block",
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
                    <div className="p-6 lg:p-8">
                      {currentPage === 0 && (
                        <StudentRegistrationForm
                          formData={formData}
                          handleInputChange={handleInputChange}
                          handleSiblingChange={handleSiblingChange}
                          addSibling={addSibling}
                          onNext={nextPage}
                        />
                      )}

                      {currentPage === 1 && (
                        <HealthForm
                          formData={formData}
                          handleInputChange={handleInputChange}
                        />
                      )}

                      {currentPage === 2 && (
                        <TransferRecordsForm
                          formData={formData}
                          handleInputChange={handleInputChange}
                        />
                      )}

                      {currentPage === 3 && (
                        <EmergencyContactForm
                          formData={formData}
                          handleInputChange={handleInputChange}
                        />
                      )}

                      {currentPage === 4 && (
                        <PictureAuthorizationForm
                          formData={formData}
                          handleInputChange={handleInputChange}
                        />
                      )}

                      {currentPage === 5 && (
                        <TuitionContractForm
                          formData={formData}
                          handleInputChange={handleInputChange}
                        />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between px-6 lg:px-8 pb-6 lg:pb-8 pt-6 border-t bg-gray-50">
                  <motion.button
                    type="button"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
                    className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all text-sm lg:text-base ${
                      currentPage === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 shadow-md"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </motion.button>

                  {currentPage < 5 ? (
                    <motion.button
                      type="button"
                      onClick={nextPage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md text-sm lg:text-base"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all shadow-md text-sm lg:text-base ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Enrollment"}{" "}
                      <Check className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
              </form>
            </div>

            <motion.div
              className="mt-4 text-center text-sm text-gray-600"
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

export default EnrollmentForm;

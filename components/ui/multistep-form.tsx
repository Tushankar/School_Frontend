"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const steps = [
  { id: "personal", title: "Personal Information" },
  { id: "position", title: "Position Details" },
  { id: "resume-education", title: "Resume & Education" },
  { id: "work-experience", title: "Work Experience" },
  { id: "references", title: "References" },
  { id: "signature", title: "Signature" },
];

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  position: string;
  desiredPay: string;
  startDate: string;
  authorizedToWork: string;
  felonyConviction: string;
  resume: File | null;
  education: Array<{
    schoolName: string;
    schoolType: string;
    location: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    degree: string;
    major: string;
    yearsCompleted: string;
  }>;
  workExperience: Array<{
    company: string;
    phone: string;
    position: string;
    responsibilities: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    duration: string;
    contactForRef: string;
    reasonForLeaving: string;
  }>;
  references: Array<{
    firstName: string;
    lastName: string;
    company: string;
    title: string;
    phone: string;
    email: string;
  }>;
  signature: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    position: "",
    desiredPay: "",
    startDate: "",
    authorizedToWork: "",
    felonyConviction: "",
    resume: null,
    education: [{
      schoolName: "",
      schoolType: "",
      location: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      degree: "",
      major: "",
      yearsCompleted: "",
    }],
    workExperience: [{
      company: "",
      phone: "",
      position: "",
      responsibilities: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      duration: "",
      contactForRef: "",
      reasonForLeaving: "",
    }],
    references: [{
      firstName: "",
      lastName: "",
      company: "",
      title: "",
      phone: "",
      email: "",
    }],
    signature: "",
  });

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      toast.success("Step Completed", {
        description: `Moving to ${steps[currentStep + 1].title}`,
        duration: 2000,
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Final validation
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);
    
    const loadingToast = toast.loading("Submitting your application...", {
      description: "Please wait while we process your application",
    });

    try {
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address1', formData.addressLine1);
      formDataToSend.append('address2', formData.addressLine2);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('zipCode', formData.zipCode);
      
      // Job information
      formDataToSend.append('position', formData.position);
      formDataToSend.append('hourlyPay', formData.desiredPay);
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('workAuth', formData.authorizedToWork.charAt(0).toUpperCase() + formData.authorizedToWork.slice(1));
      formDataToSend.append('felony', formData.felonyConviction.charAt(0).toUpperCase() + formData.felonyConviction.slice(1));
      
      // Schools, work experience, and references as JSON
      formDataToSend.append('schools', JSON.stringify(formData.education));
      formDataToSend.append('workExperience', JSON.stringify(formData.workExperience));
      formDataToSend.append('references', JSON.stringify(formData.references));
      
      // Files
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }
      
      const response = await fetch('http://localhost:4000/api/job-applications', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      toast.dismiss(loadingToast);
      
      if (data.success) {
        toast.success("Application Submitted Successfully!", {
          description: "Thank you! We will review your application and contact you soon.",
          duration: 5000,
        });
        
        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        toast.error("Submission Failed", {
          description: data.message || "Unable to submit application. Please try again.",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error submitting application:", error);
      toast.error("Network Error", {
        description: "Unable to connect to the server. Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validate step and show toast for missing fields
  const validateStep = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Personal Information
        const missingPersonal = [];
        if (!formData.firstName.trim()) missingPersonal.push("First Name");
        if (!formData.lastName.trim()) missingPersonal.push("Last Name");
        if (!formData.email.trim()) missingPersonal.push("Email");
        if (!formData.phone.trim()) missingPersonal.push("Phone");
        if (!formData.addressLine1.trim()) missingPersonal.push("Address");
        if (!formData.city.trim()) missingPersonal.push("City");
        if (!formData.state.trim()) missingPersonal.push("State");
        if (!formData.zipCode.trim()) missingPersonal.push("Zip Code");
        
        if (missingPersonal.length > 0) {
          toast.error("Missing Required Fields", {
            description: `Please fill in: ${missingPersonal.join(", ")}`,
            duration: 4000,
          });
          return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error("Invalid Email", {
            description: "Please enter a valid email address",
            duration: 3000,
          });
          return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formData.phone)) {
          toast.error("Invalid Phone Number", {
            description: "Please enter a valid phone number",
            duration: 3000,
          });
          return false;
        }
        
        return true;
        
      case 1: // Position Details
        const missingJob = [];
        if (!formData.position.trim()) missingJob.push("Position");
        if (!formData.authorizedToWork) missingJob.push("Work Authorization");
        if (!formData.felonyConviction) missingJob.push("Felony Conviction Question");
        
        if (missingJob.length > 0) {
          toast.error("Missing Required Fields", {
            description: `Please fill in: ${missingJob.join(", ")}`,
            duration: 4000,
          });
          return false;
        }
        return true;
        
      case 2: // Resume & Education
        // Optional validation for education
        if (formData.education.length > 0) {
          const firstSchool = formData.education[0];
          if (firstSchool.schoolName.trim() && !firstSchool.schoolType) {
            toast.warning("Education Details Incomplete", {
              description: "Please select school type or remove the entry",
              duration: 3000,
            });
            return false;
          }
        }
        return true;
        
      case 3: // Work Experience
        return true; // Optional section
        
      case 4: // References
        return true; // Optional section
        
      case 5: // Signature
        if (!formData.signature.trim()) {
          toast.error("Signature Required", {
            description: "Please draw or type your signature",
            duration: 3000,
          });
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  // Check if step is valid for next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName.trim() !== "" && 
               formData.lastName.trim() !== "" && 
               formData.email.trim() !== "" && 
               formData.phone.trim() !== "" &&
               formData.addressLine1.trim() !== "" &&
               formData.city.trim() !== "" &&
               formData.state.trim() !== "" &&
               formData.zipCode.trim() !== "";
      case 1:
        return formData.position.trim() !== "" &&
               formData.authorizedToWork !== "" &&
               formData.felonyConviction !== "";
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return formData.signature.trim() !== "";
      default:
        return true;
    }
  };

  return (
    <div className="w-full h-full flex flex-col py-8">
      {/* Stepper removed - show only the form (first step visible) */}

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border shadow-md rounded-3xl overflow-hidden h-full flex flex-col">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <>
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
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
                          <CardTitle>Al-Rasheed Academy Employment Application</CardTitle>
                          <CardDescription>
                            3122 Abbott Road Orchard Park, NY 14127
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="firstName">First Name*</Label>
                          <Input
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) =>
                              updateFormData("firstName", e.target.value)
                            }
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="lastName">Last Name*</Label>
                          <Input
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) =>
                              updateFormData("lastName", e.target.value)
                            }
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </motion.div>
                      </div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="gender">Gender*</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            updateFormData("gender", value)
                          }
                        >
                          <SelectTrigger
                            id="gender"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="phone">Phone*</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) =>
                            updateFormData("phone", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="addressLine1">Address Line 1*</Label>
                        <Input
                          id="addressLine1"
                          placeholder="Address Line 1"
                          value={formData.addressLine1}
                          onChange={(e) =>
                            updateFormData("addressLine1", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                        <Input
                          id="addressLine2"
                          placeholder="Address Line 2"
                          value={formData.addressLine2}
                          onChange={(e) =>
                            updateFormData("addressLine2", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <div className="grid grid-cols-3 gap-4">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) =>
                              updateFormData("city", e.target.value)
                            }
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={(e) =>
                              updateFormData("state", e.target.value)
                            }
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            placeholder="Zip Code"
                            value={formData.zipCode}
                            onChange={(e) =>
                              updateFormData("zipCode", e.target.value)
                            }
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </motion.div>
                      </div>
                    </CardContent>
                  </>
                )}

                {/* Step 2: Position Details */}
                {currentStep === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle>Position Details</CardTitle>
                      <CardDescription>
                        Tell us about the position you&apos;re applying for
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="position">What position are you applying for?*</Label>
                        <Input
                          id="position"
                          placeholder="Position Title"
                          value={formData.position}
                          onChange={(e) =>
                            updateFormData("position", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="desiredPay">Desired Hourly Pay</Label>
                        <Input
                          id="desiredPay"
                          placeholder="e.g. $15.00"
                          value={formData.desiredPay}
                          onChange={(e) =>
                            updateFormData("desiredPay", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="startDate">Date you can start</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            updateFormData("startDate", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Are you authorized to work in the US?*</Label>
                        <RadioGroup
                          value={formData.authorizedToWork}
                          onValueChange={(value) =>
                            updateFormData("authorizedToWork", value)
                          }
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="auth-yes" />
                            <Label htmlFor="auth-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="auth-no" />
                            <Label htmlFor="auth-no">No</Label>
                          </div>
                        </RadioGroup>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Have you ever been convicted of a felony?*</Label>
                        <RadioGroup
                          value={formData.felonyConviction}
                          onValueChange={(value) =>
                            updateFormData("felonyConviction", value)
                          }
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="felony-yes" />
                            <Label htmlFor="felony-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="felony-no" />
                            <Label htmlFor="felony-no">No</Label>
                          </div>
                        </RadioGroup>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 3: Resume & Education */}
                {currentStep === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle>Resume & Education</CardTitle>
                      <CardDescription>
                        Upload your resume and provide education details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label htmlFor="resume">Resume</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              updateFormData("resume", e.target.files ? e.target.files[0] : null)
                            }
                            className="hidden"
                          />
                          <label htmlFor="resume" className="cursor-pointer">
                            <div className="text-gray-600">
                              <p className="text-lg">Upload or drag files here</p>
                              <p className="text-sm">Please upload your resume in PDF or Word format.</p>
                            </div>
                          </label>
                        </div>
                      </motion.div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Education</h3>
                        {formData.education.map((edu, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-4">
                            <h4 className="font-medium">School {index + 1}</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <motion.div variants={fadeInUp} className="space-y-2">
                                <Label>Name of School*</Label>
                                <Input
                                  placeholder="School Name"
                                  value={edu.schoolName}
                                  onChange={(e) => {
                                    const newEdu = [...formData.education];
                                    newEdu[index].schoolName = e.target.value;
                                    setFormData({ ...formData, education: newEdu });
                                  }}
                                />
                              </motion.div>
                              <motion.div variants={fadeInUp} className="space-y-2">
                                <Label>Type of School*</Label>
                                <Select
                                  value={edu.schoolType}
                                  onValueChange={(value) => {
                                    const newEdu = [...formData.education];
                                    newEdu[index].schoolType = value;
                                    setFormData({ ...formData, education: newEdu });
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="high-school">High School</SelectItem>
                                    <SelectItem value="college">College</SelectItem>
                                    <SelectItem value="trade-school">Bus. or Trade School</SelectItem>
                                    <SelectItem value="professional">Professional School</SelectItem>
                                  </SelectContent>
                                </Select>
                              </motion.div>
                            </div>
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>Location of School</Label>
                              <Input
                                placeholder="Address Line 1"
                                value={edu.addressLine1}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[index].addressLine1 = e.target.value;
                                  setFormData({ ...formData, education: newEdu });
                                }}
                              />
                            </motion.div>
                            <div className="grid grid-cols-3 gap-4">
                              <Input
                                placeholder="City"
                                value={edu.city}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[index].city = e.target.value;
                                  setFormData({ ...formData, education: newEdu });
                                }}
                              />
                              <Input
                                placeholder="State"
                                value={edu.state}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[index].state = e.target.value;
                                  setFormData({ ...formData, education: newEdu });
                                }}
                              />
                              <Input
                                placeholder="Zip Code"
                                value={edu.zipCode}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[index].zipCode = e.target.value;
                                  setFormData({ ...formData, education: newEdu });
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <motion.div variants={fadeInUp} className="space-y-2">
                                <Label>Degree Received</Label>
                                <Input
                                  placeholder="Degree"
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const newEdu = [...formData.education];
                                    newEdu[index].degree = e.target.value;
                                    setFormData({ ...formData, education: newEdu });
                                  }}
                                />
                              </motion.div>
                              <motion.div variants={fadeInUp} className="space-y-2">
                                <Label>Major</Label>
                                <Input
                                  placeholder="Major"
                                  value={edu.major}
                                  onChange={(e) => {
                                    const newEdu = [...formData.education];
                                    newEdu[index].major = e.target.value;
                                    setFormData({ ...formData, education: newEdu });
                                  }}
                                />
                              </motion.div>
                            </div>
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>Number of Years Completed</Label>
                              <Input
                                placeholder="Years"
                                value={edu.yearsCompleted}
                                onChange={(e) => {
                                  const newEdu = [...formData.education];
                                  newEdu[index].yearsCompleted = e.target.value;
                                  setFormData({ ...formData, education: newEdu });
                                }}
                              />
                            </motion.div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              education: [
                                ...formData.education,
                                {
                                  schoolName: "",
                                  schoolType: "",
                                  location: "",
                                  addressLine1: "",
                                  addressLine2: "",
                                  city: "",
                                  state: "",
                                  zipCode: "",
                                  degree: "",
                                  major: "",
                                  yearsCompleted: "",
                                },
                              ],
                            });
                          }}
                        >
                          Add School
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}

                {/* Step 4: Work Experience */}
                {currentStep === 3 && (
                  <>
                    <CardHeader>
                      <CardTitle>Work Experience</CardTitle>
                      <CardDescription>
                        Provide details about your work experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.workExperience.map((exp, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <h4 className="font-medium">Work Experience {index + 1}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>Name</Label>
                              <Input
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e) => {
                                  const newExp = [...formData.workExperience];
                                  newExp[index].company = e.target.value;
                                  setFormData({ ...formData, workExperience: newExp });
                                }}
                              />
                            </motion.div>
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>Phone</Label>
                              <Input
                                placeholder="Phone"
                                value={exp.phone}
                                onChange={(e) => {
                                  const newExp = [...formData.workExperience];
                                  newExp[index].phone = e.target.value;
                                  setFormData({ ...formData, workExperience: newExp });
                                }}
                              />
                            </motion.div>
                          </div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label>What was your position / responsibilities?*</Label>
                            <Textarea
                              placeholder="Position and responsibilities"
                              value={exp.responsibilities}
                              onChange={(e) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].responsibilities = e.target.value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                            />
                          </motion.div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label>Address</Label>
                            <Input
                              placeholder="Address Line 1"
                              value={exp.addressLine1}
                              onChange={(e) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].addressLine1 = e.target.value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                            />
                          </motion.div>
                          <div className="grid grid-cols-3 gap-4">
                            <Input
                              placeholder="City"
                              value={exp.city}
                              onChange={(e) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].city = e.target.value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                            />
                            <Input
                              placeholder="State"
                              value={exp.state}
                              onChange={(e) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].state = e.target.value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                            />
                            <Input
                              placeholder="Zip Code"
                              value={exp.zipCode}
                              onChange={(e) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].zipCode = e.target.value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                            />
                          </div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label>How long did you work there? (Years/Months)</Label>
                            <Input
                              placeholder="Duration"
                              value={exp.duration}
                              onChange={(e) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].duration = e.target.value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                            />
                          </motion.div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label>May we contact this place for reference?*</Label>
                            <RadioGroup
                              value={exp.contactForRef}
                              onValueChange={(value) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].contactForRef = value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id={`ref-yes-${index}`} />
                                <Label htmlFor={`ref-yes-${index}`}>Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id={`ref-no-${index}`} />
                                <Label htmlFor={`ref-no-${index}`}>No</Label>
                              </div>
                            </RadioGroup>
                          </motion.div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label>Reason for Leaving</Label>
                            <Textarea
                              placeholder="Reason for leaving"
                              value={exp.reasonForLeaving}
                              onChange={(e) => {
                                const newExp = [...formData.workExperience];
                                newExp[index].reasonForLeaving = e.target.value;
                                setFormData({ ...formData, workExperience: newExp });
                              }}
                            />
                          </motion.div>
                        </div>
                      ))}
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Do you want to add additional work experience?*</Label>
                        <RadioGroup
                          value={formData.workExperience.length > 1 ? "yes" : "no"}
                          onValueChange={(value) => {
                            if (value === "yes") {
                              setFormData({
                                ...formData,
                                workExperience: [
                                  ...formData.workExperience,
                                  {
                                    company: "",
                                    phone: "",
                                    position: "",
                                    responsibilities: "",
                                    addressLine1: "",
                                    addressLine2: "",
                                    city: "",
                                    state: "",
                                    zipCode: "",
                                    duration: "",
                                    contactForRef: "",
                                    reasonForLeaving: "",
                                  },
                                ],
                              });
                            }
                          }}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="add-exp-yes" />
                            <Label htmlFor="add-exp-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="add-exp-no" />
                            <Label htmlFor="add-exp-no">No</Label>
                          </div>
                        </RadioGroup>
                      </motion.div>
                    </CardContent>
                  </>
                )}

                {/* Step 5: References */}
                {currentStep === 4 && (
                  <>
                    <CardHeader>
                      <CardTitle>References</CardTitle>
                      <CardDescription>
                        Provide professional references
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.references.map((ref, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <h4 className="font-medium">Reference {index + 1}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>First</Label>
                              <Input
                                placeholder="First Name"
                                value={ref.firstName}
                                onChange={(e) => {
                                  const newRef = [...formData.references];
                                  newRef[index].firstName = e.target.value;
                                  setFormData({ ...formData, references: newRef });
                                }}
                              />
                            </motion.div>
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>Last</Label>
                              <Input
                                placeholder="Last Name"
                                value={ref.lastName}
                                onChange={(e) => {
                                  const newRef = [...formData.references];
                                  newRef[index].lastName = e.target.value;
                                  setFormData({ ...formData, references: newRef });
                                }}
                              />
                            </motion.div>
                          </div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label>Company</Label>
                            <Input
                              placeholder="Company"
                              value={ref.company}
                              onChange={(e) => {
                                const newRef = [...formData.references];
                                newRef[index].company = e.target.value;
                                setFormData({ ...formData, references: newRef });
                              }}
                            />
                          </motion.div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              placeholder="Title"
                              value={ref.title}
                              onChange={(e) => {
                                const newRef = [...formData.references];
                                newRef[index].title = e.target.value;
                                setFormData({ ...formData, references: newRef });
                              }}
                            />
                          </motion.div>
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>Phone</Label>
                              <Input
                                placeholder="Phone"
                                value={ref.phone}
                                onChange={(e) => {
                                  const newRef = [...formData.references];
                                  newRef[index].phone = e.target.value;
                                  setFormData({ ...formData, references: newRef });
                                }}
                              />
                            </motion.div>
                            <motion.div variants={fadeInUp} className="space-y-2">
                              <Label>Email</Label>
                              <Input
                                placeholder="Email"
                                value={ref.email}
                                onChange={(e) => {
                                  const newRef = [...formData.references];
                                  newRef[index].email = e.target.value;
                                  setFormData({ ...formData, references: newRef });
                                }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            references: [
                              ...formData.references,
                              {
                                firstName: "",
                                lastName: "",
                                company: "",
                                title: "",
                                phone: "",
                                email: "",
                              },
                            ],
                          });
                        }}
                      >
                        Add Reference
                      </Button>
                    </CardContent>
                  </>
                )}

                {/* Step 6: Signature */}
                {currentStep === 5 && (
                  <>
                    <CardHeader>
                      <CardTitle>Signature</CardTitle>
                      <CardDescription>
                        Please provide your signature
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <motion.div variants={fadeInUp} className="space-y-2">
                        <Label>Signature</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <div className="flex justify-center space-x-4 mb-4">
                            <button
                              type="button"
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              onClick={() => {
                                // Switch to drawing mode
                                const canvas = document.getElementById('signature-canvas') as HTMLCanvasElement;
                                if (canvas) {
                                  // Implement drawing mode
                                }
                              }}
                            >
                              Draw
                            </button>
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                              onClick={() => {
                                // Switch to typing mode
                                const input = document.getElementById('signature-input') as HTMLInputElement;
                                if (input) {
                                  input.focus();
                                }
                              }}
                            >
                              Type
                            </button>
                          </div>
                          <canvas
                            id="signature-canvas"
                            className="border border-gray-300 w-full h-32"
                            style={{ display: 'none' }}
                          ></canvas>
                          <input
                            id="signature-input"
                            type="text"
                            placeholder="Type your signature"
                            value={formData.signature}
                            onChange={(e) => updateFormData("signature", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </motion.div>
                    </CardContent>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 transition-all duration-300 rounded-2xl"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={
                    currentStep === steps.length - 1 ? handleSubmit : nextStep
                  }
                  disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "flex items-center gap-1 transition-all duration-300 rounded-2xl",
                    currentStep === steps.length - 1 ? "" : "",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Submit" : "Next"}
                      {currentStep === steps.length - 1 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      {/* Step indicator removed */}
    </div>
  );
};

export default OnboardingForm;
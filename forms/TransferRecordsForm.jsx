"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  FileText,
  School,
  MapPin,
  Phone,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const TransferRecordsForm = ({ formData, handleInputChange }) => {
  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Header Section */}
      <motion.div variants={fadeInUp} className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <FileText className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Transfer of Records Request
        </h2>
        <p className="text-gray-600 italic max-w-2xl mx-auto">
          Al-Rasheed Academy • 3122 Abbott Road • Orchard Park, NY 14127
        </p>
      </motion.div>

      {/* Student Information Card */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-blue-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Student Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Student Name and DOB */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Grade Level */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label htmlFor="gradeLevel" className="text-sm font-medium">
                Grade Level for Admission{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gradeLevel}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "gradeLevel", value } })
                }
              >
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kindergarten (KG)</SelectItem>
                  <SelectItem value="1st">1st Grade</SelectItem>
                  <SelectItem value="2nd">2nd Grade</SelectItem>
                  <SelectItem value="3rd">3rd Grade</SelectItem>
                  <SelectItem value="4th">4th Grade</SelectItem>
                  <SelectItem value="5th">5th Grade</SelectItem>
                  <SelectItem value="6th">6th Grade</SelectItem>
                  <SelectItem value="7th">7th Grade</SelectItem>
                  <SelectItem value="8th">8th Grade</SelectItem>
                  <SelectItem value="9th">9th Grade</SelectItem>
                  <SelectItem value="10th">10th Grade</SelectItem>
                  <SelectItem value="11th">11th Grade</SelectItem>
                  <SelectItem value="12th">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Previous School Information Card */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-purple-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <School className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-xl">
                Previous School Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Enter "N/A" if this is the first school your child will be
                  attending
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="previousSchoolName"
                  className="text-sm font-medium"
                >
                  Name of Previous School{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="previousSchoolName"
                  name="previousSchoolName"
                  value={formData.previousSchoolName}
                  onChange={handleInputChange}
                  placeholder="Enter school name or N/A"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="previousSchoolNumber"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  School Phone Number
                </Label>
                <Input
                  id="previousSchoolNumber"
                  name="previousSchoolNumber"
                  type="tel"
                  value={formData.previousSchoolNumber}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            {/* School Address */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                School Address
              </Label>
              <Input
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
              />
              <Input
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
                <Select
                  value={formData.state}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "state", value } })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-purple-500">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alaska">Alaska</SelectItem>
                    <SelectItem value="alabama">Alabama</SelectItem>
                    <SelectItem value="arizona">Arizona</SelectItem>
                    <SelectItem value="california">California</SelectItem>
                    <SelectItem value="florida">Florida</SelectItem>
                    <SelectItem value="georgia">Georgia</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="texas">Texas</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <Label htmlFor="faxNumber" className="text-sm font-medium">
                School Fax Number
              </Label>
              <Input
                id="faxNumber"
                name="faxNumber"
                type="tel"
                value={formData.faxNumber}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mailing Instructions */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <FileCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">
                  We request that all permanent school records be sent to:
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-medium">
                    Al-Rasheed Academy Registration Office
                  </p>
                  <p>3122 Abbott Road</p>
                  <p>Orchard Park, NY 14127</p>
                  <p className="mt-2 font-medium">
                    Or Faxed to: (716) 706-1303
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Records Request Card */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-green-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-xl">Records to Include</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4">
              Please check all records that should be transferred:
            </p>
            <div className="space-y-4">
              {[
                { key: "birthCertificate", label: "Birth Certificate" },
                {
                  key: "reportCards",
                  label:
                    "Report Cards, Standardized Test Scores, Attendance Records",
                },
                {
                  key: "specialEducation",
                  label:
                    "Any Special Education Information (IEP, 504 Plans, etc.)",
                },
                {
                  key: "healthRecords",
                  label: "Health and Immunization Records",
                },
                {
                  key: "disciplinary",
                  label:
                    "Disciplinary Records (referrals, counseling, detention, suspension, etc.)",
                },
              ].map(({ key, label }, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Checkbox
                    id={key}
                    checked={formData[key]}
                    onCheckedChange={(checked) =>
                      handleInputChange({
                        target: {
                          name: key,
                          checked,
                          type: "checkbox",
                        },
                      })
                    }
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={key}
                    className="cursor-pointer font-normal text-sm leading-relaxed"
                  >
                    {label}
                  </Label>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Parent Signature */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-gray-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Authorization Signature</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="parentSignature" className="text-sm font-medium">
                Parent/Guardian Name (Signature){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="parentSignature"
                name="parentSignature"
                value={formData.parentSignature}
                onChange={handleInputChange}
                placeholder="Type your full name as signature"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                By typing your name, you authorize the release of educational
                records to Al-Rasheed Academy
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TransferRecordsForm;

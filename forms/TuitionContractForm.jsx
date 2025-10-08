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
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  CreditCard,
  Info,
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

const TuitionContractForm = ({ formData, handleInputChange }) => {
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
          <div className="p-3 bg-green-100 rounded-lg">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Tuition Contract & Payment Agreement
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Financial responsibilities and payment schedule for enrollment
        </p>
      </motion.div>

      {/* Guardian Information */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-blue-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Guardian Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div
              variants={fadeInUp}
              className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4"
            >
              <p className="text-sm text-gray-700">
                <strong>Guardian responsible for paying tuition</strong>
              </p>
            </motion.div>

            {/* Name */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="guardianFirstName"
                  className="text-sm font-medium"
                >
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guardianFirstName"
                  name="guardianFirstName"
                  value={formData.guardianFirstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="guardianLastName"
                  className="text-sm font-medium"
                >
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guardianLastName"
                  name="guardianLastName"
                  value={formData.guardianLastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Phone and Email */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="guardianPhone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guardianPhone"
                  name="guardianPhone"
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="guardianEmail"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="guardianEmail"
                  name="guardianEmail"
                  type="email"
                  value={formData.guardianEmail}
                  onChange={handleInputChange}
                  placeholder="guardian@example.com"
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Address */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                name="guardianAddressLine1"
                value={formData.guardianAddressLine1}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <Input
                name="guardianAddressLine2"
                value={formData.guardianAddressLine2}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  name="guardianCity"
                  value={formData.guardianCity}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
                <Select
                  value={formData.guardianState}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "guardianState", value },
                    })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  name="guardianZipCode"
                  value={formData.guardianZipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fee Acknowledgments */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-green-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-xl">Fee Acknowledgments</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Annual Tuition */}
            <motion.div
              variants={fadeInUp}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Annual Tuition
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1 mb-3">
                    <li>
                      • Kindergarten through 8th grade: <strong>$4,500</strong>
                    </li>
                    <li>
                      • 9th through 12th grade: <strong>$5,500</strong>
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <Label
                      htmlFor="tuitionAcknowledgment"
                      className="text-sm font-medium"
                    >
                      Do you acknowledge and accept?{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.tuitionAcknowledgment}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "tuitionAcknowledgment", value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-white transition-all duration-300 focus:ring-2 focus:ring-green-500">
                        <SelectValue placeholder="Select your response" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="I Agree">✓ I Agree</SelectItem>
                        <SelectItem value="I Disagree">✗ I Disagree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Textbook Fee */}
            <motion.div
              variants={fadeInUp}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <FileText className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Textbooks & Resource Materials Fee
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1 mb-3">
                    <li>
                      • Kindergarten through 8th grade: <strong>$250</strong>
                    </li>
                    <li>
                      • 9th through 12th grade: <strong>$300</strong>
                    </li>
                    <li className="text-xs text-gray-600 mt-2">
                      Due as one-time payment at the beginning of the school
                      year
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <Label
                      htmlFor="textbookFeeAcknowledgment"
                      className="text-sm font-medium"
                    >
                      Do you acknowledge and accept?{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.textbookFeeAcknowledgment}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "textbookFeeAcknowledgment", value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-white transition-all duration-300 focus:ring-2 focus:ring-green-500">
                        <SelectValue placeholder="Select your response" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="I Agree">✓ I Agree</SelectItem>
                        <SelectItem value="I Disagree">✗ I Disagree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application Fee */}
            <motion.div
              variants={fadeInUp}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Application Processing Fee
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    One-time, non-refundable fee: <strong>$75</strong>
                  </p>
                  <div className="space-y-2">
                    <Label
                      htmlFor="applicationFeeAcknowledgment"
                      className="text-sm font-medium"
                    >
                      Do you acknowledge and accept?{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.applicationFeeAcknowledgment}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: {
                            name: "applicationFeeAcknowledgment",
                            value,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="bg-white transition-all duration-300 focus:ring-2 focus:ring-green-500">
                        <SelectValue placeholder="Select your response" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="I Agree">✓ I Agree</SelectItem>
                        <SelectItem value="I Disagree">✗ I Disagree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Schedule Options */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-purple-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-xl">
                Payment Schedule Options
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4">
              Please select one payment option:{" "}
              <span className="text-red-500">*</span>
            </p>
            <div className="space-y-4">
              {[
                {
                  key: "paymentOption1",
                  title: "Option 1: One-Time Payment",
                  description:
                    "Full annual tuition is due before September 1st.",
                  badge: "5% Discount",
                  badgeColor: "bg-green-100 text-green-800",
                },
                {
                  key: "paymentOption2",
                  title: "Option 2: Two Payments",
                  description:
                    "First payment due before September 1st, second payment due before January 1st.",
                  badge: "Split Payment",
                  badgeColor: "bg-blue-100 text-blue-800",
                },
                {
                  key: "paymentOption3",
                  title: "Option 3: Monthly Payments",
                  description: "Payments due before the 5th of each month.",
                  badge: "Auto-Pay Required",
                  badgeColor: "bg-purple-100 text-purple-800",
                },
              ].map((option, index) => (
                <motion.div
                  key={option.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-200 hover:border-purple-300"
                >
                  <Checkbox
                    id={option.key}
                    checked={formData[option.key]}
                    onCheckedChange={(checked) =>
                      handleInputChange({
                        target: {
                          name: option.key,
                          checked,
                          type: "checkbox",
                        },
                      })
                    }
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label
                        htmlFor={option.key}
                        className="cursor-pointer font-semibold text-sm"
                      >
                        {option.title}
                      </Label>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${option.badgeColor}`}
                      >
                        {option.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tuition Policy */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-orange-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Info className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Tuition Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              The following Tuition Policy ensures that tuition and fees are
              collected in a consistent and timely manner:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Application Requirements",
                  content:
                    "All registration, textbooks, and resource materials fees must be submitted with the enrollment or re-enrollment application for it to be processed.",
                },
                {
                  title: "Non-Refundable Fees",
                  content:
                    "Once a student begins attending classes, the textbooks and resource materials fee becomes non-refundable.",
                },
                {
                  title: "Tuition Due Dates",
                  content:
                    "Tuition payments are due based on the selected payment schedule. For monthly payment plans, tuition must be paid before the 5th of each month.",
                },
                {
                  title: "Full Month Tuition Requirement",
                  content:
                    "Full monthly tuition is due at the time of enrollment, regardless of the student's start date within the month.",
                },
                {
                  title: "Release of Academic Records",
                  content:
                    "Report cards, New York State test results, and official school records will not be released until all tuition and fees are paid in full.",
                },
                {
                  title: "Account Delinquency and Withdrawal",
                  content:
                    "Al-Rasheed Academy reserves the right to withhold school records and withdraw a student if tuition is not paid.",
                  subItems: [
                    "If tuition is not received after the due date, parents will receive a courtesy phone call and/or written notice.",
                    "If the account remains unpaid for 60 days, the student will not be allowed to attend school until the balance is paid in full.",
                  ],
                },
              ].map((policy, index) => (
                <div
                  key={index}
                  className="p-4 bg-orange-50 rounded-lg border border-orange-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {policy.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {policy.content}
                      </p>
                      {policy.subItems && (
                        <ul className="mt-2 space-y-1 ml-4">
                          {policy.subItems.map((item, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-orange-600">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Important Note:
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    If parents are unable to meet tuition obligations, it is
                    their responsibility, as required by New York State law, to
                    make alternative arrangements for their child's education,
                    either by enrolling in a public school or by establishing an
                    approved homeschooling plan. Parents are also encouraged to
                    review the Student-Parent Handbook for additional
                    information.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Signature */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-gray-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Contract Agreement</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label
                htmlFor="tuitionContractSignature"
                className="text-sm font-medium"
              >
                Guardian Signature <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tuitionContractSignature"
                name="tuitionContractSignature"
                value={formData.tuitionContractSignature}
                onChange={handleInputChange}
                placeholder="Type your full name as signature"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                By typing your name, you agree to the tuition contract and
                payment terms outlined above
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TuitionContractForm;

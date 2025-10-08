"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import {
  User,
  Users,
  School,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Info,
  Plus,
  CheckCircle2,
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

const StudentRegistrationForm = ({
  formData,
  handleInputChange,
  handleSiblingChange,
  addSibling,
}) => {
  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Student Basic Information */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-blue-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Student Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Name Fields */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Gender and DOB */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "gender", value, type: "radio" },
                    })
                  }
                  className="flex gap-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value="Male" id="male" />
                    <Label
                      htmlFor="male"
                      className="font-normal cursor-pointer"
                    >
                      Male
                    </Label>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value="Female" id="female" />
                    <Label
                      htmlFor="female"
                      className="font-normal cursor-pointer"
                    >
                      Female
                    </Label>
                  </motion.div>
                </RadioGroup>
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

            {/* Grade and House Number */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="gradeLevel" className="text-sm font-medium">
                  Grade Level <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gradeLevel}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "gradeLevel", value } })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Pre-K",
                      "Kindergarten",
                      "1st Grade",
                      "2nd Grade",
                      "3rd Grade",
                      "4th Grade",
                      "5th Grade",
                      "6th Grade",
                      "7th Grade",
                      "8th Grade",
                      "9th Grade",
                      "10th Grade",
                      "11th Grade",
                      "12th Grade",
                    ].map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="houseNumber" className="text-sm font-medium">
                  House Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="houseNumber"
                  name="houseNumber"
                  placeholder="e.g., 123"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Address Section */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                name="addressLine1"
                placeholder="Street Address"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <Input
                name="addressLine2"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
                <Select
                  value={formData.state}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "state", value } })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Alaska",
                      "Alabama",
                      "Arkansas",
                      "Arizona",
                      "California",
                      "Colorado",
                      "Connecticut",
                      "Florida",
                      "Georgia",
                      "Illinois",
                      "New York",
                      "Texas",
                    ].map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Citizenship and Ethnicity */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Citizenship <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {["US Citizen", "Permanent Resident", "Other"].map(
                    (option) => (
                      <motion.div
                        key={option}
                        whileHover={{ x: 2 }}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={option}
                          checked={formData.citizenship === option}
                          onCheckedChange={(checked) => {
                            if (checked)
                              handleInputChange({
                                target: { name: "citizenship", value: option },
                              });
                          }}
                        />
                        <Label
                          htmlFor={option}
                          className="font-normal cursor-pointer"
                        >
                          {option}
                        </Label>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ethnicity" className="text-sm font-medium">
                  Ethnicity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ethnicity"
                  name="ethnicity"
                  placeholder="Enter ethnicity"
                  value={formData.ethnicity}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* Father's Information */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-purple-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Father's Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="fatherFirstName"
                  className="text-sm font-medium"
                >
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherFirstName"
                  name="fatherFirstName"
                  placeholder="Father's first name"
                  value={formData.fatherFirstName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherLastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherLastName"
                  name="fatherLastName"
                  placeholder="Father's last name"
                  value={formData.fatherLastName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                name="fatherAddress1"
                placeholder="Street Address"
                value={formData.fatherAddress1}
                onChange={handleInputChange}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
              />
              <Input
                name="fatherAddress2"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.fatherAddress2}
                onChange={handleInputChange}
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  name="fatherCity"
                  placeholder="City"
                  value={formData.fatherCity}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
                <Select
                  value={formData.fatherState}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "fatherState", value },
                    })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-purple-500">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Alaska",
                      "Alabama",
                      "California",
                      "Texas",
                      "New York",
                      "Florida",
                    ].map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  name="fatherZip"
                  placeholder="Zip Code"
                  value={formData.fatherZip}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="fatherPhone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherPhone"
                  type="tel"
                  name="fatherPhone"
                  placeholder="(123) 456-7890"
                  value={formData.fatherPhone}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="fatherEmail"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherEmail"
                  type="email"
                  name="fatherEmail"
                  placeholder="father@example.com"
                  value={formData.fatherEmail}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="fatherOccupation"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Occupation
                </Label>
                <Input
                  id="fatherOccupation"
                  name="fatherOccupation"
                  placeholder="Occupation"
                  value={formData.fatherOccupation}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="fatherEmployment"
                  className="text-sm font-medium"
                >
                  Place of Employment
                </Label>
                <Input
                  id="fatherEmployment"
                  name="fatherEmployment"
                  placeholder="Company name"
                  value={formData.fatherEmployment}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <Label htmlFor="fatherWorkPhone" className="text-sm font-medium">
                Work Phone Number
              </Label>
              <Input
                id="fatherWorkPhone"
                type="tel"
                name="fatherWorkPhone"
                placeholder="(123) 456-7890"
                value={formData.fatherWorkPhone}
                onChange={handleInputChange}
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* Mother's Information */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-pink-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
              <CardTitle className="text-xl">Mother's Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="motherFirstName"
                  className="text-sm font-medium"
                >
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="motherFirstName"
                  name="motherFirstName"
                  placeholder="Mother's first name"
                  value={formData.motherFirstName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherLastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="motherLastName"
                  name="motherLastName"
                  placeholder="Mother's last name"
                  value={formData.motherLastName}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                name="motherAddress1"
                placeholder="Street Address"
                value={formData.motherAddress1}
                onChange={handleInputChange}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
              />
              <Input
                name="motherAddress2"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.motherAddress2}
                onChange={handleInputChange}
                className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  name="motherCity"
                  placeholder="City"
                  value={formData.motherCity}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                />
                <Select
                  value={formData.motherState}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "motherState", value },
                    })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-pink-500">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Alaska",
                      "Alabama",
                      "California",
                      "Texas",
                      "New York",
                      "Florida",
                    ].map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  name="motherZip"
                  placeholder="Zip Code"
                  value={formData.motherZip}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="motherPhone"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="motherPhone"
                type="tel"
                name="motherPhone"
                placeholder="(123) 456-7890"
                value={formData.motherPhone}
                onChange={handleInputChange}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="motherEmail"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="motherEmail"
                type="email"
                name="motherEmail"
                placeholder="mother@example.com"
                value={formData.motherEmail}
                onChange={handleInputChange}
                className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="motherOccupation"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Occupation
                </Label>
                <Input
                  id="motherOccupation"
                  name="motherOccupation"
                  placeholder="Occupation"
                  value={formData.motherOccupation}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="motherEmployment"
                  className="text-sm font-medium"
                >
                  Place of Employment
                </Label>
                <Input
                  id="motherEmployment"
                  name="motherEmployment"
                  placeholder="Company name"
                  value={formData.motherEmployment}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* School History */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-green-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <School className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-xl">School History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div
              variants={fadeInUp}
              className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  Al-Rasheed Academy is strongly committed to meeting the needs
                  of its students. In order to provide programs and resources to
                  meet our students' needs, we seek accurate and timely
                  information from families regarding the students learning
                  history.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="publicSchoolName"
                  className="text-sm font-medium"
                >
                  Name of public school your child would attend
                </Label>
                <Input
                  id="publicSchoolName"
                  name="publicSchoolName"
                  placeholder="Public school name"
                  value={formData.publicSchoolName}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicDistrict" className="text-sm font-medium">
                  Name of public district
                </Label>
                <Input
                  id="publicDistrict"
                  name="publicDistrict"
                  placeholder="School district"
                  value={formData.publicDistrict}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
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
                  Name of previous school
                </Label>
                <Input
                  id="previousSchoolName"
                  name="previousSchoolName"
                  placeholder="Previous school"
                  value={formData.previousSchoolName}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="previousSchoolPhone"
                  className="text-sm font-medium"
                >
                  School Phone Number
                </Label>
                <Input
                  id="previousSchoolPhone"
                  type="tel"
                  name="previousSchoolPhone"
                  placeholder="(123) 456-7890"
                  value={formData.previousSchoolPhone}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="previousSchoolAddress"
                  className="text-sm font-medium"
                >
                  School Address
                </Label>
                <Input
                  id="previousSchoolAddress"
                  name="previousSchoolAddress"
                  placeholder="Previous school address"
                  value={formData.previousSchoolAddress}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reasonForLeaving"
                  className="text-sm font-medium"
                >
                  Reason for leaving previous school
                </Label>
                <Input
                  id="reasonForLeaving"
                  name="reasonForLeaving"
                  placeholder="Reason for leaving"
                  value={formData.reasonForLeaving}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="repeatedGrade" className="text-sm font-medium">
                  Has the student ever repeated a grade?
                </Label>
                <Input
                  id="repeatedGrade"
                  name="repeatedGrade"
                  placeholder="If yes, describe which grade and why"
                  value={formData.repeatedGrade}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="disciplinaryAction"
                  className="text-sm font-medium"
                >
                  Any disciplinary actions?
                </Label>
                <Input
                  id="disciplinaryAction"
                  name="disciplinaryAction"
                  placeholder="If yes, describe which grade and why"
                  value={formData.disciplinaryAction}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="subjectsExcel" className="text-sm font-medium">
                  Subjects your child excels in
                </Label>
                <Input
                  id="subjectsExcel"
                  name="subjectsExcel"
                  placeholder="e.g., Math, Science"
                  value={formData.subjectsExcel}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="subjectsStruggle"
                  className="text-sm font-medium"
                >
                  Subjects your child struggles with
                </Label>
                <Input
                  id="subjectsStruggle"
                  name="subjectsStruggle"
                  placeholder="e.g., Reading, History"
                  value={formData.subjectsStruggle}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="extracurricularActivities"
                className="text-sm font-medium"
              >
                Extracurricular Activities
              </Label>
              <Textarea
                id="extracurricularActivities"
                name="extracurricularActivities"
                placeholder="List any clubs, Masjid activities, sports, or special programs..."
                value={formData.extracurricularActivities}
                onChange={handleInputChange}
                rows={3}
                className="transition-all duration-300 focus:ring-2 focus:ring-green-500"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* Siblings Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-orange-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <GraduationCap className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Siblings Enrollment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-gray-600">
              List all children that will be attending Al-Rasheed Academy
              (Complete a separate form for each child)
            </p>

            {formData.siblings.map((sibling, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor={`sibling-name-${index}`}
                    className="text-sm font-medium"
                  >
                    Student's Name{" "}
                    {index === 0 && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id={`sibling-name-${index}`}
                    value={sibling.name}
                    onChange={(e) =>
                      handleSiblingChange(index, "name", e.target.value)
                    }
                    placeholder="Enter student name"
                    required={index === 0}
                    className="transition-all duration-300 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={`sibling-grade-${index}`}
                    className="text-sm font-medium"
                  >
                    Grade{" "}
                    {index === 0 && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id={`sibling-grade-${index}`}
                    value={sibling.grade}
                    onChange={(e) =>
                      handleSiblingChange(index, "grade", e.target.value)
                    }
                    placeholder="Enter grade"
                    required={index === 0}
                    className="transition-all duration-300 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </motion.div>
            ))}

            {formData.siblings.length < 4 && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSibling}
                  className="w-full border-2 border-dashed border-orange-300 hover:border-orange-500 hover:bg-orange-50 text-orange-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Child
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* Enrollment Agreement */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-gray-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Enrollment Agreement</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                I hereby place my confidence in the ability of the
                administration and staff of the Al-Rasheed Academy to provide
                the educational instruction to my child(ren) at their discretion
                in accordance with the school set curriculum.
              </p>
              <p>
                I agree to accept all regulations of the school on the
                applicant's behalf and authorize the school to employ such
                discipline, as it deems wise and expedient for my child(ren). I
                realize that occasionally children may make an issue with
                actions that they do not agree with and that they are prone to
                take teacher criticisms out of context. I pledge that if this
                should occur, I will seek to clarify the matter with the teacher
                and/or Principal first. If necessary, I will correct my
                child(ren) and will support the school personnel.
              </p>
              <p>
                I will follow the same procedure for any school incidents that
                may occur. I pledge to build a strong relation with my
                child(ren)'s teachers and aid in the education of my child(ren)
                by providing an Islamic example at home, supporting the
                spiritual teaching of the school, following through with any
                homework assignments or slips to be signed, ensuring that my
                child(ren) arrive(s) at school on time, sending in written
                excuses for absences or tardiness, teaching my child(ren) to
                respect school property, and attending all events/meetings for
                parents.
              </p>
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="printName" className="text-sm font-medium">
                Please Print Your Name Below{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="printName"
                name="printName"
                value={formData.printName}
                onChange={handleInputChange}
                placeholder="Type your full name"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                By typing your name, you are providing a legal electronic
                signature
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StudentRegistrationForm;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Phone,
  User,
  Users,
  Shield,
  AlertCircle,
  Heart,
  Hospital,
  IdCard,
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

const EmergencyContactForm = ({ formData, handleInputChange }) => {
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
          <div className="p-3 bg-red-100 rounded-lg">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Emergency Contact Information
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please provide emergency contacts other than the child's parents. At
          least two contacts are required.
        </p>
      </motion.div>

      {/* Emergency Contacts Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-red-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-xl">Emergency Contacts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            {/* Contact One */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact One
                </h3>
                <span className="ml-auto px-2 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="emergencyContact1Name"
                    className="text-sm font-medium"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContact1Name"
                    name="emergencyContact1Name"
                    value={formData.emergencyContact1Name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="emergencyContact1Phone"
                    className="text-sm font-medium"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContact1Phone"
                    name="emergencyContact1Phone"
                    type="tel"
                    value={formData.emergencyContact1Phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="emergencyContact1Relationship"
                  className="text-sm font-medium"
                >
                  Relationship to Child <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emergencyContact1Relationship"
                  name="emergencyContact1Relationship"
                  value={formData.emergencyContact1Relationship}
                  onChange={handleInputChange}
                  placeholder="e.g., Aunt, Uncle, Grandparent, Friend"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-red-500"
                />
              </div>
            </motion.div>

            {/* Contact Two */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Two
                </h3>
                <span className="ml-auto px-2 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="emergencyContact2Name"
                    className="text-sm font-medium"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContact2Name"
                    name="emergencyContact2Name"
                    value={formData.emergencyContact2Name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="emergencyContact2Phone"
                    className="text-sm font-medium"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyContact2Phone"
                    name="emergencyContact2Phone"
                    type="tel"
                    value={formData.emergencyContact2Phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="emergencyContact2Relationship"
                  className="text-sm font-medium"
                >
                  Relationship to Child <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emergencyContact2Relationship"
                  name="emergencyContact2Relationship"
                  value={formData.emergencyContact2Relationship}
                  onChange={handleInputChange}
                  placeholder="e.g., Aunt, Uncle, Grandparent, Friend"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-red-500"
                />
              </div>
            </motion.div>

            {/* Contact Three (Optional) */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Three
                </h3>
                <span className="ml-auto px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                  Optional
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="emergencyContact3Name"
                    className="text-sm font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="emergencyContact3Name"
                    name="emergencyContact3Name"
                    value={formData.emergencyContact3Name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="transition-all duration-300 focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="emergencyContact3Phone"
                    className="text-sm font-medium"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="emergencyContact3Phone"
                    name="emergencyContact3Phone"
                    type="tel"
                    value={formData.emergencyContact3Phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    className="transition-all duration-300 focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="emergencyContact3Relationship"
                  className="text-sm font-medium"
                >
                  Relationship to Child
                </Label>
                <Input
                  id="emergencyContact3Relationship"
                  name="emergencyContact3Relationship"
                  value={formData.emergencyContact3Relationship}
                  onChange={handleInputChange}
                  placeholder="e.g., Aunt, Uncle, Grandparent, Friend"
                  className="transition-all duration-300 focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pickup Authorization Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-blue-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IdCard className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl">
                Authorized Pickup Persons
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div
              variants={fadeInUp}
              className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-800 font-medium">
                    Authorization to release child(ren) to the following persons
                  </p>
                  <p className="text-sm text-gray-700">
                    Al-Rasheed Academy staff will request proper identification
                    (driver's license or picture ID) before releasing your
                    child.
                  </p>
                  <p className="text-xs text-gray-600 italic mt-2">
                    Note: It is the parent's responsibility to inform authorized
                    persons to bring identification.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Authorized Person 1 */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Authorized Person 1
                </h3>
                <span className="ml-auto px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="authorizedPerson1Name"
                    className="text-sm font-medium"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="authorizedPerson1Name"
                    name="authorizedPerson1Name"
                    value={formData.authorizedPerson1Name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="authorizedPerson1Relation"
                    className="text-sm font-medium"
                  >
                    Relationship to Child{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="authorizedPerson1Relation"
                    name="authorizedPerson1Relation"
                    value={formData.authorizedPerson1Relation}
                    onChange={handleInputChange}
                    placeholder="e.g., Aunt, Uncle, Family Friend"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="authorizedPerson1Phone"
                  className="text-sm font-medium"
                >
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="authorizedPerson1Phone"
                  name="authorizedPerson1Phone"
                  type="tel"
                  value={formData.authorizedPerson1Phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Authorized Person 2 */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Authorized Person 2
                </h3>
                <span className="ml-auto px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="authorizedPerson2Name"
                    className="text-sm font-medium"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="authorizedPerson2Name"
                    name="authorizedPerson2Name"
                    value={formData.authorizedPerson2Name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="authorizedPerson2Relation"
                    className="text-sm font-medium"
                  >
                    Relationship to Child{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="authorizedPerson2Relation"
                    name="authorizedPerson2Relation"
                    value={formData.authorizedPerson2Relation}
                    onChange={handleInputChange}
                    placeholder="e.g., Aunt, Uncle, Family Friend"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="authorizedPerson2Phone"
                  className="text-sm font-medium"
                >
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="authorizedPerson2Phone"
                  name="authorizedPerson2Phone"
                  type="tel"
                  value={formData.authorizedPerson2Phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Authorized Person 3 (Optional) */}
            <motion.div
              variants={fadeInUp}
              className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Authorized Person 3
                </h3>
                <span className="ml-auto px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                  Optional
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="authorizedPerson3Name"
                    className="text-sm font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="authorizedPerson3Name"
                    name="authorizedPerson3Name"
                    value={formData.authorizedPerson3Name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="transition-all duration-300 focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="authorizedPerson3Relation"
                    className="text-sm font-medium"
                  >
                    Relationship to Child
                  </Label>
                  <Input
                    id="authorizedPerson3Relation"
                    name="authorizedPerson3Relation"
                    value={formData.authorizedPerson3Relation}
                    onChange={handleInputChange}
                    placeholder="e.g., Aunt, Uncle, Family Friend"
                    className="transition-all duration-300 focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="authorizedPerson3Phone"
                  className="text-sm font-medium"
                >
                  Phone Number
                </Label>
                <Input
                  id="authorizedPerson3Phone"
                  name="authorizedPerson3Phone"
                  type="tel"
                  value={formData.authorizedPerson3Phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  className="transition-all duration-300 focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </motion.div>

            {/* Walk Home Notice */}
            <motion.div
              variants={fadeInUp}
              className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-800 font-semibold">
                    Walk Home Authorization
                  </p>
                  <p className="text-sm text-gray-700">
                    If you want your child to walk home, please submit a written
                    note to the office.
                  </p>
                  <p className="text-xs text-gray-600 font-semibold mt-2">
                    ** Grade 5 and Up ONLY **
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Medical Authorization Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-green-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-xl">
                Emergency Medical Authorization
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div
              variants={fadeInUp}
              className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <Hospital className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-800 font-medium">
                    Medical Emergency Permission
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This gives Al-Rasheed Academy's staff permission to seek
                    appropriate medical attention for your child(ren) in case of
                    an emergency. This also gives consent to appropriate medical
                    or hospital personnel to provide emergency medical care
                    until the legal guardians arrive.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="hospitalChoice"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Hospital className="h-4 w-4" />
                Preferred Hospital(s)
              </Label>
              <p className="text-xs text-gray-600 mb-2">
                If you have a preferred hospital, please list it below:
              </p>
              <Textarea
                id="hospitalChoice"
                name="hospitalChoice"
                value={formData.hospitalChoice}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter preferred hospital name(s) and location..."
                className="transition-all duration-300 focus:ring-2 focus:ring-green-500 resize-none"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Signature Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-gray-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Shield className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Authorization Signature</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label
                htmlFor="emergencyFormSignature"
                className="text-sm font-medium"
              >
                Parent/Guardian Signature{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emergencyFormSignature"
                name="emergencyFormSignature"
                value={formData.emergencyFormSignature}
                onChange={handleInputChange}
                placeholder="Type your full name as signature"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                By typing your name, you authorize all emergency procedures and
                pickups outlined above
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EmergencyContactForm;

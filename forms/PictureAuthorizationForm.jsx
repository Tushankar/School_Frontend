"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Camera,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Users,
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

const PictureAuthorizationForm = ({ formData, handleInputChange }) => {
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
          <div className="p-3 bg-purple-100 rounded-lg">
            <Camera className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Authorization & Policies
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Picture authorization, participation consent, and discipline
          guidelines
        </p>
      </motion.div>

      {/* Picture & Publishing Authorization */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-purple-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Camera className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-xl">
                Media & Publishing Authorization
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Al-Rasheed Academy operations are sustained by charitable
                    donations. For fundraising and promotional purposes, the
                    academy may conduct video, photography, display of student
                    work, and live performances throughout the academic year.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <p className="text-sm text-gray-800 font-medium">
                      By signing below, you consent to Al-Rasheed Academy
                      including your child(ren) in promotional activities unless
                      you submit a written statement stating otherwise.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="pictureAuthSignature"
                className="text-sm font-medium"
              >
                Parent/Guardian Signature{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pictureAuthSignature"
                name="pictureAuthSignature"
                value={formData.pictureAuthSignature}
                onChange={handleInputChange}
                placeholder="Type your full name as signature"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 bg-purple-50 border-purple-300"
              />
              <p className="text-xs text-gray-500 mt-2">
                This signature authorizes media consent for promotional
                activities
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Participation & Religious Policy */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-blue-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl">
                Participation Authorization
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    I hereby authorize Al-Rasheed Academy to allow my child to
                    participate in all school activities including
                    extra-curricular activities and field trips.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900">
                      Religious Policy
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Al-Rasheed Academy's religious policy and activities are
                      based on mainstream interpretation of Quran and Sunnah.
                      Activities not conforming to the above shall be reviewed
                      on a case-by-case basis by the school board and the Imam
                      if necessary.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> If you do not want your child to
                    participate in any specific activities at Al-Rasheed
                    Academy, you must give prior written consent to the
                    administration office.
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Discipline Guidelines */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-green-200 transition-colors">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-xl">
                Discipline & Guidance Policy
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Core Principles */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Core Discipline Principles
              </h3>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-2">
                <p className="text-sm text-gray-800 font-medium">
                  Discipline must be:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">1.</span>
                    <span>Individualized and consistent for each child</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">2.</span>
                    <span>
                      Appropriate to the child's level of understanding
                    </span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">3.</span>
                    <span>
                      Directed toward teaching the child acceptable behavior and
                      self-control
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Positive Methods */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Positive Guidance Methods
              </h3>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-3">
                  Caregivers use positive methods of discipline and guidance
                  that encourage self-esteem, self-control, and self-direction:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">•</span>
                    <span>
                      Using praise and encouragement of good behavior instead of
                      focusing only upon unacceptable behavior
                    </span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">•</span>
                    <span>
                      Reminding a child of behavior expectations daily by using
                      clear, positive statements
                    </span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">•</span>
                    <span>Redirecting behavior using positive statements</span>
                  </li>
                  <li className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">•</span>
                    <span>
                      Using brief supervised separation or time-out from the
                      group, when appropriate for the child's age and
                      development
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Prohibited Actions */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Prohibited Discipline Methods
              </h3>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-sm text-gray-800 font-medium mb-3">
                  There must be no harsh, cruel, or unusual treatment of any
                  child. The following types of discipline are strictly
                  prohibited:
                </p>
                <ul className="space-y-2 ml-4">
                  {[
                    "Corporal punishment or threats of corporal punishment",
                    "Punishment associated with food, naps, or toilet training",
                    "Pinching, shaking, or biting a child",
                    "Hitting a child with a hand or instrument",
                    "Putting anything in or on a child's mouth",
                    "Humiliating, ridiculing, rejecting, or yelling at a child",
                    "Subjecting a child to harsh, abusive, or profane language",
                    "Placing a child in a locked or dark room, bathroom, or closet with the door closed",
                    "Requiring a child to remain silent or inactive for an inappropriately long period of time",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-red-600 font-bold mt-0.5">
                        {index + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Acknowledgment */}
            <motion.div variants={fadeInUp} className="space-y-2 pt-4">
              <Label
                htmlFor="disciplineAcknowledgment"
                className="text-sm font-medium"
              >
                Acknowledgment of Discipline Policy{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="disciplineAcknowledgment"
                name="disciplineAcknowledgment"
                value={formData.disciplineAcknowledgment}
                onChange={handleInputChange}
                placeholder="Type your full name to acknowledge"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500">
                By typing your name, you acknowledge you have read and
                understand the discipline policy
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Signer Role & Final Signature */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-gray-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileCheck className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Final Authorization</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Role Selection */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <Label className="text-sm font-medium">
                I am signing as: <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.signerRole}
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "signerRole", value, type: "radio" },
                  })
                }
                className="space-y-3"
              >
                {[
                  { value: "Parent", label: "Parent/Guardian" },
                  { value: "Employee/Caregiver", label: "Employee/Caregiver" },
                  {
                    value: "Household member of child-care home",
                    label: "Household Member of Child-Care Home",
                  },
                ].map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ x: 2 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`role-${option.value}`}
                    />
                    <Label
                      htmlFor={`role-${option.value}`}
                      className="cursor-pointer font-normal flex-1"
                    >
                      {option.label}
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </motion.div>

            {/* Final Signature */}
            <motion.div variants={fadeInUp} className="space-y-2 pt-4">
              <Label
                htmlFor="disciplineFormSignature"
                className="text-sm font-medium"
              >
                Final Signature <span className="text-red-500">*</span>
              </Label>
              <Input
                id="disciplineFormSignature"
                name="disciplineFormSignature"
                value={formData.disciplineFormSignature}
                onChange={handleInputChange}
                placeholder="Type your full name as signature"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                By typing your name, you authorize all policies and procedures
                outlined above
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PictureAuthorizationForm;

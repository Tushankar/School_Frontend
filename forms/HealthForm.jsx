"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Card, CardContent } from "./components/ui/card";
import {
  Heart,
  Stethoscope,
  Pill,
  AlertTriangle,
  AlertCircle,
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
      staggerChildren: 0.1,
    },
  },
};

const HealthForm = ({ formData, handleInputChange }) => {
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Heart className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Health Form</h2>
          <p className="text-sm text-gray-600">
            Student medical information and emergency details
          </p>
        </div>
      </motion.div>

      {/* Insurance & Physician Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-blue-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Insurance & Physician Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} className="space-y-2">
                <Label
                  htmlFor="insuranceCompany"
                  className="text-sm font-medium"
                >
                  Name of Insurance Company{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="insuranceCompany"
                  name="insuranceCompany"
                  value={formData.insuranceCompany}
                  onChange={handleInputChange}
                  placeholder="Enter insurance company name"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <Label htmlFor="physicianName" className="text-sm font-medium">
                  Name of Physician <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="physicianName"
                  name="physicianName"
                  value={formData.physicianName}
                  onChange={handleInputChange}
                  placeholder="Enter physician name"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <Label
                  htmlFor="physicianNumber"
                  className="text-sm font-medium"
                >
                  Physician's Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="physicianNumber"
                  name="physicianNumber"
                  value={formData.physicianNumber}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-3">
                <Label className="text-sm font-medium">
                  Does your child have any disabilities?
                </Label>
                <RadioGroup
                  value={formData.hasDisabilities}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "hasDisabilities", value, type: "radio" },
                    })
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="disabilities-yes" />
                    <Label
                      htmlFor="disabilities-yes"
                      className="cursor-pointer font-normal"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="disabilities-no" />
                    <Label
                      htmlFor="disabilities-no"
                      className="cursor-pointer font-normal"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </motion.div>
            </div>

            {formData.hasDisabilities === "Yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-2"
              >
                <Label
                  htmlFor="disabilityExplanation"
                  className="text-sm font-medium"
                >
                  Please explain the disability
                </Label>
                <Input
                  id="disabilityExplanation"
                  name="disabilityExplanation"
                  value={formData.disabilityExplanation}
                  onChange={handleInputChange}
                  placeholder="Provide details about the disability"
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Medical Conditions Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-red-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Medical Conditions <span className="text-red-500">*</span>
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Please check all conditions that apply to your child
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  { key: "asthma", label: "Asthma" },
                  { key: "diabetes", label: "Diabetes" },
                  { key: "convulsion", label: "Convulsion" },
                  { key: "heartTrouble", label: "Heart Trouble" },
                  { key: "frequentCold", label: "Frequent Cold" },
                  { key: "stomachUpsets", label: "Stomach Upsets" },
                  { key: "faintingSpells", label: "Fainting Spells" },
                ].map(({ key, label }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={`condition-${key}`}
                      checked={formData.medicalConditions[key]}
                      onCheckedChange={(checked) =>
                        handleInputChange({
                          target: {
                            name: `medicalConditions.${key}`,
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <Label
                      htmlFor={`condition-${key}`}
                      className="cursor-pointer font-normal text-sm"
                    >
                      {label}
                    </Label>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { key: "urinaryProblems", label: "Urinary Problems" },
                  { key: "skinRash", label: "Problems with skin rash" },
                  { key: "soiling", label: "Problems with soiling" },
                  { key: "soreThroats", label: "Frequent sore throats" },
                  { key: "earInfection", label: "Frequent ear infection" },
                  { key: "noneOfAbove", label: "None of the above" },
                ].map(({ key, label }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={`condition-${key}`}
                      checked={formData.medicalConditions[key]}
                      onCheckedChange={(checked) =>
                        handleInputChange({
                          target: {
                            name: `medicalConditions.${key}`,
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <Label
                      htmlFor={`condition-${key}`}
                      className="cursor-pointer font-normal text-sm"
                    >
                      {label}
                    </Label>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Past Diseases Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-purple-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Past Diseases <span className="text-red-500">*</span>
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Has your child had any of the following diseases?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  { key: "mumps", label: "Mumps" },
                  { key: "chickenpox", label: "Chickenpox" },
                  { key: "hepatitis", label: "Hepatitis" },
                  { key: "scarletFever", label: "Scarlet Fever" },
                ].map(({ key, label }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={`disease-${key}`}
                      checked={formData.pastDiseases[key]}
                      onCheckedChange={(checked) =>
                        handleInputChange({
                          target: {
                            name: `pastDiseases.${key}`,
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <Label
                      htmlFor={`disease-${key}`}
                      className="cursor-pointer font-normal text-sm"
                    >
                      {label}
                    </Label>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { key: "tuberculosis", label: "Tuberculosis" },
                  { key: "measles", label: "Measles" },
                  { key: "noneOfAbove", label: "None of the above" },
                ].map(({ key, label }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={`disease-${key}`}
                      checked={formData.pastDiseases[key]}
                      onCheckedChange={(checked) =>
                        handleInputChange({
                          target: {
                            name: `pastDiseases.${key}`,
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <Label
                      htmlFor={`disease-${key}`}
                      className="cursor-pointer font-normal text-sm"
                    >
                      {label}
                    </Label>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeInUp} className="mt-6 space-y-2">
              <Label htmlFor="pastConditions" className="text-sm font-medium">
                Other conditions/diseases your child may have had
              </Label>
              <Input
                id="pastConditions"
                name="pastConditions"
                value={formData.pastConditions}
                onChange={handleInputChange}
                placeholder="List any other past conditions"
                className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Medication & Allergies Section */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 hover:border-green-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Medication & Allergies
              </h3>
            </div>

            <div className="space-y-6">
              {/* Regular Medication */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp} className="space-y-3">
                  <Label className="text-sm font-medium">
                    Does your child take any medication regularly?
                  </Label>
                  <RadioGroup
                    value={formData.takesRegularMedication}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: {
                          name: "takesRegularMedication",
                          value,
                          type: "radio",
                        },
                      })
                    }
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="medication-yes" />
                      <Label
                        htmlFor="medication-yes"
                        className="cursor-pointer font-normal"
                      >
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="medication-no" />
                      <Label
                        htmlFor="medication-no"
                        className="cursor-pointer font-normal"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                {formData.takesRegularMedication === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="medicationExplanation"
                      className="text-sm font-medium"
                    >
                      Please list all medications
                    </Label>
                    <Input
                      id="medicationExplanation"
                      name="medicationExplanation"
                      value={formData.medicationExplanation}
                      onChange={handleInputChange}
                      placeholder="List medication names and dosages"
                      className="transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </motion.div>
                )}
              </div>

              {/* Allergies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp} className="space-y-3">
                  <Label className="text-sm font-medium">
                    Does your child have any allergies?
                  </Label>
                  <RadioGroup
                    value={formData.hasAllergies}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "hasAllergies", value, type: "radio" },
                      })
                    }
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="allergies-yes" />
                      <Label
                        htmlFor="allergies-yes"
                        className="cursor-pointer font-normal"
                      >
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="allergies-no" />
                      <Label
                        htmlFor="allergies-no"
                        className="cursor-pointer font-normal"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                {formData.hasAllergies === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="allergiesList"
                      className="text-sm font-medium"
                    >
                      Please list all allergies
                    </Label>
                    <Input
                      id="allergiesList"
                      name="allergiesList"
                      value={formData.allergiesList}
                      onChange={handleInputChange}
                      placeholder="List all known allergies"
                      className="transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Parent Signature */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-gray-300">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label
                htmlFor="healthFormSignature"
                className="text-sm font-medium"
              >
                Parent's / Guardian's Signature{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="healthFormSignature"
                name="healthFormSignature"
                value={formData.healthFormSignature}
                onChange={handleInputChange}
                placeholder="Type your full name as signature"
                required
                className="font-serif text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
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

export default HealthForm;

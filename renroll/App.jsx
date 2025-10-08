import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Checkbox } from "./components/ui/checkbox";
import { FormProvider } from "./components/enrollment-form/form-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Separator } from "./components/ui/separator";

const gradeLevels = [
  "Pre-K",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
const steps = [
  { id: "student", title: "Student Information" },
  { id: "emergency", title: "Emergency Contacts" },
  { id: "tuition", title: "Tuition Contract" },
];
const araLogo = "/assets/logo.png";

function ProgressBar({ currentStep }) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transform transition-all duration-300 ease-in-out bg-background
                  ${
                    index <= currentStep
                      ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg"
                      : "border-muted text-muted-foreground scale-100"
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ease-in-out ${
                  index <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative w-full">
          <div className="w-full h-2.5 bg-muted-foreground/20 rounded-full overflow-hidden">
            <div
              className="relative h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div
            className="absolute transition-all duration-500"
            style={{
              left: `${progress}%`,
              top: "-28px",
              transform: `translateX(-50%) scale(${progress < 3 ? 0 : 1})`,
              opacity: progress < 3 ? 0 : 1,
            }}
          >
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-semibold shadow-lg">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentInfo({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <div className="bg-neutral-50 p-4 rounded-lg border">
        <p className="text-sm">
          The Al-Rasheed Academy is strongly committed to meeting the needs of
          its students. In order to provide programs and resources to meet our
          students' needs, we seek accurate and timely information from all
          parents.
        </p>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Child's Name *</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="childFirstName"
            placeholder="First"
            value={formData.childFirstName}
            onChange={(e) =>
              setFormData({ ...formData, childFirstName: e.target.value })
            }
            required
          />
          <Input
            id="childLastName"
            placeholder="Last"
            value={formData.childLastName}
            onChange={(e) =>
              setFormData({ ...formData, childLastName: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) =>
              setFormData({ ...formData, gender: value })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ethnicity">Ethnicity *</Label>
          <Input
            id="ethnicity"
            placeholder="Ethnicity"
            value={formData.ethnicity}
            onChange={(e) =>
              setFormData({ ...formData, ethnicity: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gradeLevel">Grade Level Child will be Entering *</Label>
        <select
          id="gradeLevel"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.gradeLevel}
          onChange={(e) =>
            setFormData({ ...formData, gradeLevel: e.target.value })
          }
          required
        >
          <option value="">Select Grade Level</option>
          {gradeLevels.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Additional Children to Enroll</Label>
        <RadioGroup
          value={formData.hasAdditionalChildren}
          onValueChange={(value) => {
            setFormData({
              ...formData,
              hasAdditionalChildren: value,
              numberOfChildren: value === "yes" ? 2 : 1,
            });
          }}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="hasAdditionalChildren-yes" />
            <Label htmlFor="hasAdditionalChildren-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="hasAdditionalChildren-no" />
            <Label htmlFor="hasAdditionalChildren-no">No</Label>
          </div>
        </RadioGroup>

        {formData.hasAdditionalChildren === "yes" && (
          <div className="space-y-4">
            <Label className="text-base">Number of Additional Children</Label>
            <RadioGroup
              value={String(formData.numberOfChildren)}
              onValueChange={(value) =>
                setFormData({ ...formData, numberOfChildren: Number(value) })
              }
              className="flex flex-wrap gap-4"
            >
              {[2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(num)} id={`children-${num}`} />
                  <Label htmlFor={`children-${num}`}>{num} Children</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {formData.hasAdditionalChildren === "yes" &&
          Array.from(
            { length: formData.numberOfChildren - 1 },
            (_, i) => i + 2
          ).map((childNum) => (
            <div
              key={childNum}
              className="space-y-6 border-t pt-6 animate-fade-in"
            >
              <h3 className="text-lg font-semibold">
                Child {childNum} Information
              </h3>

              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Child's Name *
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id={`child${childNum}FirstName`}
                    placeholder="First"
                    value={formData[`child${childNum}FirstName`] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`child${childNum}FirstName`]: e.target.value,
                      })
                    }
                    required
                  />
                  <Input
                    id={`child${childNum}LastName`}
                    placeholder="Last"
                    value={formData[`child${childNum}LastName`] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`child${childNum}LastName`]: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor={`child${childNum}Gender`}>Gender *</Label>
                  <RadioGroup
                    value={formData[`child${childNum}Gender`] || ""}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        [`child${childNum}Gender`]: value,
                      })
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="male"
                        id={`child${childNum}Male`}
                      />
                      <Label htmlFor={`child${childNum}Male`}>Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="female"
                        id={`child${childNum}Female`}
                      />
                      <Label htmlFor={`child${childNum}Female`}>Female</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`child${childNum}DateOfBirth`}>
                    Date of Birth *
                  </Label>
                  <Input
                    id={`child${childNum}DateOfBirth`}
                    type="date"
                    value={formData[`child${childNum}DateOfBirth`] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`child${childNum}DateOfBirth`]: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`child${childNum}Ethnicity`}>
                    Ethnicity *
                  </Label>
                  <Input
                    id={`child${childNum}Ethnicity`}
                    placeholder="Ethnicity"
                    value={formData[`child${childNum}Ethnicity`] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`child${childNum}Ethnicity`]: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`child${childNum}GradeLevel`}>
                  Grade Level Child will be Entering *
                </Label>
                <Input
                  id={`child${childNum}GradeLevel`}
                  placeholder="Grade level"
                  value={formData[`child${childNum}GradeLevel`] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`child${childNum}GradeLevel`]: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
          ))}
      </div>

      <div className="space-y-4">
        <Label className="text-base">Address *</Label>
        <div className="space-y-2">
          <Input
            id="address1"
            placeholder="Address Line 1"
            value={formData.address1}
            onChange={(e) =>
              setFormData({ ...formData, address1: e.target.value })
            }
            required
          />
          <Input
            id="address2"
            placeholder="Address Line 2 (Optional)"
            value={formData.address2}
            onChange={(e) =>
              setFormData({ ...formData, address2: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <select
            id="state"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <Input
            id="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            required
          />
        </div>
      </div>

      {/* Father's Information */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Father's Name *</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="fatherFirstName"
            placeholder="First"
            value={formData.fatherFirstName}
            onChange={(e) =>
              setFormData({ ...formData, fatherFirstName: e.target.value })
            }
            required
          />
          <Input
            id="fatherLastName"
            placeholder="Last"
            value={formData.fatherLastName}
            onChange={(e) =>
              setFormData({ ...formData, fatherLastName: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fatherPhone">Father's Phone Number *</Label>
          <Input
            id="fatherPhone"
            type="tel"
            placeholder="Phone number"
            value={formData.fatherPhone}
            onChange={(e) =>
              setFormData({ ...formData, fatherPhone: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherEmail">Father's Email *</Label>
          <Input
            id="fatherEmail"
            type="email"
            placeholder="Email"
            value={formData.fatherEmail}
            onChange={(e) =>
              setFormData({ ...formData, fatherEmail: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Father's Address *</Label>
        <div className="space-y-2">
          <Input
            id="fatherAddress1"
            placeholder="Address Line 1"
            value={formData.fatherAddress1}
            onChange={(e) =>
              setFormData({ ...formData, fatherAddress1: e.target.value })
            }
            required
          />
          <Input
            id="fatherAddress2"
            placeholder="Address Line 2"
            value={formData.fatherAddress2}
            onChange={(e) =>
              setFormData({ ...formData, fatherAddress2: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            id="fatherCity"
            placeholder="City"
            value={formData.fatherCity}
            onChange={(e) =>
              setFormData({ ...formData, fatherCity: e.target.value })
            }
            required
          />
          <select
            id="fatherState"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.fatherState}
            onChange={(e) =>
              setFormData({ ...formData, fatherState: e.target.value })
            }
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <Input
            id="fatherZipCode"
            placeholder="Zip Code"
            value={formData.fatherZipCode}
            onChange={(e) =>
              setFormData({ ...formData, fatherZipCode: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fatherOccupation">Occupation</Label>
          <Input
            id="fatherOccupation"
            placeholder="Occupation"
            value={formData.fatherOccupation}
            onChange={(e) =>
              setFormData({ ...formData, fatherOccupation: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherEmployment">Place of Employment</Label>
          <Input
            id="fatherEmployment"
            placeholder="Place of Employment"
            value={formData.fatherEmployment}
            onChange={(e) =>
              setFormData({ ...formData, fatherEmployment: e.target.value })
            }
          />
        </div>
      </div>

      {/* Mother's Information */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Mother's Name *</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="motherFirstName"
            placeholder="First"
            value={formData.motherFirstName}
            onChange={(e) =>
              setFormData({ ...formData, motherFirstName: e.target.value })
            }
            required
          />
          <Input
            id="motherLastName"
            placeholder="Last"
            value={formData.motherLastName}
            onChange={(e) =>
              setFormData({ ...formData, motherLastName: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="motherPhone">Mother's Phone Number *</Label>
          <Input
            id="motherPhone"
            type="tel"
            placeholder="Phone number"
            value={formData.motherPhone}
            onChange={(e) =>
              setFormData({ ...formData, motherPhone: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="motherEmail">Mother's Email</Label>
          <Input
            id="motherEmail"
            type="email"
            placeholder="Email"
            value={formData.motherEmail}
            onChange={(e) =>
              setFormData({ ...formData, motherEmail: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Label>Is Mother's address same as above?</Label>
          <RadioGroup
            value={formData.isMotherAddressSame}
            onValueChange={(value) =>
              setFormData({ ...formData, isMotherAddressSame: value })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="motherAddress-yes" />
              <Label htmlFor="motherAddress-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="motherAddress-no" />
              <Label htmlFor="motherAddress-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.isMotherAddressSame === "no" && (
          <div className="space-y-4">
            <Label className="text-base">Mother's Address</Label>
            <div className="space-y-2">
              <Input
                id="motherAddress1"
                placeholder="Address Line 1"
                value={formData.motherAddress1}
                onChange={(e) =>
                  setFormData({ ...formData, motherAddress1: e.target.value })
                }
              />
              <Input
                id="motherAddress2"
                placeholder="Address Line 2"
                value={formData.motherAddress2}
                onChange={(e) =>
                  setFormData({ ...formData, motherAddress2: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                id="motherCity"
                placeholder="City"
                value={formData.motherCity}
                onChange={(e) =>
                  setFormData({ ...formData, motherCity: e.target.value })
                }
              />
              <select
                id="motherState"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.motherState}
                onChange={(e) =>
                  setFormData({ ...formData, motherState: e.target.value })
                }
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <Input
                id="motherZipCode"
                placeholder="Zip Code"
                value={formData.motherZipCode}
                onChange={(e) =>
                  setFormData({ ...formData, motherZipCode: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="motherOccupation">Occupation</Label>
          <Input
            id="motherOccupation"
            placeholder="Occupation"
            value={formData.motherOccupation}
            onChange={(e) =>
              setFormData({ ...formData, motherOccupation: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="motherEmployment">Place of Employment</Label>
          <Input
            id="motherEmployment"
            placeholder="Place of Employment"
            value={formData.motherEmployment}
            onChange={(e) =>
              setFormData({ ...formData, motherEmployment: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="schoolDistrict">
          Name of school district in which your child resides: *
        </Label>
        <Input
          id="schoolDistrict"
          placeholder="School district"
          value={formData.schoolDistrict}
          onChange={(e) =>
            setFormData({ ...formData, schoolDistrict: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Acknowledgement</h3>
        <div className="bg-neutral-50 p-4 rounded-lg border">
          <p className="text-sm">
            To the best of my ability, we have/will provided accurate and
            truthful information on this application for admission. I understand
            and agree that the admissions process cannot be completed until I
            have provided all required documents. I agree to the fee terms &
            conditions stated. I understand that incorrect and incomplete
            information and late or non-payment of fees and/or tuition may
            result in delays and possible declination of admission.
          </p>
          <p className="text-sm mt-2">
            I acknowledge receipt of Re-Enrollment information packet. I further
            understand that the school policies and procedures are available for
            review at the school office. I have read and understood the
            Al-Rasheed Academy's tuition & fee policy.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signature">Signature *</Label>
          <Input
            id="signature"
            placeholder="Type your full name as signature"
            value={formData.signature}
            onChange={(e) =>
              setFormData({ ...formData, signature: e.target.value })
            }
            required
          />
        </div>

        {Array.from({ length: formData.numberOfChildren }, (_, i) => (
          <div key={`health-${i + 1}`} className="space-y-4 animate-fade-in">
            <Label className="text-base">
              Have there been any changes to{" "}
              {i === 0 ? "child 1's" : `child ${i + 1}'s`} health in the last
              year? If yes, please fill out the following form.
            </Label>
            <RadioGroup
              value={formData[`child${i + 1}HealthChanges`]}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  [`child${i + 1}HealthChanges`]: value,
                })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id={`child${i + 1}HealthChanges-yes`}
                />
                <Label htmlFor={`child${i + 1}HealthChanges-yes`}>Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id={`child${i + 1}HealthChanges-no`}
                />
                <Label htmlFor={`child${i + 1}HealthChanges-no`}>No</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmergencyContacts({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <div className="bg-neutral-50 p-4 rounded-lg border">
        <h3 className="text-base font-semibold mb-2">
          Emergency Contact & Release Information
        </h3>
        <p className="text-sm mb-4">
          (other than child's parents, must be at least two contacts)
        </p>
      </div>

      <div className="space-y-6">
        {/* First Contact */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">First Contact</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency1Name">First Contact's Name *</Label>
              <Input
                id="emergency1Name"
                placeholder="Full name"
                value={formData.emergency1Name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergency1Name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency1Phone">
                First Contact's Phone Number *
              </Label>
              <Input
                id="emergency1Phone"
                placeholder="Phone number"
                type="tel"
                value={formData.emergency1Phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergency1Phone: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency1Relationship">
              Relationship to child *
            </Label>
            <Input
              id="emergency1Relationship"
              placeholder="Relationship"
              value={formData.emergency1Relationship}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergency1Relationship: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Second Contact */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Second Contact</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency2Name">Second Contact's Name *</Label>
              <Input
                id="emergency2Name"
                placeholder="Full name"
                value={formData.emergency2Name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergency2Name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency2Phone">
                Second Contact's Phone Number *
              </Label>
              <Input
                id="emergency2Phone"
                placeholder="Phone number"
                type="tel"
                value={formData.emergency2Phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergency2Phone: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency2Relationship">
              Relationship to child *
            </Label>
            <Input
              id="emergency2Relationship"
              placeholder="Relationship"
              value={formData.emergency2Relationship}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergency2Relationship: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Third Contact */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Third Contact</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency3Name">Third Contact's Name</Label>
              <Input
                id="emergency3Name"
                placeholder="Full name"
                value={formData.emergency3Name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergency3Name: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency3Phone">
                Third Contact's Phone Number
              </Label>
              <Input
                id="emergency3Phone"
                placeholder="Phone number"
                type="tel"
                value={formData.emergency3Phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergency3Phone: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency3Relationship">
              Relationship to child
            </Label>
            <Input
              id="emergency3Relationship"
              placeholder="Relationship"
              value={formData.emergency3Relationship}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergency3Relationship: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-neutral-50 p-4 rounded-lg border">
          <h3 className="text-base font-semibold mb-2">
            Authorization for Student Release
          </h3>
          <p className="text-sm">
            I/We the Parent(s)/Guardian(s) give authorization to the Al-Rasheed
            Academy's staff to release the child (ren) listed above to the
            following person/people after providing the academy with proper
            identity (such as driver's license or picture identification)**
            note: It is the parents responsibility to inform the person/people
            picking up the child/children to have identification**
          </p>
        </div>

        <div className="space-y-4 p-4 border rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authorizedPerson1">Authorized Person 1 *</Label>
              <Input
                id="authorizedPerson1"
                placeholder="Full name"
                value={formData.authorizedPerson1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedPerson1: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorizedPerson1Phone">Phone *</Label>
              <Input
                id="authorizedPerson1Phone"
                placeholder="Phone number"
                type="tel"
                value={formData.authorizedPerson1Phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedPerson1Phone: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorizedPerson1Relationship">
              Relationship to child *
            </Label>
            <Input
              id="authorizedPerson1Relationship"
              placeholder="Relationship"
              value={formData.authorizedPerson1Relationship}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  authorizedPerson1Relationship: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Authorized Person 2 */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authorizedPerson2">Authorized Person 2 *</Label>
              <Input
                id="authorizedPerson2"
                placeholder="Full name"
                value={formData.authorizedPerson2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedPerson2: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorizedPerson2Phone">Phone *</Label>
              <Input
                id="authorizedPerson2Phone"
                placeholder="Phone number"
                type="tel"
                value={formData.authorizedPerson2Phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedPerson2Phone: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorizedPerson2Relationship">
              Relationship to child *
            </Label>
            <Input
              id="authorizedPerson2Relationship"
              placeholder="Relationship"
              value={formData.authorizedPerson2Relationship}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  authorizedPerson2Relationship: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Authorized Person 3 */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authorizedPerson3">Authorized Person 3</Label>
              <Input
                id="authorizedPerson3"
                placeholder="Full name"
                value={formData.authorizedPerson3}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedPerson3: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorizedPerson3Phone">Phone</Label>
              <Input
                id="authorizedPerson3Phone"
                placeholder="Phone number"
                type="tel"
                value={formData.authorizedPerson3Phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorizedPerson3Phone: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorizedPerson3Relationship">
              Relationship to child
            </Label>
            <Input
              id="authorizedPerson3Relationship"
              placeholder="Relationship"
              value={formData.authorizedPerson3Relationship}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  authorizedPerson3Relationship: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-red-500">
            **Grade 5 and Up ONLY**
          </p>
          <p className="text-sm">
            If you want your child to walk home, please submit a written note to
            the office
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-neutral-50 p-4 rounded-lg border">
            <p className="text-sm">
              This gives Al-Rasheed Academy's staff permission to seek
              appropriate medical attention to my child (ren) in the case of an
              emergency. This also gives consent to appropriate medical or
              hospital personnel to provide emergency medical care until the
              legal guardians of the above named child (ren) arrive. If there is
              a choice of hospitals to send your child to please list it below.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospitalPreference">
              If there is a choice of hospitals to send your child to please
              list it below.
            </Label>
            <Input
              id="hospitalPreference"
              placeholder="Preferred hospital"
              value={formData.hospitalPreference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hospitalPreference: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentSignature">Parent's Signature *</Label>
            <Input
              id="parentSignature"
              placeholder="Type your full name as signature"
              value={formData.parentSignature}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  parentSignature: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TuitionContract({ formData, setFormData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Tuition Contract</h2>

      <div className="space-y-6">
        {/* Guardian Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guardianName">
                Guardian Responsible for paying tuition *
              </Label>
              <Input
                id="guardianName"
                placeholder="Full name"
                value={formData.guardianName}
                onChange={(e) =>
                  setFormData({ ...formData, guardianName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Input
                id="guardianName2"
                placeholder="Additional guardian (if applicable)"
                value={formData.guardianName2}
                onChange={(e) =>
                  setFormData({ ...formData, guardianName2: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="homePhone">Home Phone Number *</Label>
              <Input
                id="homePhone"
                type="tel"
                placeholder="Phone number"
                value={formData.homePhone}
                onChange={(e) =>
                  setFormData({ ...formData, homePhone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianEmail">Email *</Label>
              <Input
                id="guardianEmail"
                type="email"
                placeholder="Email address"
                value={formData.guardianEmail}
                onChange={(e) =>
                  setFormData({ ...formData, guardianEmail: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address1"
              placeholder="Address Line 1"
              value={formData.address1}
              onChange={(e) =>
                setFormData({ ...formData, address1: e.target.value })
              }
              required
            />
            <Input
              id="address2"
              placeholder="Address Line 2"
              value={formData.address2}
              onChange={(e) =>
                setFormData({ ...formData, address2: e.target.value })
              }
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
              <select
                id="state"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <Input
                id="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Tuition Acknowledgment */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <Label className="text-sm" htmlFor="acknowledgeTuition">
              I acknowledge and accept that the annual tuition is $4,500 for
              Kindergarten through 8th grade students, and $5,500 for 9th
              through 12th grade students. *
            </Label>
            <select
              id="acknowledgeTuition"
              className="mt-2 w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.acknowledgeTuition}
              onChange={(e) =>
                setFormData({ ...formData, acknowledgeTuition: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes, I acknowledge</option>
              <option value="no">No, I do not acknowledge</option>
            </select>
          </div>

          <div className="p-4 border rounded-lg">
            <Label className="text-sm" htmlFor="acknowledgeTextbookFee">
              I acknowledge and accept that the annual textbooks and resource
              materials fee is $250 for Kindergarten through 8th grade students,
              and $300 for 9th through 12th grade students. This fee is due as a
              one-time payment at the beginning of the school year. *
            </Label>
            <select
              id="acknowledgeTextbookFee"
              className="mt-2 w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.acknowledgeTextbookFee}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  acknowledgeTextbookFee: e.target.value,
                })
              }
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes, I acknowledge</option>
              <option value="no">No, I do not acknowledge</option>
            </select>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Tuition Payment Schedule Options — Please select one: *
          </Label>
          <RadioGroup
            value={formData.paymentOption}
            onValueChange={(value) =>
              setFormData({ ...formData, paymentOption: value })
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1" className="text-sm">
                Option 1: One-time payment — Full annual tuition is due before
                September 1st. A 5% discount will be applied.
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2" className="text-sm">
                Option 2: Two payments — The first payment is due before
                September 1st, and the second payment is due before January 1st.
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3" className="text-sm">
                Option 3: Monthly payments — Payments are due before the 5th of
                each month. Automatic payment enrollment is required for this
                option.
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Tuition Policy */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tuition Policy</h3>
          <div className="space-y-4 text-sm">
            <p>
              The following Tuition Policy ensures that tuition and fees are
              collected in a consistent and timely manner:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <span className="font-semibold">Application Requirements:</span>
                <p>
                  Registration, textbooks, and resource materials fees must be
                  submitted with the enrollment or re-enrollment application for
                  it to be complete.
                </p>
              </li>
              <li>
                <span className="font-semibold">Non-Refundable Fees:</span>
                <p>
                  Once a student begins attending classes, the textbooks and
                  resource materials fee becomes non-refundable.
                </p>
              </li>
              <li>
                <span className="font-semibold">Tuition Due Dates:</span>
                <p>
                  Tuition payments are due based on the selected payment
                  schedule. For monthly payment plans, tuition must be paid
                  before the 5th of each month.
                </p>
              </li>
              <li>
                <span className="font-semibold">
                  Full Month Tuition Requirement:
                </span>
                <p>
                  Full monthly tuition is due at the time of enrollment,
                  regardless of the student's start date within the month.
                </p>
              </li>
              <li>
                <span className="font-semibold">
                  Release of Academic Records:
                </span>
                <p>
                  Report cards, New York State test results, and official school
                  records will not be released until all tuition and fees are
                  paid in full.
                </p>
              </li>
              <li>
                <span className="font-semibold">
                  Account Delinquency and Withdrawal:
                </span>
                <p>
                  If parents are unable to meet tuition obligations, it is their
                  responsibility, as required by New York State law, to make
                  alternate arrangements for their child's education, either by
                  enrolling in a public school or by establishing an approved
                  homeschooling plan. Parents are also encouraged to review the
                  Student-Parent Handbook for additional information.
                </p>
              </li>
            </ol>

            <div className="mt-6 p-4 border rounded-lg bg-neutral-50">
              <h4 className="font-semibold mb-2">Important Note:</h4>
              <p>
                If parents are unable to meet tuition obligations, it is their
                responsibility, as required by New York State law, to make
                alternative arrangements for their child's education, either by
                enrolling in a public school or by establishing an approved
                homeschooling plan. Parents are also encouraged to review the
                Student-Parent Handbook for additional information.
              </p>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="space-y-2">
          <Label htmlFor="signature">Signature *</Label>
          <Input
            id="signature"
            placeholder="Type your full name as signature"
            value={formData.signature}
            onChange={(e) =>
              setFormData({ ...formData, signature: e.target.value })
            }
            required
          />
        </div>
      </div>
    </div>
  );
}

function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/assets/re1.png",
    "/assets/re2.png",
    "/assets/re3.png",
    "/assets/re4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-neutral-900 relative overflow-hidden h-full">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Overlay */}
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
}

function MiniProgressBar({ progress, isVisible }) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed left-4 top-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center gap-2 ${
        isVisible ? "progress-slide-in" : "progress-slide-out"
      }`}
      style={{ width: "120px" }}
    >
      <div className="relative flex-1 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-medium text-primary whitespace-nowrap">
        {Math.round(progress)}%
      </span>
    </div>
  );
}

function App() {
  const [showMiniProgress, setShowMiniProgress] = useState(false);
  const [formData, setFormData] = useState({
    // Student Information
    childFirstName: "",
    childLastName: "",
    gender: "",
    dateOfBirth: "",
    ethnicity: "",
    gradeLevel: "",
    hasAdditionalChildren: "no",
    numberOfChildren: 1,
    signature: "",
    child1HealthChanges: "no",
    child2HealthChanges: "no",
    child3HealthChanges: "no",
    child4HealthChanges: "no",
    child5HealthChanges: "no",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    schoolDistrict: "",

    // Father's Information
    fatherFirstName: "",
    fatherLastName: "",
    fatherPhone: "",
    fatherEmail: "",
    fatherAddress1: "",
    fatherAddress2: "",
    fatherCity: "",
    fatherState: "",
    fatherZipCode: "",
    fatherOccupation: "",
    fatherEmployment: "",

    // Mother's Information
    motherFirstName: "",
    motherLastName: "",
    motherPhone: "",
    motherEmail: "",
    isMotherAddressSame: "yes",
    motherAddress1: "",
    motherAddress2: "",
    motherCity: "",
    motherState: "",
    motherZipCode: "",
    motherOccupation: "",
    motherEmployment: "",

    // Emergency Contacts
    emergency1Name: "",
    emergency1Phone: "",
    emergency1Relationship: "",
    emergency2Name: "",
    emergency2Phone: "",
    emergency2Relationship: "",
    emergency3Name: "",
    emergency3Phone: "",
    emergency3Relationship: "",
    authorizedPerson1: "",
    authorizedPerson1Phone: "",
    authorizedPerson1Relationship: "",
    authorizedPerson2: "",
    authorizedPerson2Phone: "",
    authorizedPerson2Relationship: "",
    authorizedPerson3: "",
    authorizedPerson3Phone: "",
    authorizedPerson3Relationship: "",
    hospitalPreference: "",
    parentSignature: "",

    // Tuition Contract
    guardianName: "",
    guardianName2: "",
    homePhone: "",
    guardianEmail: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    acknowledgeTuition: "",
    acknowledgeTextbookFee: "",
    paymentOption: "",
    signature: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the main progress bar element position
      const progressBar = document.getElementById("main-progress-bar");
      if (progressBar) {
        const rect = progressBar.getBoundingClientRect();
        setShowMiniProgress(rect.bottom < 0); // Show when main progress bar is scrolled out of view
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <FormProvider>
      <main className="flex h-screen bg-white">
        <div className="w-[25%]">
          <ImageCarousel />
        </div>
        <div className="w-[75%] p-4 h-full bg-gray-50 border-l-[12px] border-white overflow-y-auto hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="w-full h-full">
            <MiniProgressBar progress={progress} isVisible={showMiniProgress} />
        <div className="w-full space-y-8">
          <div className="flex items-center justify-between pb-6 border-b">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
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
                  .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #fbbf24;
                    transition: width 0.3s ease;
                  }
                  .nav-link:hover::after {
                    width: 100%;
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
                <h1 className="text-2xl font-bold text-[#1B4965]">
                  ARA 2025-2026 Re-Enrollment Form
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Current students must re-enroll for the upcoming school year
                </p>
              </div>
            </div>
          </div>

          <Card id="main-progress-bar">
            <CardHeader>
              <ProgressBar currentStep={currentStep} />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent id="form-content">
              <div className="transition-opacity duration-300 ease-in-out">
                {currentStep === 0 && (
                  <div className="animate-fadeIn">
                    <StudentInfo
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="animate-fadeIn">
                    <EmergencyContacts
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="animate-fadeIn">
                    <TuitionContract
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between p-6 mb-32">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep(Math.max(0, currentStep - 1));
                  // Scroll to the top of the form content with smooth animation
                  document.getElementById("form-content")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    handleSubmit();
                  } else {
                    setCurrentStep(currentStep + 1);
                    // Scroll to the top of the form content with smooth animation
                    document.getElementById("form-content")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </CardFooter>
          </Card>
          </div>
          </div>
        </div>
      </main>
    </FormProvider>
  );
}

export default App;

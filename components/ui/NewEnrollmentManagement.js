import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { User, Settings } from "lucide-react";

const EnrollmentTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollments] = useState([
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Hassan",
      gradeLevel: "Grade 5",
      dateOfBirth: "2014-03-15",
      parentEmail: "ahmed.hassan@email.com",
      status: "Pending",
      submittedAt: "2024-01-15",
    },
    {
      id: 2,
      firstName: "Fatima",
      lastName: "Ali",
      gradeLevel: "Grade 3",
      dateOfBirth: "2016-07-22",
      parentEmail: "fatima.ali@email.com",
      status: "Approved",
      submittedAt: "2024-01-10",
    },
    {
      id: 3,
      firstName: "Omar",
      lastName: "Khan",
      gradeLevel: "Grade 7",
      dateOfBirth: "2012-11-08",
      parentEmail: "omar.khan@email.com",
      status: "Under Review",
      submittedAt: "2024-01-20",
    },
  ]);

  const filteredEnrollments = enrollments.filter((enrollment) =>
    `${enrollment.firstName} ${enrollment.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      Pending:
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300",
      Approved:
        "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300",
      "Under Review":
        "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
    };
    return (
      variants[status] ||
      "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300"
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          New Enrollments
        </h2>
        <Input
          placeholder="Search enrollments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-800">
            <TableHead className="text-gray-600 dark:text-gray-400">
              Student Name
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Grade Level
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Date of Birth
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Parent Email
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Status
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Submitted
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEnrollments.map((enrollment) => (
            <TableRow
              key={enrollment.id}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {enrollment.firstName} {enrollment.lastName}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {enrollment.gradeLevel}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {enrollment.dateOfBirth}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {enrollment.parentEmail}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    enrollment.status
                  )}`}
                >
                  {enrollment.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {enrollment.submittedAt}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() =>
                    setSelected(`enrollment-detail-${enrollment.id}`)
                  }
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const EnrollmentDetailView = ({ enrollmentId, setSelected }) => {
  // Sample data - in real app, fetch by enrollmentId
  const enrollmentData = {
    // Student Registration Form Fields
    firstName: "Ahmed",
    lastName: "Hassan",
    gender: "Male",
    dateOfBirth: "2014-03-15",
    gradeLevel: "Grade 5",
    houseNumber: "123",
    addressLine1: "Main Street",
    addressLine2: "Apt 4B",
    city: "Buffalo",
    state: "New York",
    zipCode: "14201",
    citizenship: "US Citizen",
    ethnicity: "Arab American",

    // Father's Information
    fatherFirstName: "Omar",
    fatherLastName: "Hassan",
    fatherAddress1: "123 Main Street",
    fatherAddress2: "Apt 4B",
    fatherCity: "Buffalo",
    fatherState: "New York",
    fatherZip: "14201",
    fatherPhone: "(716) 555-0123",
    fatherEmail: "omar.hassan@email.com",
    fatherOccupation: "Engineer",
    fatherEmployment: "Tech Corp",
    fatherWorkPhone: "(716) 555-0124",

    // Mother's Information
    motherFirstName: "Fatima",
    motherLastName: "Hassan",
    motherAddress1: "123 Main Street",
    motherAddress2: "Apt 4B",
    motherCity: "Buffalo",
    motherState: "New York",
    motherZip: "14201",
    motherPhone: "(716) 555-0125",
    motherEmail: "fatima.hassan@email.com",
    motherOccupation: "Teacher",
    motherEmployment: "Buffalo Schools",

    // School History
    publicSchoolName: "Buffalo Elementary",
    publicDistrict: "Buffalo City Schools",
    previousSchoolName: "Previous School",
    previousSchoolPhone: "(716) 555-0126",
    previousSchoolAddress: "456 School Ave",
    reasonForLeaving: "Moving",
    repeatedGrade: "No",
    disciplinaryAction: "No",
    subjectsExcel: "Math, Science",
    subjectsStruggle: "Reading",
    extracurricularActivities: "Soccer, Art Club",

    // Siblings
    siblings: [{ name: "Sarah Hassan", grade: "Grade 3" }],

    // Health Form Fields
    insuranceCompany: "Blue Cross",
    physicianName: "Dr. Smith",
    physicianNumber: "(716) 555-0127",
    hasDisabilities: "No",
    disabilityExplanation: "",
    medicalConditions: {
      asthma: false,
      diabetes: false,
      heartTrouble: false,
      noneOfAbove: true,
    },
    pastDiseases: {
      chickenpox: true,
      measles: false,
      noneOfAbove: false,
    },
    takesRegularMedication: "No",
    medicationExplanation: "",
    hasAllergies: "No",
    allergiesList: "",

    // Emergency Contact Form Fields
    emergencyContact1Name: "Ali Ahmed",
    emergencyContact1Phone: "(716) 555-0128",
    emergencyContact1Relationship: "Uncle",
    emergencyContact2Name: "Layla Hassan",
    emergencyContact2Phone: "(716) 555-0129",
    emergencyContact2Relationship: "Aunt",
    emergencyContact3Name: "Khalid Ahmed",
    emergencyContact3Phone: "(716) 555-0130",
    emergencyContact3Relationship: "Grandfather",

    // Authorized Pickup Persons
    authorizedPerson1Name: "Ali Ahmed",
    authorizedPerson1Relation: "Uncle",
    authorizedPerson1Phone: "(716) 555-0128",
    authorizedPerson2Name: "Layla Hassan",
    authorizedPerson2Relation: "Aunt",
    authorizedPerson2Phone: "(716) 555-0129",
    authorizedPerson3Name: "Khalid Ahmed",
    authorizedPerson3Relation: "Grandfather",
    authorizedPerson3Phone: "(716) 555-0130",

    // Medical Authorization
    hospitalChoice: "Buffalo General Hospital",

    // Signatures
    printName: "Omar Hassan",
    healthFormSignature: "Omar Hassan",
    emergencyFormSignature: "Omar Hassan",

    submittedAt: "2024-01-15",
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          New Enrollment Details
        </h2>
        <Button
          variant="outline"
          onClick={() => setSelected("New Enrollment")}
          className="text-gray-600 dark:text-gray-400"
        >
          ← Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Information */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Student Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  First Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.firstName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Last Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Gender
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.gender}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Date of Birth
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Grade Level
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.gradeLevel}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  House Number
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.houseNumber}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Citizenship
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.citizenship}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ethnicity
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.ethnicity}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {enrollmentData.houseNumber} {enrollmentData.addressLine1},{" "}
                {enrollmentData.addressLine2}
                <br />
                {enrollmentData.city}, {enrollmentData.state}{" "}
                {enrollmentData.zipCode}
              </p>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Siblings
              </label>
              {enrollmentData.siblings.map((sibling, index) => (
                <p key={index} className="text-gray-900 dark:text-gray-100">
                  {sibling.name} - {sibling.grade}
                </p>
              ))}
            </div>
          </div>

          {/* Father's Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Father's Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.fatherFirstName}{" "}
                  {enrollmentData.fatherLastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.fatherPhone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Work Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.fatherWorkPhone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.fatherEmail}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Occupation
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.fatherOccupation}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Employment
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.fatherEmployment}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Father's Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {enrollmentData.fatherAddress1}, {enrollmentData.fatherAddress2}
                <br />
                {enrollmentData.fatherCity}, {enrollmentData.fatherState}{" "}
                {enrollmentData.fatherZip}
              </p>
            </div>
          </div>

          {/* Mother's Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Mother's Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.motherFirstName}{" "}
                  {enrollmentData.motherLastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.motherPhone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.motherEmail}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Occupation
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.motherOccupation}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Employment
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.motherEmployment}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Mother's Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {enrollmentData.motherAddress1}, {enrollmentData.motherAddress2}
                <br />
                {enrollmentData.motherCity}, {enrollmentData.motherState}{" "}
                {enrollmentData.motherZip}
              </p>
            </div>
          </div>
        </div>

        {/* Health & Emergency Info */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Health Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Insurance Company
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.insuranceCompany}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Physician
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.physicianName} -{" "}
                  {enrollmentData.physicianNumber}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Has Disabilities
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.hasDisabilities}
                </p>
                {enrollmentData.disabilityExplanation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {enrollmentData.disabilityExplanation}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Medical Conditions
                </label>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {Object.entries(enrollmentData.medicalConditions)
                    .filter(([key, value]) => value)
                    .map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-block bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-2 py-1 rounded text-xs mr-2 mb-1"
                      >
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Past Diseases
                </label>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {Object.entries(enrollmentData.pastDiseases)
                    .filter(([key, value]) => value)
                    .map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-block bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs mr-2 mb-1"
                      >
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Takes Regular Medication
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.takesRegularMedication}
                </p>
                {enrollmentData.medicationExplanation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {enrollmentData.medicationExplanation}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Has Allergies
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.hasAllergies}
                </p>
                {enrollmentData.allergiesList && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {enrollmentData.allergiesList}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Emergency Contacts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Contact 1
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.emergencyContact1Name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.emergencyContact1Phone}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.emergencyContact1Relationship}
                </p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Contact 2
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.emergencyContact2Name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.emergencyContact2Phone}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.emergencyContact2Relationship}
                </p>
              </div>
              {enrollmentData.emergencyContact3Name && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Contact 3
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {enrollmentData.emergencyContact3Name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {enrollmentData.emergencyContact3Phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {enrollmentData.emergencyContact3Relationship}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Authorized Pickup Persons */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Authorized Pickup Persons
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Person 1
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.authorizedPerson1Name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.authorizedPerson1Phone}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.authorizedPerson1Relation}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Person 2
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.authorizedPerson2Name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.authorizedPerson2Phone}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollmentData.authorizedPerson2Relation}
                </p>
              </div>
              {enrollmentData.authorizedPerson3Name && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Person 3
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {enrollmentData.authorizedPerson3Name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {enrollmentData.authorizedPerson3Phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {enrollmentData.authorizedPerson3Relation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* School History */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              School History
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Public School
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.publicSchoolName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Public District
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.publicDistrict}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Previous School
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.previousSchoolName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Previous School Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.previousSchoolPhone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Previous School Address
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.previousSchoolAddress}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Reason for Leaving
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.reasonForLeaving}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Repeated Grade
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.repeatedGrade}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Disciplinary Actions
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.disciplinaryAction}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Subjects Excel In
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.subjectsExcel}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Subjects Struggle With
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.subjectsStruggle}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Extracurricular Activities
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.extracurricularActivities}
                </p>
              </div>
            </div>
          </div>

          {/* Medical Authorization */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Medical Authorization
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Preferred Hospital
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.hospitalChoice}
                </p>
              </div>
            </div>
          </div>

          {/* Signatures & Submission */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Signatures & Submission
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Print Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.printName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Health Form Signature
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.healthFormSignature}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Emergency Form Signature
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.emergencyFormSignature}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Submitted Date
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.submittedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EnrollmentTable, EnrollmentDetailView };

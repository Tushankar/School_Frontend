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

const ReEnrollmentTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reenrollments] = useState([
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Hassan",
      gradeLevel: "Grade 5",
      studentId: "STU2024001",
      parentEmail: "ahmed.hassan@email.com",
      status: "Pending",
      submittedAt: "2024-01-15",
      lastYearGrade: "Grade 4",
    },
    {
      id: 2,
      firstName: "Fatima",
      lastName: "Ali",
      gradeLevel: "Grade 3",
      studentId: "STU2024002",
      parentEmail: "fatima.ali@email.com",
      status: "Approved",
      submittedAt: "2024-01-10",
      lastYearGrade: "Grade 2",
    },
    {
      id: 3,
      firstName: "Omar",
      lastName: "Khan",
      gradeLevel: "Grade 7",
      studentId: "STU2024003",
      parentEmail: "omar.khan@email.com",
      status: "Under Review",
      submittedAt: "2024-01-20",
      lastYearGrade: "Grade 6",
    },
  ]);

  const filteredReenrollments = reenrollments.filter((reenrollment) =>
    `${reenrollment.firstName} ${reenrollment.lastName}`
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
          Re-Enrollments
        </h2>
        <Input
          placeholder="Search re-enrollments..."
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
              Student ID
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Grade Level
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Last Year Grade
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
          {filteredReenrollments.map((reenrollment) => (
            <TableRow
              key={reenrollment.id}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {reenrollment.firstName} {reenrollment.lastName}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {reenrollment.studentId}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {reenrollment.gradeLevel}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {reenrollment.lastYearGrade}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {reenrollment.parentEmail}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    reenrollment.status
                  )}`}
                >
                  {reenrollment.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {reenrollment.submittedAt}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() =>
                    setSelected(`reenrollment-detail-${reenrollment.id}`)
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

const ReEnrollmentDetailView = ({ enrollmentId, setSelected }) => {
  // Get data from the table based on enrollmentId
  const reenrollments = [
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Hassan",
      gradeLevel: "Grade 5",
      studentId: "STU2024001",
      parentEmail: "ahmed.hassan@email.com",
      status: "Pending",
      submittedAt: "2024-01-15",
      lastYearGrade: "Grade 4",
      dateOfBirth: "2014-03-15",
      gender: "Male",
      parentFirstName: "Omar",
      parentLastName: "Hassan",
      parentPhone: "(716) 555-0123",
      parentAddress1: "123 Main Street",
      parentAddress2: "Apt 4B",
      parentCity: "Buffalo",
      parentState: "New York",
      parentZip: "14201",
      currentGPA: "3.8",
      attendanceRate: "95%",
      disciplinaryIncidents: "0",
      academicAwards: "Honor Roll, Math Excellence Award",
      extracurricularActivities: "Soccer Team, Science Club",
      specialNeeds: "None",
      learningStyle: "Visual learner",
      medicalConditions: "None",
      allergies: "None",
      medications: "None",
      emergencyContactName: "Fatima Hassan",
      emergencyContactPhone: "(716) 555-0125",
      emergencyContactRelationship: "Mother",
      transportationMethod: "School Bus",
      busRoute: "Route 15",
      pickupPerson1: "Omar Hassan (Father)",
      pickupPerson2: "Fatima Hassan (Mother)",
      tuitionPlan: "Annual Payment",
      paymentMethod: "Bank Transfer",
      discountApplied: "Sibling Discount (10%)",
      totalAmount: "$8,500",
      paymentSchedule: "Annual - Due August 1st",
      reasonForReenrollment: "Continue excellent education and Islamic values",
      expectations:
        "Continue academic excellence, participate in extracurricular activities",
      specialRequests: "None",
      comments:
        "Ahmed has been an outstanding student and we are excited to continue his education at the school.",
      parentSignature: "Omar Hassan",
      dateSigned: "2024-01-15",
    },
    {
      id: 2,
      firstName: "Fatima",
      lastName: "Ali",
      gradeLevel: "Grade 3",
      studentId: "STU2024002",
      parentEmail: "fatima.ali@email.com",
      status: "Approved",
      submittedAt: "2024-01-10",
      lastYearGrade: "Grade 2",
      dateOfBirth: "2016-07-22",
      gender: "Female",
      parentFirstName: "Ali",
      parentLastName: "Ali",
      parentPhone: "(716) 555-0124",
      parentAddress1: "456 Oak Street",
      parentAddress2: "",
      parentCity: "Buffalo",
      parentState: "New York",
      parentZip: "14202",
      currentGPA: "4.0",
      attendanceRate: "98%",
      disciplinaryIncidents: "0",
      academicAwards: "Perfect Attendance, Science Fair Winner",
      extracurricularActivities: "Art Club, Choir",
      specialNeeds: "None",
      learningStyle: "Auditory learner",
      medicalConditions: "None",
      allergies: "None",
      medications: "None",
      emergencyContactName: "Sara Ali",
      emergencyContactPhone: "(716) 555-0126",
      emergencyContactRelationship: "Aunt",
      transportationMethod: "Parent Pickup",
      busRoute: "N/A",
      pickupPerson1: "Ali Ali (Father)",
      pickupPerson2: "Fatima Ali (Mother)",
      tuitionPlan: "Semi-Annual Payment",
      paymentMethod: "Check",
      discountApplied: "None",
      totalAmount: "$7,200",
      paymentSchedule: "Semi-Annual - Due January 1st and July 1st",
      reasonForReenrollment:
        "Excellent academic program and Islamic environment",
      expectations:
        "Continue strong academic performance and develop leadership skills",
      specialRequests: "None",
      comments: "Fatima is a dedicated student who excels in all subjects.",
      parentSignature: "Ali Ali",
      dateSigned: "2024-01-10",
    },
    {
      id: 3,
      firstName: "Omar",
      lastName: "Khan",
      gradeLevel: "Grade 7",
      studentId: "STU2024003",
      parentEmail: "omar.khan@email.com",
      status: "Under Review",
      submittedAt: "2024-01-20",
      lastYearGrade: "Grade 6",
      dateOfBirth: "2012-11-08",
      gender: "Male",
      parentFirstName: "Khan",
      parentLastName: "Khan",
      parentPhone: "(716) 555-0127",
      parentAddress1: "789 Pine Avenue",
      parentAddress2: "Suite 3C",
      parentCity: "Buffalo",
      parentState: "New York",
      parentZip: "14203",
      currentGPA: "3.5",
      attendanceRate: "92%",
      disciplinaryIncidents: "1",
      academicAwards: "Math Award",
      extracurricularActivities: "Basketball Team",
      specialNeeds: "None",
      learningStyle: "Kinesthetic learner",
      medicalConditions: "Mild asthma",
      allergies: "Dust",
      medications: "Albuterol as needed",
      emergencyContactName: "Aisha Khan",
      emergencyContactPhone: "(716) 555-0128",
      emergencyContactRelationship: "Sister",
      transportationMethod: "School Bus",
      busRoute: "Route 22",
      pickupPerson1: "Khan Khan (Father)",
      pickupPerson2: "Aisha Khan (Mother)",
      tuitionPlan: "Monthly Payment",
      paymentMethod: "Bank Transfer",
      discountApplied: "Early Bird Discount (5%)",
      totalAmount: "$9,200",
      paymentSchedule: "Monthly - Due 1st of each month",
      reasonForReenrollment:
        "Strong Islamic foundation and academic excellence",
      expectations:
        "Improve study habits and increase participation in extracurricular activities",
      specialRequests: "Extra time for asthma medication during PE",
      comments:
        "Omar has great potential and we want to continue his development at this school.",
      parentSignature: "Khan Khan",
      dateSigned: "2024-01-20",
    },
  ];

  const reenrollmentData = reenrollments.find(
    (r) => r.id === parseInt(enrollmentId)
  );

  if (!reenrollmentData) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Re-Enrollment Details
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Re-enrollment data not found.
          </p>
          <Button
            variant="outline"
            onClick={() => setSelected("Re Enrollment")}
            className="mt-4"
          >
            ← Back to List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Re-Enrollment Details
        </h2>
        <Button
          variant="outline"
          onClick={() => setSelected("Re Enrollment")}
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
                  Student ID
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.studentId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.firstName} {reenrollmentData.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Gender
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.gender}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Date of Birth
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Current Grade
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.gradeLevel}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Last Year Grade
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.lastYearGrade}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Performance */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Academic Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Current GPA
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.currentGPA}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Attendance Rate
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.attendanceRate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Disciplinary Incidents
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.disciplinaryIncidents}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Special Needs
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.specialNeeds}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Academic Awards
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.academicAwards}
              </p>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Extracurricular Activities
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.extracurricularActivities}
              </p>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Learning Style
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.learningStyle}
              </p>
            </div>
          </div>

          {/* Health Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Health Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Medical Conditions
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.medicalConditions}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Allergies
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.allergies}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Current Medications
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.medications}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Contact Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.emergencyContactName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Contact Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.emergencyContactPhone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Relationship
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.emergencyContactRelationship}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Parent & Administrative Info */}
        <div className="space-y-6">
          {/* Parent Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Parent Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Parent Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.parentFirstName}{" "}
                  {reenrollmentData.parentLastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.parentPhone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.parentEmail}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Parent Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.parentAddress1},{" "}
                {reenrollmentData.parentAddress2}
                <br />
                {reenrollmentData.parentCity}, {reenrollmentData.parentState}{" "}
                {reenrollmentData.parentZip}
              </p>
            </div>
          </div>

          {/* Transportation */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Transportation
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Transportation Method
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.transportationMethod}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Bus Route
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.busRoute}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Authorized Pickup Persons
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.pickupPerson1}
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.pickupPerson2}
                </p>
              </div>
            </div>
          </div>

          {/* Tuition Contract */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Tuition Contract
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tuition Plan
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.tuitionPlan}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Payment Method
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.paymentMethod}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Discount Applied
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.discountApplied}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Amount
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.totalAmount}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Payment Schedule
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.paymentSchedule}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Reason for Re-enrollment
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.reasonForReenrollment}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Expectations for Next Year
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.expectations}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Special Requests
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.specialRequests}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Additional Comments
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.comments}
                </p>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Signatures & Submission
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Parent Signature
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.parentSignature}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Date Signed
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.dateSigned}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Submitted Date
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.submittedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReEnrollmentTable, ReEnrollmentDetailView };

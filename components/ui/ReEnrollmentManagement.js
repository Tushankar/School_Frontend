import React, { useState, useEffect } from "react";
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
import { User, Settings, Loader2 } from "lucide-react";

const ReEnrollmentTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reenrollments, setReenrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReenrollments();
  }, []);

  const fetchReenrollments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/renroll/renroll-form"
      );
      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend expectations
        const transformedData = data.forms.map((form) => ({
          id: form._id,
          firstName: form.childFirstName,
          lastName: form.childLastName,
          gradeLevel: form.gradeLevel,
          studentId: `REN${form._id.slice(-6).toUpperCase()}`, // Generate student ID from MongoDB ID
          parentEmail: form.fatherEmail,
          status: form.isCompleted
            ? "Approved"
            : form.currentStep === 0
            ? "Pending"
            : "Under Review",
          submittedAt: new Date(form.submittedAt).toLocaleDateString(),
          lastYearGrade: form.gradeLevel
            ? `Grade ${parseInt(form.gradeLevel.replace("Grade ", "")) - 1}`
            : "N/A",
          // Store the full form data for detail view
          formData: form,
        }));
        setReenrollments(transformedData);
      } else {
        setError("Failed to fetch reenrollments");
      }
    } catch (err) {
      setError("Error fetching reenrollments: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading reenrollments...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
          <Button onClick={fetchReenrollments} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
  const [reenrollmentData, setReenrollmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (enrollmentId) {
      // Extract the actual enrollment ID from the selected value
      const actualId = enrollmentId.replace("reenrollment-detail-", "");
      fetchReenrollmentDetails(actualId);
    }
  }, [enrollmentId]);

  const fetchReenrollmentDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/renroll/renroll-form/${id}`
      );
      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend expectations
        const form = data.form;
        const transformedData = {
          id: form._id,
          firstName: form.childFirstName,
          lastName: form.childLastName,
          gradeLevel: form.gradeLevel,
          studentId: `REN${form._id.slice(-6).toUpperCase()}`,
          parentEmail: form.fatherEmail,
          status: form.isCompleted
            ? "Approved"
            : form.currentStep === 0
            ? "Pending"
            : "Under Review",
          submittedAt: new Date(form.submittedAt).toLocaleDateString(),
          lastYearGrade: form.gradeLevel
            ? `Grade ${parseInt(form.gradeLevel.replace("Grade ", "")) - 1}`
            : "N/A",

          // Student details
          dateOfBirth: form.dateOfBirth
            ? new Date(form.dateOfBirth).toLocaleDateString()
            : "",
          gender: form.gender,
          parentFirstName: form.fatherFirstName,
          parentLastName: form.fatherLastName,
          parentPhone: form.fatherPhone,
          parentAddress1: form.address1,
          parentAddress2: form.address2,
          parentCity: form.city,
          parentState: form.state,
          parentZip: form.zipCode,

          // Academic info - not collected in reenrollment forms for existing students
          currentGPA: "Available in student records",
          attendanceRate: "Available in student records",
          disciplinaryIncidents: "Available in student records",
          academicAwards: "Available in student records",
          extracurricularActivities: "Available in student records",
          specialNeeds: "Available in student records",
          learningStyle: "Available in student records",

          // Health info - map available fields
          medicalConditions:
            form.child1HealthChanges === "yes"
              ? "Health changes reported"
              : "No health changes reported",
          allergies: "Not specified in reenrollment form",
          medications: "Not specified in reenrollment form",
          hospitalPreference: form.hospitalPreference || "Not specified",

          // Emergency contacts
          emergencyContactName: form.emergency1Name,
          emergencyContactPhone: form.emergency1Phone,
          emergencyContactRelationship: form.emergency1Relationship,

          // Transportation - map available fields
          transportationMethod: "To be determined",
          busRoute: "To be assigned",
          pickupPerson1: form.authorizedPerson1
            ? `${form.authorizedPerson1} (${form.authorizedPerson1Relationship})`
            : "",
          pickupPerson2: form.authorizedPerson2
            ? `${form.authorizedPerson2} (${form.authorizedPerson2Relationship})`
            : "",

          // Tuition info - map available fields
          tuitionPlan: form.paymentOption || "Not specified",
          paymentMethod: "To be determined",
          discountApplied: "To be determined",
          totalAmount: "To be calculated",
          paymentSchedule: "Based on selected plan",
          tuitionAcknowledged: form.acknowledgeTuition === "yes" ? "Yes" : "No",
          textbookFeeAcknowledged:
            form.acknowledgeTextbookFee === "yes" ? "Yes" : "No",

          // Additional info - not collected in reenrollment forms
          reasonForReenrollment: "Continuing enrollment",
          expectations: "Continuing academic progress",
          specialRequests: "None specified",
          comments: "Re-enrollment completed",

          // Signatures
          parentSignature: form.parentSignature || form.tuitionSignature,
          dateSigned: new Date(form.submittedAt).toLocaleDateString(),
        };

        setReenrollmentData(transformedData);
      } else {
        setError("Failed to fetch reenrollment details");
      }
    } catch (err) {
      setError("Error fetching reenrollment details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading reenrollment details...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
          <Button
            onClick={() =>
              fetchReenrollmentDetails(
                enrollmentId.replace("reenrollment-detail-", "")
              )
            }
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!reenrollmentData) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>No reenrollment data found</p>
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
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Hospital Preference
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.hospitalPreference}
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
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tuition Acknowledged
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.tuitionAcknowledged}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Textbook Fee Acknowledged
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.textbookFeeAcknowledged}
                </p>
              </div>
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

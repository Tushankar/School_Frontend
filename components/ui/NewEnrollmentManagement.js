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

const EnrollmentTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/forms/enrollments"
      );
      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend expectations
        const transformedEnrollments = data.enrollments.map((enrollment) => ({
          id: enrollment.id,
          firstName: enrollment.studentRegistration?.firstName || "",
          lastName: enrollment.studentRegistration?.lastName || "",
          gradeLevel: enrollment.studentRegistration?.gradeLevel || "",
          dateOfBirth: enrollment.studentRegistration?.dateOfBirth || "",
          parentEmail:
            enrollment.studentRegistration?.fatherEmail ||
            enrollment.studentRegistration?.motherEmail ||
            "",
          status: enrollment.status,
          submittedAt: enrollment.submittedAt,
        }));
        setEnrollments(transformedEnrollments);
      } else {
        setError("Failed to fetch enrollments");
      }
    } catch (err) {
      setError("Error fetching enrollments: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading enrollments...
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
          <Button onClick={fetchEnrollments} className="mt-4">
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
          New Enrollments ({enrollments.length})
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
                {enrollment.dateOfBirth
                  ? new Date(enrollment.dateOfBirth).toLocaleDateString()
                  : ""}
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
                {enrollment.submittedAt
                  ? new Date(enrollment.submittedAt).toLocaleDateString()
                  : ""}
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
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (enrollmentId) {
      // Extract the actual enrollment ID from the selected value
      const actualId = enrollmentId.replace("enrollment-detail-", "");
      fetchEnrollmentDetails(actualId);
    }
  }, [enrollmentId]);

  const fetchEnrollmentDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://alrasheedacademyserver.onrender.com/api/forms/enrollments/${id}`
      );
      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend expectations
        const enrollment = data.enrollment;
        const transformedData = {
          // Student Registration Form Fields
          firstName: enrollment.studentRegistration?.firstName || "",
          lastName: enrollment.studentRegistration?.lastName || "",
          gender: enrollment.studentRegistration?.gender || "",
          dateOfBirth: enrollment.studentRegistration?.dateOfBirth || "",
          gradeLevel: enrollment.studentRegistration?.gradeLevel || "",
          houseNumber: enrollment.studentRegistration?.houseNumber || "",
          addressLine1: enrollment.studentRegistration?.addressLine1 || "",
          addressLine2: enrollment.studentRegistration?.addressLine2 || "",
          city: enrollment.studentRegistration?.city || "",
          state: enrollment.studentRegistration?.state || "",
          zipCode: enrollment.studentRegistration?.zipCode || "",
          citizenship: enrollment.studentRegistration?.citizenship || "",
          ethnicity: enrollment.studentRegistration?.ethnicity || "",

          // Father's Information
          fatherFirstName:
            enrollment.studentRegistration?.fatherFirstName || "",
          fatherLastName: enrollment.studentRegistration?.fatherLastName || "",
          fatherAddress1: enrollment.studentRegistration?.fatherAddress1 || "",
          fatherAddress2: enrollment.studentRegistration?.fatherAddress2 || "",
          fatherCity: enrollment.studentRegistration?.fatherCity || "",
          fatherState: enrollment.studentRegistration?.fatherState || "",
          fatherZip: enrollment.studentRegistration?.fatherZip || "",
          fatherPhone: enrollment.studentRegistration?.fatherPhone || "",
          fatherEmail: enrollment.studentRegistration?.fatherEmail || "",
          fatherOccupation:
            enrollment.studentRegistration?.fatherOccupation || "",
          fatherEmployment:
            enrollment.studentRegistration?.fatherEmployment || "",
          fatherWorkPhone:
            enrollment.studentRegistration?.fatherWorkPhone || "",

          // Mother's Information
          motherFirstName:
            enrollment.studentRegistration?.motherFirstName || "",
          motherLastName: enrollment.studentRegistration?.motherLastName || "",
          motherAddress1: enrollment.studentRegistration?.motherAddress1 || "",
          motherAddress2: enrollment.studentRegistration?.motherAddress2 || "",
          motherCity: enrollment.studentRegistration?.motherCity || "",
          motherState: enrollment.studentRegistration?.motherState || "",
          motherZip: enrollment.studentRegistration?.motherZip || "",
          motherPhone: enrollment.studentRegistration?.motherPhone || "",
          motherEmail: enrollment.studentRegistration?.motherEmail || "",
          motherOccupation:
            enrollment.studentRegistration?.motherOccupation || "",
          motherEmployment:
            enrollment.studentRegistration?.motherEmployment || "",

          // School History
          publicSchoolName:
            enrollment.studentRegistration?.publicSchoolName || "",
          publicDistrict: enrollment.studentRegistration?.publicDistrict || "",
          previousSchoolName:
            enrollment.studentRegistration?.previousSchoolName || "",
          previousSchoolPhone:
            enrollment.studentRegistration?.previousSchoolPhone || "",
          previousSchoolAddress:
            enrollment.studentRegistration?.previousSchoolAddress || "",
          reasonForLeaving:
            enrollment.studentRegistration?.reasonForLeaving || "",
          repeatedGrade: enrollment.studentRegistration?.repeatedGrade || "",
          disciplinaryAction:
            enrollment.studentRegistration?.disciplinaryAction || "",
          subjectsExcel: enrollment.studentRegistration?.subjectsExcel || "",
          subjectsStruggle:
            enrollment.studentRegistration?.subjectsStruggle || "",
          extracurricularActivities:
            enrollment.studentRegistration?.extracurricularActivities || "",

          // Siblings
          siblings: enrollment.studentRegistration?.siblings || [],

          // Health Form Fields
          insuranceCompany: enrollment.healthForm?.insuranceCompany || "",
          physicianName: enrollment.healthForm?.physicianName || "",
          physicianNumber: enrollment.healthForm?.physicianNumber || "",
          hasDisabilities: enrollment.healthForm?.hasDisabilities || "",
          disabilityExplanation:
            enrollment.healthForm?.disabilityExplanation || "",
          medicalConditions: enrollment.healthForm?.medicalConditions || {},
          pastDiseases: enrollment.healthForm?.pastDiseases || {},
          takesRegularMedication:
            enrollment.healthForm?.takesRegularMedication || "",
          medicationExplanation:
            enrollment.healthForm?.medicationExplanation || "",
          hasAllergies: enrollment.healthForm?.hasAllergies || "",
          allergiesList: enrollment.healthForm?.allergiesList || "",

          // Emergency Contact Form Fields
          emergencyContact1Name:
            enrollment.emergencyContact?.emergencyContact1Name || "",
          emergencyContact1Phone:
            enrollment.emergencyContact?.emergencyContact1Phone || "",
          emergencyContact1Relationship:
            enrollment.emergencyContact?.emergencyContact1Relationship || "",
          emergencyContact2Name:
            enrollment.emergencyContact?.emergencyContact2Name || "",
          emergencyContact2Phone:
            enrollment.emergencyContact?.emergencyContact2Phone || "",
          emergencyContact2Relationship:
            enrollment.emergencyContact?.emergencyContact2Relationship || "",
          emergencyContact3Name:
            enrollment.emergencyContact?.emergencyContact3Name || "",
          emergencyContact3Phone:
            enrollment.emergencyContact?.emergencyContact3Phone || "",
          emergencyContact3Relationship:
            enrollment.emergencyContact?.emergencyContact3Relationship || "",

          // Authorized Pickup Persons
          authorizedPerson1Name:
            enrollment.emergencyContact?.emergencyContact1Name || "",
          authorizedPerson1Relation:
            enrollment.emergencyContact?.emergencyContact1Relationship || "",
          authorizedPerson1Phone:
            enrollment.emergencyContact?.emergencyContact1Phone || "",
          authorizedPerson2Name:
            enrollment.emergencyContact?.emergencyContact2Name || "",
          authorizedPerson2Relation:
            enrollment.emergencyContact?.emergencyContact2Relationship || "",
          authorizedPerson2Phone:
            enrollment.emergencyContact?.emergencyContact2Phone || "",
          authorizedPerson3Name:
            enrollment.emergencyContact?.emergencyContact3Name || "",
          authorizedPerson3Relation:
            enrollment.emergencyContact?.emergencyContact3Relationship || "",
          authorizedPerson3Phone:
            enrollment.emergencyContact?.emergencyContact3Phone || "",

          // Medical Authorization
          hospitalChoice: enrollment.emergencyContact?.hospitalChoice || "",

          // Signatures
          printName: enrollment.studentRegistration?.printName || "",
          healthFormSignature: enrollment.healthForm?.healthFormSignature || "",
          emergencyFormSignature:
            enrollment.emergencyContact?.emergencyFormSignature || "",

          submittedAt: enrollment.submittedAt,
        };

        setEnrollmentData(transformedData);
      } else {
        setError("Failed to fetch enrollment details");
      }
    } catch (err) {
      setError("Error fetching enrollment details: " + err.message);
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
            Loading enrollment details...
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
            onClick={() => fetchEnrollmentDetails(enrollmentId)}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!enrollmentData) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>No enrollment data found</p>
        </div>
      </div>
    );
  }

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
        </div>
      </div>
    </div>
  );
};

export { EnrollmentTable, EnrollmentDetailView };

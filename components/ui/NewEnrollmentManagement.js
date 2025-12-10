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
        "https://alrasheedacademyserver.onrender.com/api/forms/new-enrollment"
      );
      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend expectations
        const transformedEnrollments = data.enrollments.map((enrollment) => ({
          id: enrollment._id,
          firstName: enrollment.studentFullName.split(" ")[0] || "",
          lastName:
            enrollment.studentFullName.split(" ").slice(1).join(" ") || "",
          gradeLevel: enrollment.classGrade || "",
          dateOfBirth: enrollment.dateOfBirth
            ? new Date(enrollment.dateOfBirth).toISOString().split("T")[0]
            : "",
          parentEmail: enrollment.email || "",
          status: "Pending", // Default status
          submittedAt: enrollment.createdAt || enrollment.submittedAt,
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
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 gap-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          New Enrollments ({enrollments.length})
        </h2>
        <Input
          placeholder="Search enrollments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-gray-800">
              <TableHead className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                Student Name
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden sm:table-cell">
                Grade Level
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden md:table-cell">
                Date of Birth
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden lg:table-cell">
                Parent Email
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                Status
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden md:table-cell">
                Submitted
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
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
                <TableCell className="font-medium text-gray-900 dark:text-gray-100 text-xs md:text-sm">
                  {enrollment.firstName} {enrollment.lastName}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden sm:table-cell">
                  {enrollment.gradeLevel}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden md:table-cell">
                  {enrollment.dateOfBirth
                    ? new Date(enrollment.dateOfBirth).toLocaleDateString()
                    : ""}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden lg:table-cell truncate">
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
                <TableCell className="text-gray-600 dark:text-gray-400 text-xs md:text-sm hidden md:table-cell">
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
                    <User className="h-3 md:h-4 w-3 md:w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <Settings className="h-3 md:h-4 w-3 md:w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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

  const downloadPhoto = async () => {
    try {
      const response = await fetch(
        `https://alrasheedacademyserver.onrender.com/${enrollmentData.studentPhoto}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `student-photo-${enrollmentData.firstName}-${enrollmentData.lastName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading photo:", error);
      alert("Failed to download photo. Please try again.");
    }
  };

  const fetchEnrollmentDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://alrasheedacademyserver.onrender.com/api/forms/new-enrollment/${id}`
      );
      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend expectations
        const enrollment = data.enrollment;
        const transformedData = {
          // Student Information
          firstName: enrollment.studentFullName.split(" ")[0] || "",
          lastName:
            enrollment.studentFullName.split(" ").slice(1).join(" ") || "",
          gender: enrollment.gender || "",
          dateOfBirth: enrollment.dateOfBirth
            ? new Date(enrollment.dateOfBirth).toLocaleDateString()
            : "",
          gradeLevel: enrollment.classGrade || "",
          houseNumber: "", // Not in NewEnrollment
          addressLine1: enrollment.residentialAddress || "",
          addressLine2: "",
          city: enrollment.city || "",
          state: enrollment.state || "",
          zipCode: enrollment.zipCode || "",
          citizenship: "", // Not in NewEnrollment
          ethnicity: "", // Not in NewEnrollment

          // Father's Information (using parent info)
          fatherFirstName: enrollment.parentFullName.split(" ")[0] || "",
          fatherLastName:
            enrollment.parentFullName.split(" ").slice(1).join(" ") || "",
          fatherAddress1: enrollment.streetAddress || "",
          fatherAddress2: "",
          fatherCity: enrollment.city || "",
          fatherState: enrollment.state || "",
          fatherZip: enrollment.zipCode || "",
          fatherPhone: enrollment.primaryPhone || "",
          fatherEmail: enrollment.email || "",
          fatherOccupation: "", // Not in NewEnrollment
          fatherEmployment: "", // Not in NewEnrollment
          fatherWorkPhone: enrollment.alternatePhone || "",

          // Mother's Information (same as father for now)
          motherFirstName: "",
          motherLastName: "",
          motherAddress1: "",
          motherAddress2: "",
          motherCity: "",
          motherState: "",
          motherZip: "",
          motherPhone: "",
          motherEmail: "",
          motherOccupation: "",
          motherEmployment: "",

          // School History
          publicSchoolName: enrollment.previousSchoolName || "",
          publicDistrict: "",
          previousSchoolName: enrollment.previousSchoolName || "",
          previousSchoolPhone: "",
          previousSchoolAddress: "",
          reasonForLeaving: "",
          repeatedGrade: "",
          disciplinaryAction: "",
          subjectsExcel: "",
          subjectsStruggle: "",
          extracurricularActivities: "",
          siblings: [], // Not in NewEnrollment

          // Health Form Fields (not in NewEnrollment)
          insuranceCompany: "",
          physicianName: "",
          physicianNumber: "",
          hasDisabilities: "",
          disabilityExplanation: "",
          medicalConditions: {},
          pastDiseases: {},
          takesRegularMedication: "",
          medicationExplanation: "",
          hasAllergies: "",
          allergiesList: "",

          // Emergency Contact Form Fields (not in NewEnrollment)
          emergencyContact1Name: "",
          emergencyContact1Phone: "",
          emergencyContact1Relationship: "",
          emergencyContact2Name: "",
          emergencyContact2Phone: "",
          emergencyContact2Relationship: "",
          emergencyContact3Name: "",
          emergencyContact3Phone: "",
          emergencyContact3Relationship: "",

          // Authorized Pickup Persons (not in NewEnrollment)
          authorizedPerson1Name: "",
          authorizedPerson1Relation: "",
          authorizedPerson1Phone: "",
          authorizedPerson2Name: "",
          authorizedPerson2Relation: "",
          authorizedPerson2Phone: "",
          authorizedPerson3Name: "",
          authorizedPerson3Relation: "",
          authorizedPerson3Phone: "",

          // Medical Authorization (not in NewEnrollment)
          hospitalChoice: "",

          // Signatures
          printName: enrollment.agreementSignature || "",
          healthFormSignature: "",
          emergencyFormSignature: "",
          submittedAt: enrollment.createdAt
            ? new Date(enrollment.createdAt).toLocaleDateString()
            : "",
          studentPhoto: enrollment.studentPhoto || "",
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
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          New Enrollment Details
        </h2>
        <Button
          variant="outline"
          onClick={() => setSelected("New Enrollment")}
          className="text-gray-600 dark:text-gray-400 w-full md:w-auto"
        >
          ← Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {/* Student Information */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Student Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  First Name
                </label>
                <p className="text-xs md:text-sm text-gray-900 dark:text-gray-100">
                  {enrollmentData.firstName}
                </p>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  Last Name
                </label>
                <p className="text-xs md:text-sm text-gray-900 dark:text-gray-100">
                  {enrollmentData.lastName}
                </p>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  Gender
                </label>
                <p className="text-xs md:text-sm text-gray-900 dark:text-gray-100">
                  {enrollmentData.gender}
                </p>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  Date of Birth
                </label>
                <p className="text-xs md:text-sm text-gray-900 dark:text-gray-100">
                  {enrollmentData.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  Grade Level
                </label>
                <p className="text-xs md:text-sm text-gray-900 dark:text-gray-100">
                  {enrollmentData.gradeLevel}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {enrollmentData.addressLine1}
                <br />
                {enrollmentData.city}, {enrollmentData.state}{" "}
                {enrollmentData.zipCode}
              </p>
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

          {/* School History */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              School History
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Previous School
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.previousSchoolName}
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
                  Agreement Signature
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {enrollmentData.printName}
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
          {/* Student Photo */}
          {enrollmentData.studentPhoto && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Student Photo
              </h3>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={`https://alrasheedacademyserver.onrender.com/${enrollmentData.studentPhoto}`}
                  alt="Student Photo"
                  className="max-w-xs max-h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
                <Button
                  onClick={downloadPhoto}
                  variant="outline"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Download Photo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { EnrollmentTable, EnrollmentDetailView };

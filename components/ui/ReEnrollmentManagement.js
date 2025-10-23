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
        "https://alrasheedacademyserver.onrender.com/api/renroll/renroll-form"
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          Re-Enrollments
        </h2>
        <Input
          placeholder="Search re-enrollments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-gray-800">
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[150px]">
                Student Name
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[120px]">
                Student ID
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[100px]">
                Grade Level
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[120px] hidden md:table-cell">
                Last Year Grade
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[150px] hidden lg:table-cell">
                Parent Email
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[100px]">
                Status
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[100px] hidden sm:table-cell">
                Submitted
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 min-w-[100px]">
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
                <TableCell className="text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  {reenrollment.lastYearGrade}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400 hidden lg:table-cell">
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
                <TableCell className="text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                  {reenrollment.submittedAt}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex-1 sm:flex-none"
                    onClick={() =>
                      setSelected(`reenrollment-detail-${reenrollment.id}`)
                    }
                  >
                    <User className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex-1 sm:flex-none"
                  >
                    <Settings className="h-4 w-4" />
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
        `https://alrasheedacademyserver.onrender.com/api/renroll/renroll-form/${id}`
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
            : "N/A",
          gender: form.gender || "N/A",
          ethnicity: form.ethnicity || "N/A",

          // Student address
          studentAddress1: form.address1 || "N/A",
          studentAddress2: form.address2 || "",
          studentCity: form.city || "N/A",
          studentState: form.state || "N/A",
          studentZip: form.zipCode || "N/A",
          schoolDistrict: form.schoolDistrict || "N/A",

          // Additional children info
          hasAdditionalChildren: form.hasAdditionalChildren || "no",
          numberOfChildren: form.numberOfChildren || 1,

          // Father's Information
          fatherFirstName: form.fatherFirstName || "N/A",
          fatherLastName: form.fatherLastName || "N/A",
          fatherPhone: form.fatherPhone || "N/A",
          fatherEmail: form.fatherEmail || "N/A",
          fatherAddress1: form.fatherAddress1 || "N/A",
          fatherAddress2: form.fatherAddress2 || "",
          fatherCity: form.fatherCity || "N/A",
          fatherState: form.fatherState || "N/A",
          fatherZipCode: form.fatherZipCode || "N/A",
          fatherOccupation: form.fatherOccupation || "N/A",
          fatherEmployment: form.fatherEmployment || "N/A",

          // Mother's Information
          motherFirstName: form.motherFirstName || "N/A",
          motherLastName: form.motherLastName || "N/A",
          motherPhone: form.motherPhone || "N/A",
          motherEmail: form.motherEmail || "N/A",
          isMotherAddressSame: form.isMotherAddressSame || "yes",
          motherAddress1: form.motherAddress1 || "N/A",
          motherAddress2: form.motherAddress2 || "",
          motherCity: form.motherCity || "N/A",
          motherState: form.motherState || "N/A",
          motherZipCode: form.motherZipCode || "N/A",
          motherOccupation: form.motherOccupation || "N/A",
          motherEmployment: form.motherEmployment || "N/A",

          // Health Changes
          child1HealthChanges: form.child1HealthChanges || "N/A",
          child2HealthChanges: form.child2HealthChanges || "N/A",
          child3HealthChanges: form.child3HealthChanges || "N/A",
          child4HealthChanges: form.child4HealthChanges || "N/A",
          child5HealthChanges: form.child5HealthChanges || "N/A",

          // Emergency contacts
          emergency1Name: form.emergency1Name || "N/A",
          emergency1Phone: form.emergency1Phone || "N/A",
          emergency1Relationship: form.emergency1Relationship || "N/A",
          emergency2Name: form.emergency2Name || "N/A",
          emergency2Phone: form.emergency2Phone || "N/A",
          emergency2Relationship: form.emergency2Relationship || "N/A",
          emergency3Name: form.emergency3Name || "",
          emergency3Phone: form.emergency3Phone || "",
          emergency3Relationship: form.emergency3Relationship || "",

          // Authorized Pickup Persons
          authorizedPerson1: form.authorizedPerson1 || "N/A",
          authorizedPerson1Phone: form.authorizedPerson1Phone || "N/A",
          authorizedPerson1Relationship:
            form.authorizedPerson1Relationship || "N/A",
          authorizedPerson2: form.authorizedPerson2 || "",
          authorizedPerson2Phone: form.authorizedPerson2Phone || "",
          authorizedPerson2Relationship:
            form.authorizedPerson2Relationship || "",
          authorizedPerson3: form.authorizedPerson3 || "",
          authorizedPerson3Phone: form.authorizedPerson3Phone || "",
          authorizedPerson3Relationship:
            form.authorizedPerson3Relationship || "",

          // Hospital Preference
          hospitalPreference: form.hospitalPreference || "N/A",

          // Tuition Contract
          guardianName: form.guardianName || "N/A",
          guardianName2: form.guardianName2 || "",
          homePhone: form.homePhone || "N/A",
          guardianEmail: form.guardianEmail || "N/A",
          acknowledgeTuition: form.acknowledgeTuition === "yes" ? "Yes" : "No",
          acknowledgeTextbookFee:
            form.acknowledgeTextbookFee === "yes" ? "Yes" : "No",
          paymentOption: form.paymentOption || "N/A",

          // Signatures
          parentSignature: form.parentSignature || "N/A",
          tuitionSignature: form.tuitionSignature || "N/A",
          signature: form.signature || "N/A",

          // Status
          currentStep: form.currentStep,
          isCompleted: form.isCompleted,
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
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Re-Enrollment Details
        </h2>
        <Button
          variant="outline"
          onClick={() => setSelected("Re Enrollment")}
          className="text-gray-600 dark:text-gray-400 w-full sm:w-auto"
        >
          ← Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Left Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Student Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Student Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
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
                  Ethnicity
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.ethnicity}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Grade Level (2025-2026)
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.gradeLevel}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Student Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.studentAddress1}
                {reenrollmentData.studentAddress2 &&
                  `, ${reenrollmentData.studentAddress2}`}
                <br />
                {reenrollmentData.studentCity}, {reenrollmentData.studentState}{" "}
                {reenrollmentData.studentZip}
              </p>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                School District
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.schoolDistrict}
              </p>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Additional Children Enrolled
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.hasAdditionalChildren === "yes"
                  ? `Yes (${reenrollmentData.numberOfChildren} total)`
                  : "No"}
              </p>
            </div>
          </div>

          {/* Father's Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Father's Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.fatherFirstName}{" "}
                  {reenrollmentData.fatherLastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.fatherPhone}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.fatherEmail}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.fatherAddress1}
                {reenrollmentData.fatherAddress2 &&
                  `, ${reenrollmentData.fatherAddress2}`}
                <br />
                {reenrollmentData.fatherCity}, {reenrollmentData.fatherState}{" "}
                {reenrollmentData.fatherZipCode}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Occupation
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.fatherOccupation}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Place of Employment
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.fatherEmployment}
                </p>
              </div>
            </div>
          </div>

          {/* Mother's Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Mother's Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.motherFirstName}{" "}
                  {reenrollmentData.motherLastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.motherPhone}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.motherEmail}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Address (Same as Father's?)
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.isMotherAddressSame === "yes" ? (
                  <span className="italic">Same as Father's address</span>
                ) : (
                  <>
                    {reenrollmentData.motherAddress1}
                    {reenrollmentData.motherAddress2 &&
                      `, ${reenrollmentData.motherAddress2}`}
                    <br />
                    {reenrollmentData.motherCity},{" "}
                    {reenrollmentData.motherState}{" "}
                    {reenrollmentData.motherZipCode}
                  </>
                )}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Occupation
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.motherOccupation}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Place of Employment
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.motherEmployment}
                </p>
              </div>
            </div>
          </div>

          {/* Health Changes */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Health Changes
            </h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5]
                .slice(0, reenrollmentData.numberOfChildren || 1)
                .map((childNum) => {
                  const healthChange =
                    reenrollmentData[`child${childNum}HealthChanges`];
                  if (!healthChange || healthChange === "N/A") return null;
                  return (
                    <div key={childNum}>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Child {childNum}
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {healthChange === "yes"
                          ? "Health changes reported"
                          : "No health changes"}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Emergency Contacts */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Emergency Contacts
            </h3>

            {/* Emergency Contact 1 */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <h4 className="font-medium text-sm mb-2">Contact 1</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.emergency1Name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.emergency1Phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Relationship
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.emergency1Relationship}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contact 2 */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <h4 className="font-medium text-sm mb-2">Contact 2</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.emergency2Name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.emergency2Phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Relationship
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.emergency2Relationship}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contact 3 (if exists) */}
            {reenrollmentData.emergency3Name && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <h4 className="font-medium text-sm mb-2">Contact 3</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.emergency3Name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.emergency3Phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Relationship
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.emergency3Relationship}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Authorized Pickup Persons */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Authorized Pickup Persons
            </h3>

            {/* Person 1 */}
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <h4 className="font-medium text-sm mb-2">Person 1</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.authorizedPerson1}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.authorizedPerson1Phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Relationship
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.authorizedPerson1Relationship}
                  </p>
                </div>
              </div>
            </div>

            {/* Person 2 (if exists) */}
            {reenrollmentData.authorizedPerson2 && (
              <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <h4 className="font-medium text-sm mb-2">Person 2</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.authorizedPerson2}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.authorizedPerson2Phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Relationship
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.authorizedPerson2Relationship}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Person 3 (if exists) */}
            {reenrollmentData.authorizedPerson3 && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <h4 className="font-medium text-sm mb-2">Person 3</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.authorizedPerson3}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.authorizedPerson3Phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Relationship
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.authorizedPerson3Relationship}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hospital Preference */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Medical Information
            </h3>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Hospital Preference
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {reenrollmentData.hospitalPreference}
              </p>
            </div>
          </div>

          {/* Tuition Contract */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Tuition Contract
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Guardian Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.guardianName}
                  </p>
                  {reenrollmentData.guardianName2 && (
                    <p className="text-gray-900 dark:text-gray-100">
                      {reenrollmentData.guardianName2}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Home Phone
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.homePhone}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Guardian Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.guardianEmail}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Payment Option
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.paymentOption}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Tuition Acknowledged
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.acknowledgeTuition}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Textbook Fee Acknowledged
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {reenrollmentData.acknowledgeTextbookFee}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Signatures & Submission */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Signatures & Submission
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Parent Signature (Step 1)
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.signature}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Emergency Contact Signature (Step 2)
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.parentSignature}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tuition Signature (Step 3)
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.tuitionSignature}
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
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completion Status
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {reenrollmentData.isCompleted
                    ? "✓ Completed"
                    : `In Progress (Step ${
                        reenrollmentData.currentStep + 1
                      }/3)`}
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

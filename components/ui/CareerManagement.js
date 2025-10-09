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

const JobApplicationTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobApplications] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      position: "Teacher",
      status: "Pending",
      submittedAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Fatima Ali",
      position: "Administrator",
      status: "Under Review",
      submittedAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Omar Khan",
      position: "Support Staff",
      status: "Approved",
      submittedAt: "2024-01-20",
    },
  ]);

  const filteredApplications = jobApplications.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      Pending:
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300",
      "Under Review":
        "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
      Approved:
        "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300",
      Rejected: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300",
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
          Job Applications
        </h2>
        <Input
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-800">
            <TableHead className="text-gray-600 dark:text-gray-400">
              Applicant Name
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Position
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
          {filteredApplications.map((app) => (
            <TableRow
              key={app.id}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {app.name}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {app.position}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {app.submittedAt}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() =>
                    setSelected(`job-application-detail-${app.id}`)
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

const VolunteerApplicationTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteerApplications] = useState([
    {
      id: 1,
      name: "Sarah Ahmed",
      position: "Event Planning",
      status: "Approved",
      submittedAt: "2024-01-12",
    },
    {
      id: 2,
      name: "Yusuf Hassan",
      position: "Tutoring",
      status: "Pending",
      submittedAt: "2024-01-18",
    },
    {
      id: 3,
      name: "Aisha Khan",
      position: "Administration",
      status: "Under Review",
      submittedAt: "2024-01-22",
    },
  ]);

  const filteredApplications = volunteerApplications.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      Pending:
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300",
      "Under Review":
        "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
      Approved:
        "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300",
      Rejected: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300",
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
          Volunteer Applications
        </h2>
        <Input
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-800">
            <TableHead className="text-gray-600 dark:text-gray-400">
              Applicant Name
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Position
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
          {filteredApplications.map((app) => (
            <TableRow
              key={app.id}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {app.name}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {app.position}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {app.submittedAt}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() =>
                    setSelected(`volunteer-application-detail-${app.id}`)
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

const JobApplicationDetailView = ({ applicationId, setSelected }) => {
  const jobApplicationData = {
    // Personal Information
    firstName: "Ahmed",
    lastName: "Hassan",
    gender: "Male",
    phone: "(716) 555-0123",
    email: "ahmed.hassan@email.com",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "Buffalo",
    state: "New York",
    zipCode: "14201",

    // Job Information
    position: "Teacher",
    hourlyPay: "25.00",
    startDate: "2024-02-01",
    workAuth: "Yes",
    felony: "No",

    // Education
    schools: [
      {
        schoolName: "University at Buffalo",
        schoolType: "College",
        degree: "Bachelor of Education",
        major: "Elementary Education",
        yearsCompleted: "4",
        address1: "12 Capen Hall",
        city: "Buffalo",
        state: "NY",
        zipCode: "14260",
      },
    ],

    // Work Experience
    companyName: "Buffalo Public Schools",
    companyPhone: "(716) 816-3000",
    workPosition: "Substitute Teacher",
    workDuration: "2 years",
    reasonLeaving: "Seeking full-time position",
    contactRef: "Yes",

    // References
    references: [
      {
        firstName: "Sarah",
        lastName: "Johnson",
        company: "Buffalo Elementary",
        title: "Principal",
        phone: "(716) 555-0129",
        email: "sarah.johnson@buffalo.edu",
      },
      {
        firstName: "Michael",
        lastName: "Davis",
        company: "University at Buffalo",
        title: "Professor",
        phone: "(716) 555-0130",
        email: "michael.davis@buffalo.edu",
      },
    ],

    signature: "Ahmed Hassan",
    submittedAt: "2024-01-15",
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Job Application Details
        </h2>
        <Button
          variant="outline"
          onClick={() => setSelected("Job Application")}
          className="text-gray-600 dark:text-gray-400"
        >
          ← Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  First Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.firstName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Last Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Gender
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.gender}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.email}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {jobApplicationData.address1}, {jobApplicationData.address2}
                <br />
                {jobApplicationData.city}, {jobApplicationData.state}{" "}
                {jobApplicationData.zipCode}
              </p>
            </div>
          </div>

          {/* Job Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Job Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Position Applied For
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.position}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Desired Hourly Pay
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  ${jobApplicationData.hourlyPay}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Start Date
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.startDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Work Authorization
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.workAuth}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Felony Conviction
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.felony}
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Education
            </h3>
            {jobApplicationData.schools.map((school, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded mb-3"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      School Name
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {school.schoolName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      School Type
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {school.schoolType}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Degree
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {school.degree}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Major
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {school.major}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Years Completed
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {school.yearsCompleted}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    School Address
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {school.address1}, {school.city}, {school.state}{" "}
                    {school.zipCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience & References */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Work Experience
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Company Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.companyName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Company Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.companyPhone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Position & Responsibilities
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.workPosition}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Duration
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.workDuration}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Reason for Leaving
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.reasonLeaving}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  May Contact for Reference
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.contactRef}
                </p>
              </div>
            </div>
          </div>

          {/* References */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              References
            </h3>
            <div className="space-y-4">
              {jobApplicationData.references.map((reference, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Reference {index + 1}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Name
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {reference.firstName} {reference.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Company
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {reference.company}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Title
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {reference.title}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Phone
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {reference.phone}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        Email
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {reference.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signature & Submission */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Signature & Submission
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Signature
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.signature}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Submitted Date
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {jobApplicationData.submittedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VolunteerApplicationDetailView = ({ applicationId, setSelected }) => {
  const volunteerApplicationData = {
    // Personal Information
    firstName: "Sarah",
    lastName: "Ahmed",
    phone: "(716) 555-0126",
    email: "sarah.ahmed@email.com",
    address1: "456 Oak Street",
    address2: "Unit 2A",
    city: "Buffalo",
    state: "New York",
    zipCode: "14202",
    position: "Event Planning, Tutoring, Administration",
    submittedAt: "2024-01-12",
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Volunteer Application Details
        </h2>
        <Button
          variant="outline"
          onClick={() => setSelected("Volunteer Application")}
          className="text-gray-600 dark:text-gray-400"
        >
          ← Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  First Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {volunteerApplicationData.firstName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Last Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {volunteerApplicationData.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {volunteerApplicationData.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {volunteerApplicationData.email}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Address
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {volunteerApplicationData.address1},{" "}
                {volunteerApplicationData.address2}
                <br />
                {volunteerApplicationData.city},{" "}
                {volunteerApplicationData.state}{" "}
                {volunteerApplicationData.zipCode}
              </p>
            </div>
          </div>

          {/* Volunteer Position */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Volunteer Information
            </h3>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Volunteer Position/Notes
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {volunteerApplicationData.position}
              </p>
            </div>
          </div>

          {/* Submission Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Submission Details
            </h3>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Submitted Date
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {volunteerApplicationData.submittedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {
  JobApplicationTable,
  VolunteerApplicationTable,
  JobApplicationDetailView,
  VolunteerApplicationDetailView,
};

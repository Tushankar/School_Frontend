import React, { useState } from "react";
import { toast } from "sonner";
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
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job applications from backend
  React.useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/job-applications"
      );
      const data = await response.json();

      console.log("Fetched applications data:", data);

      if (data.success && data.applications) {
        // Transform backend data to match table format
        const transformedData = data.applications.map((app) => {
          console.log("Mapping application:", app._id, app);
          return {
            id: app._id,
            name: `${app.firstName} ${app.lastName}`,
            email: app.email,
            phone: app.phone,
            position: app.position,
            status: app.status,
            submittedAt: new Date(app.submittedAt).toLocaleDateString(),
            hasResume: !!app.resume,
            hasSignature: !!app.signature,
          };
        });
        console.log("Transformed applications:", transformedData);
        setJobApplications(transformedData);
      } else {
        console.error("No applications data or success:false", data);
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      setLoading(false);
    }
  };

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
              Email
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Phone
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Position
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Files
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
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                Loading applications...
              </TableCell>
            </TableRow>
          ) : filteredApplications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                No applications found
              </TableCell>
            </TableRow>
          ) : (
            filteredApplications.map((app) => (
              <TableRow
                key={app.id}
                className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {app.name}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {app.email}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {app.phone}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {app.position}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {app.hasResume && (
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300">
                        📄 Resume
                      </span>
                    )}
                    {app.hasSignature && (
                      <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300">
                        ✍️ Sign
                      </span>
                    )}
                  </div>
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
                    onClick={() => {
                      console.log("Clicked application:", app);
                      console.log("App ID:", app.id);
                      console.log(
                        "Setting selected to:",
                        `job-application-detail-${app.id}`
                      );
                      setSelected(`job-application-detail-${app.id}`);
                    }}
                    title="View Details"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const VolunteerApplicationTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteerApplications, setVolunteerApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchVolunteerApplications();
  }, []);

  const fetchVolunteerApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/volunteer-applications"
      );
      const data = await response.json();

      if (data.success) {
        // Transform data to match the table format
        const transformedData = data.applications.map((app) => ({
          id: app._id,
          name: `${app.firstName} ${app.lastName}`,
          position: app.position || "Not specified",
          status: app.status,
          submittedAt: new Date(app.submittedAt).toLocaleDateString(),
        }));
        setVolunteerApplications(transformedData);
        console.log("Volunteer Applications loaded:", transformedData);
      }
    } catch (error) {
      console.error("Error fetching volunteer applications:", error);
      toast.error("Failed to load volunteer applications");
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                Loading volunteer applications...
              </TableCell>
            </TableRow>
          ) : filteredApplications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                {searchTerm
                  ? "No applications found matching your search"
                  : "No volunteer applications yet"}
              </TableCell>
            </TableRow>
          ) : (
            filteredApplications.map((app) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const JobApplicationDetailView = ({ applicationId, setSelected }) => {
  const [jobApplicationData, setJobApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailHistory, setEmailHistory] = useState([]);
  const [showEmailHistory, setShowEmailHistory] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  React.useEffect(() => {
    fetchApplicationDetail();
    fetchEmailHistory();
  }, [applicationId]);

  const fetchApplicationDetail = async () => {
    try {
      setLoading(true);
      const id = applicationId.replace("job-application-detail-", "");

      console.log("Fetching application with ID:", id);
      console.log("Full applicationId:", applicationId);

      if (!id || id === "detail" || id === applicationId) {
        console.error("Invalid application ID:", applicationId);
        alert("Invalid application ID. Please try again.");
        setSelected("Job Application");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/job-applications/${id}`
      );
      const data = await response.json();

      if (data.success) {
        setJobApplicationData(data.application);
      } else {
        console.error("Failed to fetch application:", data);
        alert(
          "Failed to load application details: " +
            (data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error fetching application details:", error);
      alert("Error loading application details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailHistory = async () => {
    try {
      const id = applicationId.replace("job-application-detail-", "");
      if (!id || id === "detail" || id === applicationId) return;

      const response = await fetch(
        `http://localhost:4000/api/job-applications/${id}/emails`
      );
      const data = await response.json();

      if (data.success) {
        setEmailHistory(data.emails || []);
      }
    } catch (error) {
      console.error("Error fetching email history:", error);
    }
  };

  const downloadFile = (fileType) => {
    const id = applicationId.replace("job-application-detail-", "");
    window.open(
      `http://localhost:4000/api/job-applications/${id}/download/${fileType}`,
      "_blank"
    );
  };

  const updateStatus = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      const id = applicationId.replace("job-application-detail-", "");
      const response = await fetch(
        `http://localhost:4000/api/job-applications/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setJobApplicationData((prev) => ({
          ...prev,
          status: newStatus,
        }));
        alert(`Status updated to: ${newStatus}`);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.subject.trim() || !emailData.message.trim()) {
      toast.error("Missing Required Fields", {
        description: "Please fill in both subject and message",
        duration: 3000,
      });
      return;
    }

    try {
      setSendingEmail(true);
      const id = applicationId.replace("job-application-detail-", "");

      const response = await fetch(
        `http://localhost:4000/api/job-applications/${id}/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: jobApplicationData.email,
            subject: emailData.subject,
            message: emailData.message,
            applicantName: `${jobApplicationData.firstName} ${jobApplicationData.lastName}`,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("📧 Email Sent Successfully!", {
          description: `Message sent to ${jobApplicationData.email}`,
          duration: 5000,
        });
        setShowEmailModal(false);
        setEmailData({ subject: "", message: "" });
        // Refresh email history
        fetchEmailHistory();
      } else {
        toast.error("Failed to Send Email", {
          description: data.message || "Unknown error occurred",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Network Error", {
        description: "Unable to send email. Please try again.",
        duration: 4000,
      });
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  if (!jobApplicationData) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Application not found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Job Application Details
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ID: {jobApplicationData._id}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Update Status
            </label>
            <select
              value={jobApplicationData.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updatingStatus}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="Pending">🟡 Pending</option>
              <option value="Under Review">🔵 Under Review</option>
              <option value="Approved">🟢 Approved</option>
              <option value="Rejected">🔴 Rejected</option>
            </select>
          </div>
          <Button
            variant="outline"
            onClick={() => setSelected("Job Application")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 px-4 py-2 font-medium"
          >
            ← Back to List
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">
            Education
          </p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">
            {jobApplicationData.schools?.length || 0}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-300">Schools</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-xs text-green-600 dark:text-green-300 font-medium">
            Experience
          </p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-200">
            {jobApplicationData.workExperience?.length || 0}
          </p>
          <p className="text-xs text-green-600 dark:text-green-300">Jobs</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <p className="text-xs text-purple-600 dark:text-purple-300 font-medium">
            References
          </p>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">
            {jobApplicationData.references?.length || 0}
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-300">People</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <p className="text-xs text-orange-600 dark:text-orange-300 font-medium">
            Files
          </p>
          <p className="text-2xl font-bold text-orange-700 dark:text-orange-200">
            {(jobApplicationData.resume ? 1 : 0) +
              (jobApplicationData.signature ? 1 : 0)}
          </p>
          <p className="text-xs text-orange-600 dark:text-orange-300">
            Uploaded
          </p>
        </div>
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
            {jobApplicationData.schools &&
            jobApplicationData.schools.length > 0 ? (
              jobApplicationData.schools.map((school, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded mb-3"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    School {index + 1}
                  </h4>
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
                        {school.degree || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Major
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {school.major || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Years Completed
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {school.yearsCompleted || "N/A"}
                      </p>
                    </div>
                  </div>
                  {(school.addressLine1 || school.address1) && (
                    <div className="mt-2">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        School Address
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {school.addressLine1 || school.address1}
                        {(school.addressLine2 || school.address2) &&
                          `, ${school.addressLine2 || school.address2}`}
                        <br />
                        {school.city}, {school.state} {school.zipCode}
                      </p>
                    </div>
                  )}
                  {school.location && (
                    <div className="mt-2">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Location
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {school.location}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No education information provided
              </p>
            )}
          </div>
        </div>

        {/* Work Experience & References */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Work Experience
            </h3>
            {jobApplicationData.workExperience &&
            jobApplicationData.workExperience.length > 0
              ? jobApplicationData.workExperience.map((work, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded mb-3"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Experience {index + 1}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Company Name
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">
                          {work.company}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Company Phone
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">
                          {work.phone}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Position & Responsibilities
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">
                          {work.position} - {work.responsibilities}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Duration
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">
                          {work.duration}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Reason for Leaving
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">
                          {work.reasonForLeaving}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          May Contact for Reference
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">
                          {work.contactForRef}
                        </p>
                      </div>
                      {work.addressLine1 && (
                        <div className="col-span-2">
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Address
                          </label>
                          <p className="text-gray-900 dark:text-gray-100">
                            {work.addressLine1}
                            {work.addressLine2 ? `, ${work.addressLine2}` : ""}
                            <br />
                            {work.city}, {work.state} {work.zipCode}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : // Fallback to legacy single work experience
                jobApplicationData.companyName && (
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
                )}
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

          {/* Files */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              📎 Uploaded Files
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {jobApplicationData.resume ? (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <label className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    📄 Resume
                  </label>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {jobApplicationData.resume.originalName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {jobApplicationData.resume.mimetype} •{" "}
                        {(jobApplicationData.resume.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile("resume")}
                      className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                    >
                      ⬇ Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    📄 No resume uploaded
                  </p>
                </div>
              )}
              {jobApplicationData.signature &&
              jobApplicationData.signature.filename ? (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                    ✍️ Signature File
                  </label>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {jobApplicationData.signature.originalName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {jobApplicationData.signature.mimetype} •{" "}
                        {(jobApplicationData.signature.size / 1024).toFixed(2)}{" "}
                        KB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile("signature")}
                      className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                    >
                      ⬇ Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ✍️ No signature uploaded
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submission Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              📋 Submission Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                  Current Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    jobApplicationData.status === "Pending"
                      ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                      : jobApplicationData.status === "Under Review"
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                      : jobApplicationData.status === "Approved"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                  }`}
                >
                  {jobApplicationData.status === "Pending" && "🟡 "}
                  {jobApplicationData.status === "Under Review" && "🔵 "}
                  {jobApplicationData.status === "Approved" && "🟢 "}
                  {jobApplicationData.status === "Rejected" && "🔴 "}
                  {jobApplicationData.status}
                </span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                  Submitted Date
                </label>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  📅 {new Date(jobApplicationData.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Email History */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                📬 Email History
              </h3>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {emailHistory.length}{" "}
                {emailHistory.length === 1 ? "Email" : "Emails"} Sent
              </span>
            </div>
            {emailHistory.length > 0 ? (
              <div className="space-y-3">
                {emailHistory.map((email, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {email.subject}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {email.message}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(email.sentAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(email.sentAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        📧 To: {email.to}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto text-xs bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium px-3 py-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmail(email);
                        }}
                      >
                        👁️ View Full Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  📭 No emails sent yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Send your first email to this applicant using the button below
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Reply Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-center">
        <Button
          onClick={() => setShowEmailModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8"
        >
          ✉️ Send Email Reply to Applicant
        </Button>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          style={{ zIndex: 9999, animation: "fadeIn 0.2s ease-out" }}
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all border-2 border-gray-200 dark:border-gray-700"
            style={{ animation: "slideUp 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ✉️ Send Email Reply
                </h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl font-bold leading-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Recipient Info */}
                <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    <strong className="text-blue-700 dark:text-blue-300">
                      To:
                    </strong>{" "}
                    {jobApplicationData.firstName} {jobApplicationData.lastName}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    <strong className="text-blue-700 dark:text-blue-300">
                      Email:
                    </strong>{" "}
                    {jobApplicationData.email}
                  </p>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    📧 Subject <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={emailData.subject}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                    placeholder="e.g., Regarding Your Application for [Position]"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    💬 Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={emailData.message}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    placeholder="Dear [Applicant Name],

Thank you for your application...

Best regards,
Al-Rasheed Academy"
                    rows={10}
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                </div>

                {/* Quick Templates */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                    ⚡ Quick Templates
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 font-medium"
                      onClick={() =>
                        setEmailData({
                          subject: `Application Update - ${jobApplicationData.position}`,
                          message: `Dear ${jobApplicationData.firstName} ${jobApplicationData.lastName},

Thank you for your application for the ${jobApplicationData.position} position at Al-Rasheed Academy.

We have reviewed your application and would like to inform you that we will be moving forward with the next steps in our hiring process.

We will be in touch soon with further details.

Best regards,
Al-Rasheed Academy HR Team`,
                        })
                      }
                    >
                      🎤 Interview Invitation
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 font-medium"
                      onClick={() =>
                        setEmailData({
                          subject: `Thank you for your application`,
                          message: `Dear ${jobApplicationData.firstName} ${jobApplicationData.lastName},

Thank you for your interest in the ${jobApplicationData.position} position at Al-Rasheed Academy.

We have received your application and will review it carefully. We will contact you if your qualifications match our needs.

We appreciate your interest in joining our team.

Best regards,
Al-Rasheed Academy HR Team`,
                        })
                      }
                    >
                      ✅ Acknowledgment
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700 font-medium"
                      onClick={() =>
                        setEmailData({
                          subject: `Request for Additional Information`,
                          message: `Dear ${jobApplicationData.firstName} ${jobApplicationData.lastName},

Thank you for your application for the ${jobApplicationData.position} position.

We would like to request some additional information to complete your application:

- [Please specify what information is needed]

Please provide this information at your earliest convenience.

Best regards,
Al-Rasheed Academy HR Team`,
                        })
                      }
                    >
                      📋 Request Info
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <Button
                    onClick={handleSendEmail}
                    disabled={sendingEmail}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingEmail ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>📧 Send Email</>
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowEmailModal(false)}
                    variant="outline"
                    disabled={sendingEmail}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold py-3 text-base border-gray-300 dark:border-gray-600"
                  >
                    ✖ Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Email Modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📧 Email Details
                </h3>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl font-bold leading-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Email Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                      📬 Recipient
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {selectedEmail.to}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                      📅 Sent Date
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {new Date(selectedEmail.sentAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    📧 Subject
                  </label>
                  <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100 font-medium">
                    {selectedEmail.subject}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    💬 Message
                  </label>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                      {selectedEmail.message}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => setSelectedEmail(null)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VolunteerApplicationDetailView = ({ applicationId, setSelected }) => {
  const [volunteerApplicationData, setVolunteerApplicationData] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailHistory, setEmailHistory] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  React.useEffect(() => {
    fetchApplicationDetail();
    fetchEmailHistory();
  }, [applicationId]);

  const fetchApplicationDetail = async () => {
    try {
      setLoading(true);
      const id = applicationId.replace("volunteer-application-detail-", "");

      if (!id || id === "detail" || id === applicationId) {
        console.error("Invalid application ID:", applicationId);
        toast.error("Invalid application ID");
        setSelected("Volunteer Application");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/volunteer-applications/${id}`
      );
      const data = await response.json();

      if (data.success) {
        console.log("Volunteer Application Data:", data.application);
        setVolunteerApplicationData(data.application);
      } else {
        console.error("Failed to fetch application:", data);
        toast.error("Failed to load application details");
      }
    } catch (error) {
      console.error("Error fetching application details:", error);
      toast.error("Error loading application details");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailHistory = async () => {
    try {
      const id = applicationId.replace("volunteer-application-detail-", "");
      if (!id || id === "detail" || id === applicationId) return;

      const response = await fetch(
        `http://localhost:4000/api/volunteer-applications/${id}/emails`
      );
      const data = await response.json();

      if (data.success) {
        setEmailHistory(data.emails || []);
      }
    } catch (error) {
      console.error("Error fetching email history:", error);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      const id = applicationId.replace("volunteer-application-detail-", "");
      const response = await fetch(
        `http://localhost:4000/api/volunteer-applications/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setVolunteerApplicationData((prev) => ({
          ...prev,
          status: newStatus,
        }));
        toast.success(`Status updated to: ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.subject.trim() || !emailData.message.trim()) {
      toast.error("Missing Required Fields", {
        description: "Please fill in both subject and message",
        duration: 3000,
      });
      return;
    }

    try {
      setSendingEmail(true);
      const id = applicationId.replace("volunteer-application-detail-", "");

      const response = await fetch(
        `http://localhost:4000/api/volunteer-applications/${id}/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: volunteerApplicationData.email,
            subject: emailData.subject,
            message: emailData.message,
            applicantName: `${volunteerApplicationData.firstName} ${volunteerApplicationData.lastName}`,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("📧 Email Sent Successfully!", {
          description: `Message sent to ${volunteerApplicationData.email}`,
          duration: 5000,
        });
        setShowEmailModal(false);
        setEmailData({ subject: "", message: "" });
        fetchEmailHistory();
      } else {
        toast.error("Failed to Send Email", {
          description: data.message || "Unknown error occurred",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Network Error", {
        description: "Unable to send email. Please try again.",
        duration: 4000,
      });
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  if (!volunteerApplicationData) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Application not found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Volunteer Application Details
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ID: {volunteerApplicationData._id}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Update Status
            </label>
            <select
              value={volunteerApplicationData.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updatingStatus}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="Pending">🟡 Pending</option>
              <option value="Under Review">🔵 Under Review</option>
              <option value="Approved">🟢 Approved</option>
              <option value="Rejected">🔴 Rejected</option>
            </select>
          </div>
          <Button
            variant="outline"
            onClick={() => setSelected("Volunteer Application")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 px-4 py-2 font-medium"
          >
            ← Back to List
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            👤 Personal Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    First Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {volunteerApplicationData.firstName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Last Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {volunteerApplicationData.lastName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {volunteerApplicationData.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {volunteerApplicationData.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Address */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                📍 Address Details
              </h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Address Line 1
                  </label>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {volunteerApplicationData.address1 || "Not provided"}
                  </p>
                </div>
                {volunteerApplicationData.address2 && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Address Line 2
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {volunteerApplicationData.address2}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      City
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {volunteerApplicationData.city || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      State
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {volunteerApplicationData.state || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      ZIP Code
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {volunteerApplicationData.zip || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Position & Submission Details in Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Volunteer Position */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              🎯 Volunteer Information
            </h3>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Volunteer Position/Notes
              </label>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {volunteerApplicationData.position ||
                    "No position/notes specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Submission Details */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              📋 Submission Details
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                  Current Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    volunteerApplicationData.status === "Pending"
                      ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                      : volunteerApplicationData.status === "Under Review"
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                      : volunteerApplicationData.status === "Approved"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                  }`}
                >
                  {volunteerApplicationData.status === "Pending" && "🟡 "}
                  {volunteerApplicationData.status === "Under Review" && "🔵 "}
                  {volunteerApplicationData.status === "Approved" && "🟢 "}
                  {volunteerApplicationData.status === "Rejected" && "🔴 "}
                  {volunteerApplicationData.status}
                </span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                  Submitted Date
                </label>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  📅{" "}
                  {new Date(
                    volunteerApplicationData.submittedAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email History */}
        <div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                📬 Email History
              </h3>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {emailHistory.length}{" "}
                {emailHistory.length === 1 ? "Email" : "Emails"} Sent
              </span>
            </div>
            {emailHistory.length > 0 ? (
              <div className="space-y-3">
                {emailHistory.map((email, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {email.subject}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {email.message}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(email.sentAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(email.sentAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        📧 To: {email.to}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto text-xs bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium px-3 py-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmail(email);
                        }}
                      >
                        👁️ View Full Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  📭 No emails sent yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Send your first email to this volunteer using the button below
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Reply Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-center">
        <Button
          onClick={() => setShowEmailModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8"
        >
          ✉️ Send Email to Volunteer
        </Button>
      </div>

      {/* Email Compose Modal */}
      {showEmailModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 9999, animation: "fadeIn 0.2s ease-out" }}
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all border-2 border-gray-200 dark:border-gray-700"
            style={{ animation: "slideUp 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ✉️ Send Email
                </h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl font-bold leading-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    <strong className="text-blue-700 dark:text-blue-300">
                      To:
                    </strong>{" "}
                    {volunteerApplicationData.firstName}{" "}
                    {volunteerApplicationData.lastName}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    <strong className="text-blue-700 dark:text-blue-300">
                      Email:
                    </strong>{" "}
                    {volunteerApplicationData.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    📧 Subject <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={emailData.subject}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                    placeholder="e.g., Volunteer Position Update"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    💬 Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={emailData.message}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    placeholder="Dear Volunteer,

Thank you for your interest...

Best regards,
Al-Rasheed Academy"
                    rows={10}
                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <Button
                    onClick={handleSendEmail}
                    disabled={sendingEmail}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingEmail ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>📧 Send Email</>
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowEmailModal(false)}
                    variant="outline"
                    disabled={sendingEmail}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold py-3 text-base border-gray-300 dark:border-gray-600"
                  >
                    ✖ Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Email Modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📧 Email Details
                </h3>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl font-bold leading-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                      📬 Recipient
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {selectedEmail.to}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                      📅 Sent Date
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {new Date(selectedEmail.sentAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    📧 Subject
                  </label>
                  <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100 font-medium">
                    {selectedEmail.subject}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    💬 Message
                  </label>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                      {selectedEmail.message}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => setSelectedEmail(null)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export {
  JobApplicationTable,
  VolunteerApplicationTable,
  JobApplicationDetailView,
  VolunteerApplicationDetailView,
};

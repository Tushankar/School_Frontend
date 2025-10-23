"use client";
import React, { useState, useEffect } from "react";
import { User, Settings } from "lucide-react";
import { toast } from "sonner";
import Spinner from "./spinner-1";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { Input } from "./input";

const ContactFormsTable = ({ setSelected }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contactForms, setContactForms] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchContactForms();
    const onContactUpdated = () => fetchContactForms();
    window.addEventListener("contact-updated", onContactUpdated);
    return () =>
      window.removeEventListener("contact-updated", onContactUpdated);
  }, [refreshKey]);

  const fetchContactForms = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setContactForms(data);
      }
    } catch (error) {
      console.error("Failed to fetch contact forms:", error);
    }
  };

  const refreshData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const filteredForms = contactForms.filter((form) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      New: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
      Replied:
        "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300",
      "In Progress":
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300",
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
          Contact Form Submissions
        </h2>
        <Input
          placeholder="Search forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-800">
            <TableHead className="text-gray-600 dark:text-gray-400">
              Name
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Email
            </TableHead>
            <TableHead className="text-gray-600 dark:text-gray-400">
              Message Preview
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
          {filteredForms.map((form) => (
            <TableRow
              key={form._id}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {form.name}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {form.email}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400 max-w-xs truncate">
                {form.message}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    form.status
                  )}`}
                >
                  {form.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {new Date(form.submittedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() => setSelected(`contact-form-detail-${form._id}`)}
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

const ContactFormDetailView = ({ formId, setSelected }) => {
  const [contactFormData, setContactFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchContactForm();
  }, [formId]);

  const fetchContactForm = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/contact/${formId}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setContactFormData(data);
      } else {
        console.error("Failed to fetch contact form");
      }
    } catch (error) {
      console.error("Error fetching contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsReplied = async () => {
    try {
      setUpdatingStatus(true);
      const response = await fetch(
        `http://localhost:4000/api/contact/${formId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: "Replied" }),
        }
      );

      if (response.ok) {
        setContactFormData({ ...contactFormData, status: "Replied" });
        toast.success("Status updated to Replied");
        // notify other parts of the app (table) to refresh immediately
        try {
          window.dispatchEvent(new Event("contact-updated"));
        } catch (e) {}
        // Trigger table refresh by going back to list
        setTimeout(() => setSelected("Contact Forms"), 800);
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

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      setSendingReply(true);
      const response = await fetch(
        `http://localhost:4000/api/contact/${formId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ replyMessage }),
        }
      );

      if (response.ok) {
        setContactFormData({ ...contactFormData, status: "Replied" });
        setReplyMessage("");
        setIsReplyModalOpen(false);
        toast.success("Reply sent successfully");
        // notify other parts of the app (table) to refresh immediately
        try {
          window.dispatchEvent(new Event("contact-updated"));
        } catch (e) {}
        // Trigger table refresh
        setTimeout(() => setSelected("Contact Forms"), 800);
      } else {
        toast.error("Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Error sending reply");
    } finally {
      setSendingReply(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contactFormData) {
    return <div>Contact form not found</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Contact Form Details
        </h2>
        <Button
          variant="outline"
          onClick={() => setSelected("Contact Forms")}
          className="text-gray-600 dark:text-gray-400"
        >
          ← Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {contactFormData.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {contactFormData.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </label>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                  {contactFormData.status}
                </span>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Message
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                {contactFormData.message}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Submission Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Submitted At
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {new Date(contactFormData.submittedAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  IP Address
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {contactFormData.ipAddress}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  User Agent
                </label>
                <p className="text-gray-900 dark:text-gray-100 text-sm break-all">
                  {contactFormData.userAgent}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Actions
            </h3>
            <div className="space-y-2">
              <Button
                onClick={handleMarkAsReplied}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  contactFormData.status === "Replied" || updatingStatus
                }
              >
                {updatingStatus ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner size={18} color="#ffffff" />
                    <span>Updating...</span>
                  </div>
                ) : contactFormData.status === "Replied" ? (
                  "Already Replied"
                ) : (
                  "Mark as Replied"
                )}
              </Button>

              <Dialog
                open={isReplyModalOpen}
                onOpenChange={setIsReplyModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={
                      contactFormData.status === "Replied" || sendingReply
                    }
                  >
                    {sendingReply ? (
                      <div className="flex items-center justify-center gap-2">
                        <Spinner size={18} color="#ffffff" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Email Response"
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-gray-100">
                      Send Email Response
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      Compose and send a response to {contactFormData.name}'s
                      inquiry.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Original Message:
                      </label>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100">
                        {contactFormData.message}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Your Response:
                      </label>
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Enter your reply message..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={6}
                      />
                    </div>
                  </div>

                  <DialogFooter className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsReplyModalOpen(false)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendReply}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={sendingReply}
                    >
                      {sendingReply ? (
                        <div className="flex items-center justify-center gap-2">
                          <Spinner size={18} color="#ffffff" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Send Reply"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
              >
                Delete Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContactFormsTable, ContactFormDetailView };

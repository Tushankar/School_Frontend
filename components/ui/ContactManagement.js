"use client";
import React, { useState } from "react";
import { User, Settings } from "lucide-react";

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
  const [contactForms] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      message: "I would like to know more about the admission process.",
      status: "New",
      submittedAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Fatima Ali",
      email: "fatima.ali@email.com",
      message: "Can you provide information about the curriculum?",
      status: "Replied",
      submittedAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Omar Khan",
      email: "omar.khan@email.com",
      message: "What are the school hours and transportation options?",
      status: "In Progress",
      submittedAt: "2024-01-20",
    },
  ]);

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
              key={form.id}
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
                {form.submittedAt}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() => setSelected(`contact-form-detail-${form.id}`)}
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
  const contactFormData = {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    message:
      "I would like to know more about the admission process for my child. Can you provide information about the requirements, deadlines, and any entrance exams? Also, I'm interested in learning about the school's curriculum and extracurricular activities. Thank you for your time.",
    status: "New",
    submittedAt: "2024-01-15 10:30 AM",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  };

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
                  {contactFormData.submittedAt}
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
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Mark as Replied
              </Button>
              <Button variant="outline" className="w-full">
                Send Email Response
              </Button>
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

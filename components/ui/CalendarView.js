"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";

const API_URL = "http://localhost:4000/api/calendar";

const CalendarView = ({ setSelected }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "none",
    color: "none",
    customColor: "#3b82f6",
    startDate: "",
    endDate: "",
  });

  // Fetch events from backend on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();

      if (data.success) {
        setEvents(
          data.events.map((event) => ({
            ...event,
            id: event._id,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const eventTypes = [
    {
      value: "none",
      label: "No Color (Default)",
      color: "none",
      bgColor: "bg-gray-100 dark:bg-gray-700",
    },
    {
      value: "school-closed",
      label: "School Closed",
      color: "blue-600",
      bgColor: "bg-blue-600",
    },
    {
      value: "early-release",
      label: "Early Release",
      color: "purple-400",
      bgColor: "bg-purple-400",
    },
    {
      value: "school-events",
      label: "School Events",
      color: "yellow-300",
      bgColor: "bg-yellow-300",
    },
    {
      value: "nys-exams",
      label: "NYS Exams",
      color: "orange-300",
      bgColor: "bg-orange-300",
    },
    {
      value: "quarter-exams",
      label: "Quarter Exams",
      color: "orange-400",
      bgColor: "bg-orange-400",
    },
    {
      value: "no-busing",
      label: "No Busing",
      color: "green-400",
      bgColor: "bg-green-400",
    },
    {
      value: "staff-development",
      label: "Staff Development",
      color: "blue-200",
      bgColor: "bg-blue-200",
    },
    {
      value: "parent-conferences",
      label: "Parent Teacher Conferences",
      color: "gray-300",
      bgColor: "bg-gray-300",
    },
    {
      value: "first-last-day",
      label: "First & Last Day of School",
      color: "green-500",
      bgColor: "border-2 border-green-500 bg-white",
    },
    {
      value: "quarter-end",
      label: "Quarter End",
      color: "red-500",
      bgColor: "border-2 border-red-500 bg-white",
    },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => {
      const eventStart = new Date(event.date);
      const eventEnd = new Date(event.endDate || event.date);
      const currentDay = new Date(dateStr);
      return currentDay >= eventStart && currentDay <= eventEnd;
    });
  };

  const handleAddEvent = async () => {
    if (!newEvent.title) return;

    const startDate =
      newEvent.startDate ||
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
    const endDate = newEvent.endDate || startDate;

    const eventData = {
      title: newEvent.title,
      date: startDate,
      endDate: endDate,
      type: newEvent.type,
      color: newEvent.color,
      customColor: newEvent.customColor,
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh events from backend
        await fetchEvents();
        setNewEvent({
          title: "",
          type: "none",
          color: "none",
          customColor: "#3b82f6",
          startDate: "",
          endDate: "",
        });
        setShowAddEvent(false);
        setSelectedDate(null);
      } else {
        alert("Failed to add event: " + data.message);
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        // Refresh events from backend
        await fetchEvents();
      } else {
        alert("Failed to delete event: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
      {/* Calendar Section */}
      <div className="flex-1 space-y-4 md:space-y-6">
        {/* Calendar Header */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {monthNames[currentDate.getMonth()]}{" "}
                <span className="hidden sm:inline">
                  {currentDate.getFullYear()}
                </span>
                <span className="sm:hidden text-base md:text-lg">
                  {currentDate.getFullYear()}
                </span>
              </h2>

              {/* Prev/Next buttons */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth(-1)}
                  className="h-8 w-8 p-0 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth(1)}
                  className="h-8 w-8 p-0 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={() => setShowAddEvent(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm md:text-base"
            >
              <Plus className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
              Add Event
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="p-3 md:p-6 overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 mb-2 md:mb-4 min-w-max md:min-w-0">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-1 md:p-2 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 w-10 md:w-auto"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 min-w-max md:min-w-0">
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                return (
                  <div
                    key={index}
                    className={`min-h-[80px] md:min-h-[100px] p-1 md:p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-xs md:text-base w-10 md:w-auto ${
                      !day
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }`}
                    onClick={() =>
                      day && (setSelectedDate(day), setShowAddEvent(true))
                    }
                  >
                    {day && (
                      <>
                        <div className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 md:p-2 rounded group relative line-clamp-1 ${
                                event.color === "none"
                                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                  : event.color === "custom"
                                  ? "text-white"
                                  : event.color === "blue-600"
                                  ? "bg-blue-600 text-white"
                                  : event.color === "purple-400"
                                  ? "bg-purple-400 text-white"
                                  : event.color === "yellow-300"
                                  ? "bg-yellow-300 text-black"
                                  : event.color === "orange-300"
                                  ? "bg-orange-300 text-black"
                                  : event.color === "orange-400"
                                  ? "bg-orange-400 text-white"
                                  : event.color === "green-400"
                                  ? "bg-green-400 text-black"
                                  : event.color === "blue-200"
                                  ? "bg-blue-200 text-black"
                                  : event.color === "gray-300"
                                  ? "bg-gray-300 text-black"
                                  : event.color === "green-500"
                                  ? "border-2 border-green-500 bg-white text-black"
                                  : event.color === "red-500"
                                  ? "border-2 border-red-500 bg-white text-black"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              }`}
                              style={
                                event.color === "custom"
                                  ? { backgroundColor: event.customColor }
                                  : {}
                              }
                            >
                              <div className="flex items-center justify-between gap-0.5">
                                <div className="truncate font-medium flex-1">
                                  {event.endDate && event.endDate !== event.date
                                    ? `${event.title}`
                                    : event.title}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(event.id);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-500 rounded flex-shrink-0 hidden md:block"
                                  title="Delete event"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              +{dayEvents.length - 2}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Legend - Right Side / Bottom on Mobile */}
      <div className="w-full lg:w-80 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
          Event Legend
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
          {eventTypes.map((type) => (
            <div key={type.value} className="flex items-center gap-2 md:gap-3">
              <div
                className={`w-3 md:w-4 h-3 md:h-4 rounded flex-shrink-0 ${type.bgColor}`}
              ></div>
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {type.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 md:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5 md:space-y-1">
            <p>109 Ridge Road, Lackawanna, New York 14218</p>
            <p>www.alrasheedacademy.org</p>
            <p>Phone (716) 822-0440 Fax (716) 706-1303</p>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-3 md:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 md:gap-4 mb-4">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Add Event
                </h3>
                {selectedDate && (
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {monthNames[currentDate.getMonth()]} {selectedDate}
                  </p>
                )}
              </div>
              <button
                onClick={() => (setShowAddEvent(false), setSelectedDate(null))}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 md:mt-4 grid grid-cols-1 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Event Title
                </label>
                <Input
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Enter event title"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs md:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={
                      newEvent.startDate ||
                      `${currentDate.getFullYear()}-${String(
                        currentDate.getMonth() + 1
                      ).padStart(2, "0")}-${String(selectedDate || 1).padStart(
                        2,
                        "0"
                      )}`
                    }
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startDate: e.target.value })
                    }
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    End Date (Optional)
                  </label>
                  <Input
                    type="date"
                    value={newEvent.endDate}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endDate: e.target.value })
                    }
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs md:text-base"
                    placeholder="Same as start date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Event Type
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => {
                    const selectedType = eventTypes.find(
                      (t) => t.value === e.target.value
                    );
                    setNewEvent({
                      ...newEvent,
                      type: e.target.value,
                      color: selectedType.color,
                    });
                  }}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs md:text-base"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
              <Button
                onClick={handleAddEvent}
                disabled={loading || !newEvent.title}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-base"
              >
                {loading ? "Adding..." : "Add Event"}
              </Button>
              <Button
                variant="outline"
                onClick={() => (setShowAddEvent(false), setSelectedDate(null))}
                className="flex-1 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs md:text-base"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;

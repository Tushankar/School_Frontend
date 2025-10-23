"use client"

import * as React from "react"
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  SearchIcon,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Input } from "@/components/ui/input"

const API_URL = "https://alrasheedacademyserver.onrender.com/api/calendar"

interface CalendarEvent {
  _id: string
  id: string
  title: string
  date: string
  endDate?: string
  type: string
  color: string
  customColor?: string
}

interface FullScreenCalendarProps {
  data?: CalendarEvent[]
  readOnly?: boolean
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

export function FullScreenCalendar({ data: initialData, readOnly = false }: FullScreenCalendarProps) {
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = React.useState(today)
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy"),
  )
  const [events, setEvents] = React.useState<CalendarEvent[]>(initialData || [])
  const [loading, setLoading] = React.useState(false)
  const [showAddEvent, setShowAddEvent] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [eventsPerPage] = React.useState(10)
  const [newEvent, setNewEvent] = React.useState({
    title: "",
    type: "none",
    color: "none",
    startDate: "",
    endDate: "",
  })
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  // Filter events for current month
  const currentMonthEvents = React.useMemo(() => {
    const monthStart = format(firstDayCurrentMonth, "yyyy-MM-01")
    const monthEnd = format(endOfMonth(firstDayCurrentMonth), "yyyy-MM-dd")
    
    return events.filter((event) => {
      const eventDate = event.date
      const eventEndDate = event.endDate || event.date
      
      // Include events that fall within or overlap with current month
      return (eventDate <= monthEnd && eventEndDate >= monthStart)
    }).sort((a, b) => a.date.localeCompare(b.date))
  }, [events, firstDayCurrentMonth])
  
  // Pagination
  const totalPages = Math.ceil(currentMonthEvents.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = currentMonthEvents.slice(indexOfFirstEvent, indexOfLastEvent)
  
  // Reset to page 1 when month changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [currentMonth])

  // Fetch events from backend
  React.useEffect(() => {
    console.log("Calendar mounted, readOnly:", readOnly)
    console.log("Fetching events from:", `${API_URL}/events`)
    fetchEvents()
    
    // Auto-refresh events every 30 seconds if in read-only mode
    if (readOnly) {
      const interval = setInterval(() => {
        console.log("Auto-refreshing events...")
        fetchEvents()
      }, 30000) // 30 seconds
      
      return () => clearInterval(interval)
    }
  }, [readOnly])
  
  // Debug: Log events whenever they change
  React.useEffect(() => {
    console.log("Events updated:", events.length, events)
  }, [events])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/events`)
      const data = await response.json()
      
      if (data.success && data.events) {
        const mappedEvents = data.events.map((event: any) => ({
          ...event,
          id: event._id || event.id
        }))
        setEvents(mappedEvents)
      } else {
        console.error("Failed to fetch events:", data)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = async () => {
    if (!newEvent.title) return

    const startDate = newEvent.startDate || format(selectedDay, "yyyy-MM-dd")
    const endDate = newEvent.endDate || startDate

    const eventData = {
      title: newEvent.title,
      date: startDate,
      endDate: endDate,
      type: newEvent.type,
      color: newEvent.color,
    }

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (data.success) {
        await fetchEvents()
        setNewEvent({
          title: "",
          type: "none",
          color: "none",
          startDate: "",
          endDate: "",
        })
        setShowAddEvent(false)
      } else {
        alert("Failed to add event: " + data.message)
      }
    } catch (error) {
      console.error("Error adding event:", error)
      alert("Failed to add event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        await fetchEvents()
      } else {
        alert("Failed to delete event: " + data.message)
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Failed to delete event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getEventsForDate = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd")
    
    return events.filter((event) => {
      const eventStartStr = event.date
      const eventEndStr = event.endDate || event.date
      
      // Compare date strings directly
      return dayStr >= eventStartStr && dayStr <= eventEndStr
    })
  }

  const getEventColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      "none": "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
      "blue-600": "bg-blue-600 text-white",
      "purple-400": "bg-purple-400 text-white",
      "yellow-300": "bg-yellow-300 text-black",
      "orange-300": "bg-orange-300 text-black",
      "orange-400": "bg-orange-400 text-white",
      "green-400": "bg-green-400 text-black",
      "blue-200": "bg-blue-200 text-black",
      "gray-300": "bg-gray-300 text-black",
      "green-500": "border-2 border-green-500 bg-white text-black",
      "red-500": "border-2 border-red-500 bg-white text-black",
    }
    return colorMap[color] || "bg-gray-100 dark:bg-gray-700"
  }

  const eventTypes = [
    {
      value: "none",
      label: "No Color (Default)",
      color: "none",
    },
    {
      value: "school-closed",
      label: "School Closed",
      color: "blue-600",
    },
    {
      value: "early-release",
      label: "Early Release",
      color: "purple-400",
    },
    {
      value: "school-events",
      label: "School Events",
      color: "yellow-300",
    },
    {
      value: "nys-exams",
      label: "NYS Exams",
      color: "orange-300",
    },
    {
      value: "quarter-exams",
      label: "Quarter Exams",
      color: "orange-400",
    },
    {
      value: "no-busing",
      label: "No Busing",
      color: "green-400",
    },
    {
      value: "staff-development",
      label: "Staff Development",
      color: "blue-200",
    },
    {
      value: "parent-conferences",
      label: "Parent Teacher Conferences",
      color: "gray-300",
    },
    {
      value: "first-last-day",
      label: "First & Last Day of School",
      color: "green-500",
    },
    {
      value: "quarter-end",
      label: "Quarter End",
      color: "red-500",
    },
  ]

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function goToToday() {
    setCurrentMonth(format(today, "MMM-yyyy"))
  }

  function handleDayClick(day: Date) {
    setSelectedDay(day)
    if (!readOnly) {
      setShowAddEvent(true)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Calendar and Events Container */}
      <div className="flex flex-1 gap-6">
        {/* Main Calendar Container */}
        <div className="flex flex-1 flex-col">
        {/* Calendar Header */}
        <div className="flex flex-col space-y-4 p-4 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-none">
        <div className="flex flex-auto">
          <div className="flex items-center gap-4">
            <div className="hidden w-20 flex-col items-center justify-center rounded-lg border bg-muted p-0.5 md:flex">
              <h1 className="p-1 text-xs uppercase text-muted-foreground">
                {format(today, "MMM")}
              </h1>
              <div className="flex w-full items-center justify-center rounded-lg border bg-background p-0.5 text-lg font-bold">
                <span>{format(today, "d")}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground">
                {format(firstDayCurrentMonth, "MMMM, yyyy")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(firstDayCurrentMonth, "MMM d, yyyy")} -{" "}
                {format(endOfMonth(firstDayCurrentMonth), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Button variant="outline" size="icon" className="hidden lg:flex">
            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
          </Button>

          <Separator orientation="vertical" className="hidden h-6 lg:block" />

          <div className="inline-flex w-full -space-x-px rounded-lg shadow-sm shadow-black/5 md:w-auto rtl:space-x-reverse">
            <Button
              onClick={previousMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Navigate to previous month"
            >
              <ChevronLeftIcon size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button
              onClick={goToToday}
              className="w-full rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 md:w-auto"
              variant="outline"
            >
              Today
            </Button>
            <Button
              onClick={nextMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Navigate to next month"
            >
              <ChevronRightIcon size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>

          {!readOnly && (
            <>
              <Separator orientation="vertical" className="hidden h-6 md:block" />
              <Separator
                orientation="horizontal"
                className="block w-full md:hidden"
              />

              <Button 
                className="w-full gap-2 md:w-auto"
                onClick={() => setShowAddEvent(true)}
              >
                <PlusCircleIcon size={16} strokeWidth={2} aria-hidden="true" />
                <span>New Event</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="lg:flex lg:flex-auto lg:flex-col">
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-10">
            <div className="text-lg font-semibold">Loading events...</div>
          </div>
        )}
        
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border text-center text-xs font-semibold leading-6 lg:flex-none">
          <div className="border-r py-2.5">Sun</div>
          <div className="border-r py-2.5">Mon</div>
          <div className="border-r py-2.5">Tue</div>
          <div className="border-r py-2.5">Wed</div>
          <div className="border-r py-2.5">Thu</div>
          <div className="border-r py-2.5">Fri</div>
          <div className="py-2.5">Sat</div>
        </div>

        {/* Calendar Days */}
        <div className="flex text-xs leading-6 lg:flex-auto">
          <div className="hidden w-full border-x lg:grid lg:grid-cols-7 lg:grid-rows-5">
            {days.map((day, dayIdx) => (
              <div
                key={dayIdx}
                onClick={() => handleDayClick(day)}
                className={cn(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "bg-accent/50 text-muted-foreground",
                  "relative flex flex-col border-b border-r hover:bg-muted focus:z-10 cursor-pointer",
                  !isEqual(day, selectedDay) && "hover:bg-accent/75",
                )}
              >
                <header className="flex items-center justify-between p-2.5">
                  <button
                    type="button"
                    className={cn(
                      isEqual(day, selectedDay) && "text-primary-foreground",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-foreground",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-muted-foreground",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "border-none bg-primary",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-foreground",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs hover:border",
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </header>
                <div className="flex-1 p-2.5">
                  {getEventsForDate(day).length > 0 && (
                    <div className="space-y-1.5">
                      {getEventsForDate(day).slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "flex items-center justify-between gap-1 rounded-lg p-2 text-xs leading-tight group",
                            getEventColor(event.color)
                          )}
                          style={
                            event.color === "custom" && event.customColor
                              ? { backgroundColor: event.customColor, color: "white" }
                              : {}
                          }
                        >
                          <p className="font-medium leading-none truncate flex-1">
                            {event.title}
                          </p>
                          {!readOnly && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteEvent(event.id)
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-500 rounded"
                              title="Delete event"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                      {getEventsForDate(day).length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          + {getEventsForDate(day).length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="isolate grid w-full grid-cols-7 grid-rows-5 border-x lg:hidden">
            {days.map((day, dayIdx) => (
              <button
                onClick={() => setSelectedDay(day)}
                key={dayIdx}
                type="button"
                className={cn(
                  isEqual(day, selectedDay) && "text-primary-foreground",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "text-foreground",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-muted-foreground",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  "flex h-14 flex-col border-b border-r px-3 py-2 hover:bg-muted focus:z-10",
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={cn(
                    "ml-auto flex size-6 items-center justify-center rounded-full",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-primary text-primary-foreground",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-primary text-primary-foreground",
                  )}
                >
                  {format(day, "d")}
                </time>
                {getEventsForDate(day).length > 0 && (
                  <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {getEventsForDate(day).map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>

        {/* Events List Sidebar - Right Side */}
        <div className="hidden lg:block w-96">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden sticky top-4">
            <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {format(firstDayCurrentMonth, "MMMM yyyy")} Events
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full font-medium">
                  {currentMonthEvents.length} this month
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {events.length} total
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {currentMonthEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No events this month
                  </p>
                </div>
              ) : (
                currentEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={cn(
                        "group relative flex flex-col gap-2 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200",
                        getEventColor(event.color)
                      )}
                      style={
                        event.color === "custom" && event.customColor
                          ? { backgroundColor: event.customColor, color: "white" }
                          : {}
                      }
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1">
                          <span className="text-xs font-bold bg-black/10 px-2 py-1 rounded">
                            {indexOfFirstEvent + index + 1}
                          </span>
                          <p className="font-semibold text-sm flex-1 leading-tight">{event.title}</p>
                        </div>
                        {!readOnly && (
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500 hover:text-white rounded transition-all flex-shrink-0"
                            title="Delete event"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs opacity-90">
                        <span>📅</span>
                        <span>
                          {format(new Date(event.date), "MMM d, yyyy")}
                          {event.endDate && event.endDate !== event.date && (
                            <> → {format(new Date(event.endDate), "MMM d, yyyy")}</>
                          )}
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Legend - Below Calendar */}
      <div className="w-full p-4 mb-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Event Legend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">School Closed</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-400 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Early Release</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">School Events</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-orange-300 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">NYS Exams</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Quarter Exams</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">No Busing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-200 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Staff Development</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Parent Conferences</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-green-500 bg-white rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">First/Last Day</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-red-500 bg-white rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Quarter End</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-center">
              <p>109 Ridge Road, Lackawanna, New York 14218</p>
              <p>www.alrasheedacademy.org</p>
              <p>Phone (716) 822-0440 | Fax (716) 706-1303</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {!readOnly && showAddEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Add Event
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {format(selectedDay, "MMMM d, yyyy")}
                </p>
              </div>
              <button
                onClick={() => setShowAddEvent(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Title
                </label>
                <Input
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Enter event title"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={newEvent.startDate || format(selectedDay, "yyyy-MM-dd")}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startDate: e.target.value })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date (Optional)
                  </label>
                  <Input
                    type="date"
                    value={newEvent.endDate}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endDate: e.target.value })
                    }
                    className="w-full"
                    placeholder="Same as start date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Type
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => {
                    const selectedType = eventTypes.find(
                      (t) => t.value === e.target.value
                    )
                    setNewEvent({
                      ...newEvent,
                      type: e.target.value,
                      color: selectedType?.color || "none",
                    })
                  }}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAddEvent}
                disabled={loading || !newEvent.title}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add Event"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddEvent(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
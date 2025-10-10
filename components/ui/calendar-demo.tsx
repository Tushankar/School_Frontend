"use client"

import { FullScreenCalendar } from "@/components/ui/fullscreen-calendar"

function CalendarDemo() {
  return (
    <div className="flex flex-1 flex-col scale-90 pb-20">
      <FullScreenCalendar readOnly={true} />
    </div>
  )
}

export { CalendarDemo }
import React, { useState } from "react";
import dayjs from "dayjs";
import EventBadge from "./EventBadge";

function hasOverlap(event1, event2) {
  const start1 = dayjs(event1.startTime);
  const end1 = dayjs(event1.endTime);
  const start2 = dayjs(event2.startTime);
  const end2 = dayjs(event2.endTime);
  return start1.isBefore(end2) && start2.isBefore(end1);
}

export default function DayCell({ date, currentMonth, events }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isToday = date.isSame(dayjs(), "day");
  const isCurrentMonth = date.isSame(currentMonth, "month");

  const dayEvents = events.filter((event) =>
    dayjs(event.startTime).isSame(date, "day")
  );

  const conflicts = [];
  for (let i = 0; i < dayEvents.length; i++) {
    for (let j = i + 1; j < dayEvents.length; j++) {
      if (hasOverlap(dayEvents[i], dayEvents[j])) {
        conflicts.push(dayEvents[i], dayEvents[j]);
      }
    }
  }

  const hasConflict = (event) => conflicts.includes(event);

  return (
    <div
      className={`h-24 p-1 border relative group transition duration-200 ease-in-out ${
        isCurrentMonth ? "bg-white" : "bg-gray-100"
      } hover:bg-green-50 cursor-pointer`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      {/* Date number */}
      <div
        className={`text-sm ${
          isToday ? "text-blue-600 font-bold" : "text-gray-700"
        }`}
      >
        {date.date()}
      </div>

      {/* Event badges */}
      <div className="absolute inset-0 top-5 overflow-y-auto max-h-[5rem] pr-1">
        {dayEvents.map((event, i) => (
          <EventBadge key={i} event={event} conflict={hasConflict(event)} />
        ))}
      </div>

      {/* Tooltip box */}
      {showTooltip && dayEvents.length > 0 && (
        <div className="absolute z-50 top-0 left-0 w-64 p-3 bg-white border border-gray-300 rounded shadow-lg text-sm text-gray-700 space-y-1">
          <div className="font-semibold mb-1">
            Events on {date.format("MMM D, YYYY")}:
          </div>
          <ul className="space-y-1 max-h-40 overflow-y-auto">
            {dayEvents.map((event, i) => (
              <li
                key={i}
                className={`${
                  hasConflict(event)
                    ? "text-red-600 font-semibold"
                    : "text-gray-800"
                }`}
              >
                • {event.title}
                <div className="text-xs text-gray-500 ml-4">
                  {dayjs(event.startTime).format("h:mm A")} –{" "}
                  {dayjs(event.endTime).format("h:mm A")}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

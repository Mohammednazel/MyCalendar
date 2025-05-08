import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import Header from "./Header"; // (Unused in this file, may be needed elsewhere)
import DayCell from "./Daycell"; // Component for each date cell
import events from "../data/events.json"; // Events data

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Currently selected month
  const calendarRef = useRef(null); // Ref to scrollable calendar container
  const today = dayjs(); // Current date
  const monthsToRender = 12; // Number of months to display vertically

  // List of months for dropdown
  const monthOptions = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMMM")
  );

  // Array of months (e.g., Dec to Nov) to render in scrollable area
  const visibleMonths = Array.from(
    { length: monthsToRender },
    (_, i) => today.startOf("month").add(i, "month") // start from current month (May)
  );

  // Handle month selection from dropdown
  const handleMonthChange = (e) => {
    const monthIndex = monthOptions.indexOf(e.target.value);
    const newMonth = currentMonth.month(monthIndex);
    setCurrentMonth(newMonth);
    scrollToMonth(newMonth); // Scroll to selected month
  };

  // Scrolls to the section of the given month
  const scrollToMonth = (month) => {
    const section = document.querySelector(
      `[data-month="${month.format("YYYY-MM")}"]`
    );
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Go to today's month
  const goToToday = () => {
    setCurrentMonth(today);
    scrollToMonth(today);
  };

  // Navigate to next/previous year
  const nextYear = () => {
    const next = currentMonth.add(1, "year");
    setCurrentMonth(next);
    scrollToMonth(next);
  };
  const prevYear = () => {
    const prev = currentMonth.subtract(1, "year");
    setCurrentMonth(prev);
    scrollToMonth(prev);
  };

  // Automatically update the header when scrolling
  const handleScroll = () => {
    const container = calendarRef.current;
    const sections = Array.from(container.querySelectorAll("[data-month]"));

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      // If the top of the month section is in view, update header
      if (rect.top >= 80 && rect.top < window.innerHeight / 2) {
        const monthAttr = section.getAttribute("data-month");
        setCurrentMonth(dayjs(monthAttr));
        break;
      }
    }
  };

  // Attach scroll listener on mount
  useEffect(() => {
    const container = calendarRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white text-green-700">
      <div className="w-full bg-gradient-to-r from-teal-500 via-blue-400 to-indigo-400 text-white py-6 shadow-lg mb-6 rounded-b-3xl">
        <h1 className="text-4xl font-semibold text-center tracking-wide drop-shadow-lg">
          📅 My Calendar
        </h1>
        <p className="text-center text-sm mt-1 opacity-80">
          Plan ahead, stay organized!
        </p>
      </div>
      {/* Header (sticky) with dropdown, today button, and year navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sticky top-0 bg-white z-10 py-2">
        <div className="flex gap-2 items-center mb-4 sm:mb-0">
          <select
            value={currentMonth.format("MMMM")}
            onChange={handleMonthChange}
            className="border rounded px-2 py-1 text-green-700"
          >
            {monthOptions.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <button
            onClick={goToToday}
            className="px-3 py-1 bg-green-100 text-green-700 border rounded hover:bg-green-200"
          >
            Today
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={prevYear}
            className="text-xl px-2 hover:text-green-800"
          >
            ‹
          </button>
          <span className="text-xl font-semibold">
            {currentMonth.format("YYYY")}
          </span>
          <button
            onClick={nextYear}
            className="text-xl px-2 hover:text-green-800"
          >
            ›
          </button>
        </div>
      </div>

      {/* Scrollable calendar container showing multiple months */}
      <div
        ref={calendarRef}
        className="h-screen overflow-y-scroll space-y-10 px-2 scroll-smooth"
      >
        {/* Loop through each month to render it */}
        {visibleMonths.map((month) => {
          const startDay = month.startOf("month").startOf("week");
          const endDay = month.endOf("month").endOf("week");

          // Generate all days to show for this month (including leading/trailing days)
          const dateArray = [];
          let date = startDay;
          while (date.isBefore(endDay, "day") || date.isSame(endDay, "day")) {
            dateArray.push(date);
            date = date.add(1, "day");
          }

          return (
            <div
              key={month.format("YYYY-MM")}
              data-month={month.format("YYYY-MM")} // For scroll-based header detection
            >
              <div className="text-lg font-bold text-green-800 mb-2">
                {month.format("MMMM YYYY")}
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 text-center font-medium text-green-800 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Date cells grid */}
              <div className="grid grid-cols-7 gap-px bg-green-100">
                {dateArray.map((date, index) => (
                  <DayCell
                    key={index}
                    date={date}
                    currentMonth={month}
                    events={events}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

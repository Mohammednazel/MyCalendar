import React from "react";

// Month header with navigation
export default function Header({ currentMonth, nextMonth, prevMonth }) {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Previous month button */}
      <button
        onClick={prevMonth}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ←
      </button>

      {/* Current month label */}
      <h2 className="text-xl font-semibold">
        {currentMonth.format("MMMM YYYY")}
      </h2>

      {/* Next month button */}
      <button
        onClick={nextMonth}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        →
      </button>
    </div>
  );
}

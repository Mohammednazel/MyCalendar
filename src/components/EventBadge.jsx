import React from "react";

export default function EventBadge({ event, conflict }) {
  return (
    <div
      className={`text-xs px-2 py-1 mb-1 rounded-md truncate cursor-pointer
        ${
          conflict
            ? "bg-red-600 text-white border border-red-700 shadow-md shadow-red-300 animate-pulse"
            : "bg-blue-100 text-blue-800 border border-blue-300"
        }
      `}
      title={event.title}
    >
      {event.title}
      {conflict && (
        <span className="ml-2 text-[10px] font-bold bg-white text-red-600 px-1 rounded">
          Conflict
        </span>
      )}
    </div>
  );
}

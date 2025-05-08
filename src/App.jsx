import React from "react";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <div className="p-4 max-w-5xl mx-auto relative">
      {/* <h1 className="text-3xl font-bold text-green-700 mb-4">My Calendar</h1> */}
      <Calendar />

      {/* Floating add event button */}
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
        aria-label="Add Event"
      >
        + Add Event
      </button>
    </div>
  );
}

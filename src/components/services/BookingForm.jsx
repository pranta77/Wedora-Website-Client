
"use client";

import { useState } from "react";
import { CalendarDays, MapPin, MessageSquare } from "lucide-react";

export default function BookingForm({ onSubmit, loading = false }) {
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      eventDate,
      eventLocation,
      message,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Book This Service
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Share your event details with the wedding service provider.
        </p>
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
          <CalendarDays size={17} className="text-pink-600" />
          Event Date
        </label>

        <input
          type="date"
          value={eventDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setEventDate(e.target.value)}
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
        />
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
          <MapPin size={17} className="text-pink-600" />
          Event Location
        </label>

        <input
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          placeholder="Enter your event location"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
        />
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
          <MessageSquare size={17} className="text-pink-600" />
          Additional Message
        </label>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us more about your wedding..."
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting Booking..." : "Request Booking"}
      </button>
    </form>
  );
}

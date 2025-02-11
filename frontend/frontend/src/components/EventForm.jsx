import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
 

const EventForm = () => {
  const [form, setForm] = useState({ name: "", description: "", date: "", location: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", form);
      navigate("/");
    } catch (error) {
      console.error("Event creation error:", error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="event-form-container">
      <div className="event-form-box">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            required
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="datetime-local"
            required
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            required
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;

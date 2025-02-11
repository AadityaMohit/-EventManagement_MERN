import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
  
const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await API.get("/events");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-list-container">
      <h2>📅 Events</h2>
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <Link to={`/events/${event._id}`}>
            <h3>{event.name}</h3>
          </Link>
          <p>{event.description}</p>
          <p>📅 {new Date(event.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;

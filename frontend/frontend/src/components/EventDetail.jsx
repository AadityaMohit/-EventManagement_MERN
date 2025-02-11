import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await API.get(`/events/${id}`);
        setEvent(data);
        setAttendees(data.attendees.length);
        socket.emit("join_event", id);
      } catch (error) {
        console.error("Error fetching event", error);
      }
    };

    fetchEvent();

    socket.on("update_attendees", () => setAttendees((prev) => prev + 1));

    return () => socket.off("update_attendees");
  }, [id]);

  const attendEvent = async () => {
    await API.patch(`/events/${id}/attend`);
    socket.emit("attend_event", id);
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      {/* <p>Location: {event.location}</p> */}
      <p>Attendees: {attendees}</p>
      <button onClick={attendEvent}>Attend Event</button>
    </div>
  );
};

export default EventDetail;

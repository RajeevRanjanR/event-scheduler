import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { EventContext } from "./EventContext";

const EventDetails = () => {
  const { id } = useParams();
  const { events, setEvents } = useContext(EventContext);
  const event = events.find((e) => e.id === parseInt(id));
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`https://calender.free.beeceptor.com/events/${id}`)
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== parseInt(id)));
        navigate("/");
      })
      .catch((error) => console.error("Error deleting event", error));
  };

  if (!event) return <h2>Event not found</h2>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.date}</p>
      <button onClick={handleDelete}>Delete Event</button>
      <button onClick={() => navigate(`/edit-event/${event.id}`)}>Edit Event</button>
    </div>
  );
};

export default EventDetails;

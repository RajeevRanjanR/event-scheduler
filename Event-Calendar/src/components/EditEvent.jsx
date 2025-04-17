// src/components/EditEvent.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({ title: '', date: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get("https://calenderapp.free.beeceptor.com/todos");
      setEvent(response.data);
    } catch (err) {
      setError('Error fetching event');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://calenderapp.free.beeceptor.com/todos/${id}`, event);
      navigate('/');
    } catch (err) {
      setError('Error updating event');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://calenderapp.free.beeceptor.com/todos/${id}`);
      navigate('/');
    } catch (err) {
      setError('Error deleting event');
    }
  };

  return (
    <div className="edit-event">
      <h3>Edit Event</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
        />
        <input
          type="date"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
        />
        <button type="submit">Update Event</button>
        <button type="button" onClick={handleDelete}>Delete Event</button>
      </form>
    </div>
  );
};

export default EditEvent;

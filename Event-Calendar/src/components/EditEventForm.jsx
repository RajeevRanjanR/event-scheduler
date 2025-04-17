// src/components/EditEventForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditEventForm = ({ event, onEventEdited }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preserve the original event date
    const updatedEvent = { ...event, title, description, date: event.date };

    try {
      const response = await axios.put(`https://calenderapp.free.beeceptor.com/todos/${event.id}`, updatedEvent);
      onEventEdited(response.data); // Update event in parent component
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditEventForm;

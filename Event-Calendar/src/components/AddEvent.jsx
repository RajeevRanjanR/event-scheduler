// src/components/AddEventForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm = ({ selectedDate, onEventAdded, workType }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      date: selectedDate.toISOString(),
      workType: workType || 'personal', // Add work type to the event
    };

    try {
      const response = await axios.post('https://calenderapp.free.beeceptor.com/todos', newEvent);
      onEventAdded(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event description"
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;

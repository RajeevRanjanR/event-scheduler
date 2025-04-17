// src/components/EventModal.js
import React, { useState } from 'react';
import AddEventForm from './AddEvent';
import EditEventForm from './EditEventForm';
import './EventModal.css'; // Add styling for modal

const EventModal = ({ selectedDate, events, onClose, onEventAdded, onEventEdited, onEventDeleted }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [workType, setWorkType] = useState('personal'); // New state for work type

  // Filter events for the selected date
  const filteredEvents = events.filter(event => new Date(event.date).getDate() === selectedDate.getDate());

  const handleWorkTypeChange = (e) => {
    setWorkType(e.target.value);
  };

  const handleEventAdded = (newEvent) => {
    onEventAdded(newEvent);
    setShowAddForm(false); // Close the form after adding the event
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Events on {selectedDate.toDateString()}</h2>

        <div className="work-type-select">
          <label htmlFor="workType">Work Type:</label>
          <select id="workType" value={workType} onChange={handleWorkTypeChange}>
            <option value="personal">Personal</option>
            <option value="office">Office</option>
          </select>
        </div>

        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-item">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <p>Type: {event.workType || 'personal'}</p>
              <button onClick={() => setEditEvent(event)}>Edit</button>
              <button onClick={() => onEventDeleted(event.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No events for this date.</p>
        )}

        {/* Toggle between Add and Edit Event Forms */}
        {showAddForm ? (
          <AddEventForm selectedDate={selectedDate} onEventAdded={handleEventAdded} workType={workType} />
        ) : editEvent ? (
          <EditEventForm event={editEvent} onEventEdited={onEventEdited} />
        ) : (
          <button className="add-event-btn" onClick={() => setShowAddForm(true)}>Add Event</button>
        )}
      </div>
    </div>
  );
};

export default EventModal;

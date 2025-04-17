import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventModal from './EventModal';
import './Calendar.css'; // Add your custom styles

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Date that is clicked
  const [showModal, setShowModal] = useState(false); // Modal state
  const [filter, setFilter] = useState('all'); // Filter by work type

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://calenderapp.free.beeceptor.com/todos');
      
      // Ensure response data is an array
      const fetchedEvents = Array.isArray(response.data) ? response.data : [];
      setEvents(fetchedEvents);
    } catch (err) {
      setError('Error fetching events');
    }
  };

  const handleEventAdded = (newEvent) => {
    const updatedEvent = { ...newEvent, date: selectedDate.toISOString() };
    setEvents([...events, updatedEvent]);
    setShowModal(false); // Close modal after adding
  };

  const handleEventEdited = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const handleEventDeleted = async (eventId) => {
    try {
      await axios.delete(`https://calenderapp.free.beeceptor.com/todos/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      setError('Error deleting event');
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(new Date(2023, 9, date)); // Example: October 2023
    setShowModal(true);
  };

  const getDayClass = (date) => {
    // Ensure 'events' is an array and has valid date objects
    const dayEvents = events.filter(event => 
      new Date(event.date).getDate() === date && 
      new Date(event.date).getMonth() === 9 // Ensure the month matches (October in this case)
    );
    const hasPersonal = dayEvents.some(event => event.workType === 'personal');
    const hasOffice = dayEvents.some(event => event.workType === 'office');

    if (hasPersonal) {
      return 'calendar-day personal'; // Add class for personal work
    }
    if (hasOffice) {
      return 'calendar-day office'; // Add class for office work
    }
    return 'calendar-day';
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter events based on work type
  const filteredEvents = filter === 'all' ? events : events.filter(event => event.workType === filter);

  return (
    <div className="container">
      <header className="header">
        <h1>Event Calendar</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <div className="calendar">
        <div className="header">
          <h2>Manage Your Events</h2>
          {error && <div className="error">{error}</div>}
          
          <div className="filter-controls">
            <label>Filter by work type:</label>
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="personal">Personal</option>
              <option value="office">Office</option>
            </select>
          </div>
        </div>

        <div className="calendar-grid">
          {Array.from({ length: 30 }, (_, index) => (
            <div
              key={index}
              className={getDayClass(index + 1)}
              onClick={() => handleDateClick(index + 1)}
            >
              <span>{index + 1}</span>
              <div className="events">
                {filteredEvents
                  .filter(event => new Date(event.date).getDate() === index + 1)
                  .map(event => (
                    <div key={event.id} className="event">
                      {event.title}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {showModal && selectedDate && (
          <EventModal
            selectedDate={selectedDate}
            events={events}
            onClose={() => setShowModal(false)}
            onEventAdded={handleEventAdded}
            onEventEdited={handleEventEdited}
            onEventDeleted={handleEventDeleted}
          />
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2024 Event Manager. All rights reserved.</p>
        <div>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Calendar;

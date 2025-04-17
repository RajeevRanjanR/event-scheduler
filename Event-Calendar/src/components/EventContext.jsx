import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the mock API
    axios
      .get("https://calenderapp.free.beeceptor.com/todos")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events", error));
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;

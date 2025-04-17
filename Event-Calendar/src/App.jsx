// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calender';
import AddEventForm from './components/AddEvent';
import EditEvent from './components/EditEvent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/add-event" element={<AddEventForm />} />
        <Route path="/event/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
};

export default App;

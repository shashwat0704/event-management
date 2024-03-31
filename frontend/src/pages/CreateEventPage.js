// File: frontend/src/pages/CreateEventPage.js
import React, { useState } from 'react';
import eventService from '../services/eventService';

function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    registrationDeadline: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await eventService.createEvent(formData);
      console.log('Event created successfully:', response.data.event);
      // Redirect or show success message
    } catch (error) {
      console.error('Event creation failed:', error.response.data);
      // Show error message to the user
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for event creation */}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventPage;

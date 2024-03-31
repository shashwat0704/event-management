// File: frontend/src/pages/EventsPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import eventService from '../services/eventService';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    location: '',
    title: ''
  });
  const history = useHistory();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getEvents(filters);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error
      }
    };

    fetchEvents();
  }, [filters]);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryString = new URLSearchParams(filters).toString();
    history.push(`/events?${queryString}`);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={filters.date} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Category" value={filters.category} onChange={handleInputChange} />
        <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleInputChange} />
        <input type="text" name="title" placeholder="Title" value={filters.title} onChange={handleInputChange} />
        <button type="submit">Filter/Search</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <Link to={`/event/${event._id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;

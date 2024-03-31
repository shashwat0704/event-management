// File: frontend/src/pages/UpcomingEventsPage.js
import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

function UpcomingEventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await userService.getUpcomingEvents();
        setUpcomingEvents(response.data);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
        // Handle error
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {upcomingEvents.map(event => (
          <li key={event._id}>
            {event.title} - {event.date} ({event.time}) - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingEventsPage;

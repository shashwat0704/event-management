// File: frontend/src/pages/EventDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../services/eventService';
import notificationService from '../services/notificationService';
import messageService from '../services/messageService';
import commentService from '../services/commentService';

function EventDetailsPage({ eventId, recipientId }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventService.getEvent(id);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        // Handle error
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await eventService.registerForEvent(id);
      // Optionally, you can update the event details after registration
      // Refetch event data or update state
    } catch (error) {
      console.error('Error registering for event:', error);
      // Handle error
    }
  };

  const handleSendNotification = async () => {
    try {
      await notificationService.sendNotification(eventId, notification);
      // Optionally, you can show a success message to the organizer
    } catch (error) {
      console.error('Error sending notification:', error);
      // Handle error
    }
  };

  const handleSendMessage = async () => {
    try {
      await messageService.sendMessage(recipientId, message);
      // Optionally, you can show a success message
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error
    }
  };

  const handleAddComment = async () => {
    try {
      await commentService.addComment(eventId, comment);
      // Optionally, you can show a success message
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{event.title}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Capacity:</strong> {event.capacity}</p>
      <p><strong>Registration Deadline:</strong> {event.registrationDeadline}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Organizer:</strong> {event.organizer.email}</p>
      <h3>Attendees:</h3>
      <ul>
        {event.attendees.map(attendee => (
          <li key={attendee._id}>{attendee.email}</li>
        ))}
      </ul>
      <button onClick={handleRegister}>Register for Event</button>
      <h2>Send Notification to Attendees</h2>
      <textarea value={message} onChange={(e) => setNotification(e.target.value)}></textarea>
      <button onClick={handleSendNotification}>Send Notification</button>
      <h2>Send Message to Attendees</h2>
      <form onSubmit={handleSendMessage}>
        <select>
          {/* Populate options with attendees */}
          {/* Example: <option value="attendeeId">Attendee Name</option> */}
        </select>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="submit">Send Message</button>
      </form>

      <h2>Add Comment</h2>
      <form onSubmit={handleAddComment}>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EventDetailsPage;

// File: frontend/src/services/eventService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events'; // Update with your backend URL

const createEvent = (eventData) => {
  return axios.post(API_URL, eventData);
};

const getEvent = (eventId) => {
  return axios.get(`${API_URL}/${eventId}`);
};

const getAllEvents = () => {
  return axios.get(API_URL);
};

const updateEvent = (eventId, eventData) => {
  return axios.put(`${API_URL}/${eventId}`, eventData);
};

const deleteEvent = (eventId) => {
  return axios.delete(`${API_URL}/${eventId}`);
};

export default {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent
};

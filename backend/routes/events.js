// File: backend/routes/events.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (authenticated users only)
router.post('/', eventController.createEvent);

// Implement other event-related routes (fetching, updating, deleting events) here

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', eventController.getAllEvents);

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', eventController.getEventById);

// @route   POST /api/events/:eventId/register
// @desc    Register for an event
// @access  Private (authenticated users only)
router.post('/:eventId/register', eventController.registerForEvent);

// @route   PUT /api/events/:eventId
// @desc    Update an event
// @access  Private (authenticated users only)
router.put('/:eventId', eventController.updateEvent);

// @route   DELETE /api/events/:eventId
// @desc    Delete an event
// @access  Private (authenticated users only)
router.delete('/:eventId', eventController.deleteEvent);

// @route   GET /api/events
// @desc    Get events with optional filtering and searching
// @access  Public
router.get('/', eventController.getEvents);

module.exports = router;

// File: backend/routes/notifications.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// @route   POST /api/events/:eventId/notifications
// @desc    Send notification to event attendees
// @access  Private (authenticated users only)
router.post('/:eventId/notifications', notificationController.sendNotification);

module.exports = router;

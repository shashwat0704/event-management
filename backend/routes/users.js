// File: backend/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', userController.register);

// @route   POST /api/users/login
// @desc    Authenticate user & return token
// @access  Public
router.post('/login', userController.login);

// @route   GET /api/users/upcoming-events
// @desc    Get upcoming events for the authenticated user
// @access  Private (authenticated users only)
router.get('/upcoming-events', userController.getUpcomingEvents);

module.exports = router;

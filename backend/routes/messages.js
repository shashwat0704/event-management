// File: backend/routes/messages.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// @route   POST /api/messages
// @desc    Send a message
// @access  Private (authenticated users only)
router.post('/', messageController.sendMessage);

module.exports = router;

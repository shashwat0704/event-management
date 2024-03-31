// File: backend/routes/comments.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// @route   POST /api/events/:eventId/comments
// @desc    Add a comment to an event
// @access  Private (authenticated users only)
router.post('/:eventId/comments', commentController.addComment);

module.exports = router;

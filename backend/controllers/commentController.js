// File: backend/controllers/commentController.js
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { eventId } = req.params;
  const { content } = req.body;
  const userId = req.user.id; // Assuming user is authenticated and user id is available in req.user

  try {
    const comment = new Comment({
      user: userId,
      content
    });

    await comment.save();

    res.json({ msg: 'Comment added successfully', comment });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

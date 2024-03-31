// File: backend/controllers/messageController.js
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  const senderId = req.user.id; // Assuming user is authenticated and user id is available in req.user

  try {
    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content
    });

    await message.save();

    res.json({ msg: 'Message sent successfully', message });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

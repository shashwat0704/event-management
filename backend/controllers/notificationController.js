// File: backend/controllers/notificationController.js
const Event = require('../models/Event');
const Notification = require('../models/Notification');

exports.sendNotification = async (req, res) => {
  const { eventId } = req.params;
  const { message } = req.body;
  const organizerId = req.user.id; // Assuming user is authenticated and user id is available in req.user

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the user sending the notification is the event organizer
    if (event.organizer.toString() !== organizerId) {
      return res.status(401).json({ msg: 'Not authorized to send notifications for this event' });
    }

    // Send notification to all event attendees
    const notification = new Notification({
      message,
      event: eventId
    });

    await notification.save();

    res.json({ msg: 'Notification sent successfully', notification });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(500).send('Server Error');
  }
};

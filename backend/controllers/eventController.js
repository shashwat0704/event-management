// File: backend/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, description, date, time, location, capacity, registrationDeadline, category } = req.body;
  const organizer = req.user.id; // Assuming user is authenticated and user id is available in req.user

  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity,
      registrationDeadline,
      category,
      organizer
    });

    await event.save();

    res.status(201).json({ msg: 'Event created successfully', event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Implement other event-related controller functions (fetching, updating, deleting events) here

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'email');
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId).populate('organizer', 'email');

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(500).send('Server Error');
  }
};

exports.registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id; // Assuming user is authenticated and user id is available in req.user

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is already registered for the event
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ msg: 'User already registered for this event' });
    }

    // Check if event is at full capacity
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ msg: 'Event is at full capacity' });
    }

    // Add user to attendees list
    event.attendees.push(userId);
    await event.save();

    res.json({ msg: 'User registered for event successfully', event });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(500).send('Server Error');
  }
};

exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date, time, location, capacity, registrationDeadline, category } = req.body;

  try {
    let event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the user updating the event is the event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this event' });
    }

    // Update event fields
    event.title = title;
    event.description = description;
    event.date = date;
    event.time = time;
    event.location = location;
    event.capacity = capacity;
    event.registrationDeadline = registrationDeadline;
    event.category = category;

    await event.save();

    res.json({ msg: 'Event updated successfully', event });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(500).send('Server Error');
  }
};

exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    let event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the user deleting the event is the event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this event' });
    }

    await event.remove();

    res.json({ msg: 'Event deleted successfully' });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(500).send('Server Error');
  }
};

exports.getEvents = async (req, res) => {
  const { date, category, location, title } = req.query;

  try {
    let query = {};

    // Apply filters
    if (date) query.date = date;
    if (category) query.category = category;
    if (location) query.location = location;
    if (title) query.title = { $regex: new RegExp(title, 'i') };

    const events = await Event.find(query).populate('organizer', 'email');
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
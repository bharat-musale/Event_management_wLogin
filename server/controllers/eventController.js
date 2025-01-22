const Event = require('../models/Event');

// Get all events with pagination
exports.getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find()
      .populate('organizer', 'username')
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      events,
      currentPage: page,
      totalPages,
      totalEvents: total,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'username');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event' });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { title, description, date, location, organizerName } = req.body;
    
    // Validate required fields
    if (!title || !description || !date || !location || !organizerName) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: { title, description, date, location, organizerName }
      });
    }

    const event = new Event({
      title,
      description,
      date: new Date(date),
      location,
      organizerName,
      organizer: req.user.id,
    });

    const savedEvent = await event.save();
    console.log('Saved event:', savedEvent);
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    console.log('Update request body:', req.body);

    const { title, description, date, location, organizerName } = req.body;
    
    // Validate required fields
    if (!title || !description || !date || !location || !organizerName) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: { title, description, date, location, organizerName }
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    event.title = title;
    event.description = description;
    event.date = new Date(date);
    event.location = location;
    event.organizerName = organizerName;

    const updatedEvent = await event.save();
    console.log('Updated event:', updatedEvent);
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

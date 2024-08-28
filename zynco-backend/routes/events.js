const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth'); // We'll create this next

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator,
    date: req.body.date,
    location: req.body.location,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add more routes for updating, deleting events, etc.
router.get('/', eventController.getAllEvents);
router.post('/', auth, eventController.createEvent);
router.get('/:id', eventController.getEventById);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.post('/:id/invite', auth, eventController.inviteToEvent);
router.post('/:id/vote', auth, eventController.voteForDate);

router.get('/calendar', auth, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const events = await Event.findUserEvents(req.user.id, new Date(startDate), new Date(endDate));
      res.json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;


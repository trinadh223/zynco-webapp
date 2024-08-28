const Event = require('../models/Event');
const User = require('../models/User');

// await notificationController.createNotification(
//     userToInvite._id,
//     event._id,
//     `You've been invited to ${event.title}`
//   );

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('creator', 'username email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    creator: req.user._id, // Assuming we have authentication middleware
    date: req.body.date,
    location: req.body.location,
    suggestedDates: req.body.suggestedDates,
  });

  try {
    const newEvent = await event.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { events: newEvent._id } });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('creator', 'username email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to update this event' });
    }
    
    Object.assign(event, req.body);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this event' });
    }
    
    await event.remove();
    await User.updateMany(
      { events: req.params.id },
      { $pull: { events: req.params.id } }
    );
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.inviteToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to invite to this event' });
    }
    
    const userToInvite = await User.findById(req.body.userId);
    if (!userToInvite) return res.status(404).json({ message: 'User to invite not found' });
    
    if (event.participants.includes(userToInvite._id)) {
      return res.status(400).json({ message: 'User already invited to this event' });
    }
    
    event.participants.push(userToInvite._id);
    userToInvite.events.push(event._id);
    
    await event.save();
    await userToInvite.save();
    
    res.json({ message: 'User invited successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.voteForDate = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const dateIndex = event.suggestedDates.findIndex(
      date => date._id.toString() === req.body.dateId
    );
    
    if (dateIndex === -1) return res.status(404).json({ message: 'Suggested date not found' });
    
    event.suggestedDates[dateIndex].votes += 1;
    await event.save();
    
    res.json({ message: 'Vote recorded successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


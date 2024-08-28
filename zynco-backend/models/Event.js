const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  location: { type: String },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  suggestedDates: [{ date: Date, votes: Number }],
  createdAt: { type: Date, default: Date.now },
});

EventSchema.statics.findUserEvents = function(userId, startDate, endDate) {
  return this.find({
    $or: [
      { creator: userId },
      { participants: userId }
    ],
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort('date');
};

module.exports = mongoose.model('Event', EventSchema);
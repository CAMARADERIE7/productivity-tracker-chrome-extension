const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
  url: String,
  timeSpent: Number,
  date: Date
});

module.exports = mongoose.model('TimeLog', timeLogSchema);

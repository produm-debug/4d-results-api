const mongoose = require('mongoose');

const drawResultSchema = new mongoose.Schema({
  // 🔑 ADD THIS LINE BELOW:
  singletonKey: { type: String, default: 'LATEST_MAGNUM', unique: true },

  drawDate: { type: String, required: true },
  drawId:   { type: String, required: true },
  drawDay:  String,
  topPrizes: {
    first:  String,
    second: String,
    third:  String
  },
  specials:     [String],
  consolations: [String],
  updatedAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('DrawResult', drawResultSchema);
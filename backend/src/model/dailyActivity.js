import mongoose from "mongoose";

const DailyActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Format: "YYYY-MM-DD"
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});


DailyActivitySchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('DailyActivity', DailyActivitySchema);

import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      // examples: "Work", "Personal", "Study", "Health"
    },

    subTasks: {
      type: [subTaskSchema],
      default: [],
    },

    schedule: {
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
    },

    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 5,
    },

    emailIds: {
      type: [String],
      default: [],
    },

    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    autoDeleteAfterDue: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);

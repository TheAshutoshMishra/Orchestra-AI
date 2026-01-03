import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    parentTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: null,
      description: 'Reference to parent task if this is a subtask',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Todo', 'Doing', 'Done'],
      default: 'Todo',
    },
    estimatedHours: {
      type: Number,
      default: null,
    },
    estimatedDays: {
      type: Number,
      default: null,
    },
    assignee: {
      type: String,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    order: {
      type: Number,
      default: 0,
      description: 'For sorting tasks within the same parent',
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;

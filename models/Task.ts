// models/Task.ts
import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

export interface ITask {
  title: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Task = models.Task || model('Task', taskSchema);

export default Task;
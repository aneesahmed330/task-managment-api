import { taskType } from '../enums';
import mongoose, { Schema, model } from 'mongoose';
import { ITask } from 'interfaces/ITask';

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(taskType),
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task = model<ITask>('Task', taskSchema);
export default Task;

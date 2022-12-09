import { taskType } from './../enums';
import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  description: string;
  type: taskType;
  date: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}
